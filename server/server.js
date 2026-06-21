require('dotenv').config();
const express = require('express');
const cors = require('cors');
const multer = require('multer');
const mammoth = require('mammoth');
const { PDFParse } = require('pdf-parse');
const { createClient } = require('@supabase/supabase-js');

const app = express();
const PORT = process.env.PORT || 3002;
const GEMINI_MODEL = process.env.GEMINI_MODEL || 'gemini-3.5-flash';
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 5 * 1024 * 1024 },
});

app.use(cors());
app.use(express.json({ limit: '1mb' }));

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Skyward API is running' });
});

function getAdminSupabase() {
  if (!process.env.SUPABASE_URL || !process.env.SUPABASE_SERVICE_ROLE_KEY) {
    const error = new Error('Supabase server credentials are missing.');
    error.status = 500;
    throw error;
  }

  return createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY, {
    auth: { persistSession: false },
  });
}

function safeStorageName(name) {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9._-]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 120) || 'resume';
}

async function saveAuthEvent(db, { userId, email, eventType, success = true, metadata = {} }) {
  if (!db) return;

  const { error } = await db.from('auth_events').insert({
    user_id: userId || null,
    email,
    event_type: eventType,
    success,
    metadata,
  });

  if (error) {
    console.warn('Supabase auth event save skipped:', error.message);
  }
}

function hasSupabaseConfig() {
  return Boolean(
    process.env.SUPABASE_URL &&
    (process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_ANON_KEY)
  );
}

function getBearerToken(req) {
  const header = req.headers.authorization || '';
  return header.startsWith('Bearer ') ? header.slice(7) : '';
}

function getSupabaseForRequest(req) {
  const token = getBearerToken(req);
  if (!hasSupabaseConfig() || !token) return null;

  return createClient(process.env.SUPABASE_URL, process.env.SUPABASE_ANON_KEY, {
    global: { headers: { Authorization: `Bearer ${token}` } },
  });
}

async function getAuthenticatedUser(req) {
  const token = getBearerToken(req);
  if (!hasSupabaseConfig() || !token) return { db: null, user: null };

  if (process.env.SUPABASE_SERVICE_ROLE_KEY) {
    const adminDb = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);
    const { data, error } = await adminDb.auth.getUser(token);
    if (error || !data.user) return { db: null, user: null };

    // Auto-create/heal profile if missing in public.profiles table
    try {
      const { data: profile } = await adminDb
        .from('profiles')
        .select('id')
        .eq('id', data.user.id)
        .maybeSingle();

      if (!profile) {
        console.log(`Auto-healing profiles table for user ID: ${data.user.id}`);
        await adminDb.from('profiles').insert({
          id: data.user.id,
          email: data.user.email,
          full_name: data.user.user_metadata?.full_name || 'User',
        });
      }
    } catch (profileErr) {
      console.warn('Profile check or auto-healing skipped:', profileErr.message);
    }

    return { db: adminDb, user: data.user };
  }

  const db = getSupabaseForRequest(req);

  const { data, error } = await db.auth.getUser();
  if (error || !data.user) return { db: null, user: null };

  return { db, user: data.user };
}

async function saveGeneratedRecord(req, table, row) {
  const { db, user } = await getAuthenticatedUser(req);
  if (!db || !user) return;

  const { error } = await db.from(table).insert({ ...row, user_id: user.id });
  if (error) {
    console.warn(`Supabase save skipped for ${table}:`, error.message);
  }
}

function assertGeminiKey() {
  if (!process.env.GEMINI_API_KEY) {
    const error = new Error('Gemini API key is missing. Add GEMINI_API_KEY to server/.env.');
    error.status = 500;
    throw error;
  }
}

function cleanJsonText(text) {
  return text
    .trim()
    .replace(/^```(?:json)?/i, '')
    .replace(/```$/i, '')
    .trim();
}

function safeParseGeminiJson(text) {
  const cleaned = cleanJsonText(text);
  try {
    return JSON.parse(cleaned);
  } catch {
    const start = cleaned.indexOf('{');
    const end = cleaned.lastIndexOf('}');
    if (start !== -1 && end !== -1 && end > start) {
      return JSON.parse(cleaned.slice(start, end + 1));
    }
    throw new Error('Gemini returned a response that was not valid JSON.');
  }
}

async function askGeminiJson(prompt, schemaDescription) {
  assertGeminiKey();

  const response = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent?key=${process.env.GEMINI_API_KEY}`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [
          {
            role: 'user',
            parts: [
              {
                text: `${prompt}

Return only strict JSON. Do not include markdown, comments, or extra text.
Required JSON shape:
${schemaDescription}`,
              },
            ],
          },
        ],
        generationConfig: {
          temperature: 0.75,
          responseMimeType: 'application/json',
        },
      }),
    }
  );

  const payload = await response.json().catch(() => ({}));

  if (!response.ok) {
    const message = payload?.error?.message || 'Gemini request failed.';
    const error = new Error(message);
    error.status = response.status;
    throw error;
  }

  const text = payload?.candidates?.[0]?.content?.parts?.map((part) => part.text || '').join('\n');
  if (!text) {
    throw new Error('Gemini did not return any answer text.');
  }

  return safeParseGeminiJson(text);
}

async function extractResumeText(file) {
  if (!file) return '';

  if (file.mimetype === 'application/pdf' || file.originalname.toLowerCase().endsWith('.pdf')) {
    const parser = new PDFParse({ data: file.buffer });
    try {
      const result = await parser.getText();
      return result.text || '';
    } finally {
      await parser.destroy();
    }
  }

  if (
    file.mimetype === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' ||
    file.originalname.toLowerCase().endsWith('.docx')
  ) {
    const result = await mammoth.extractRawText({ buffer: file.buffer });
    return result.value || '';
  }

  const error = new Error('Unsupported file type. Please upload a PDF or DOCX resume.');
  error.status = 400;
  throw error;
}

function toSafeUser(user) {
  return {
    id: user.id,
    email: user.email,
    user_metadata: user.user_metadata || {},
  };
}

app.post('/api/auth/register', async (req, res, next) => {
  try {
    const email = String(req.body.email || '').trim().toLowerCase();
    const password = String(req.body.password || '');
    const fullName = String(req.body.fullName || '').trim();

    if (!email || !password || !fullName) {
      return res.status(400).json({ message: 'Name, email, and password are required.' });
    }

    const adminDb = getAdminSupabase();
    const { data: created, error: createError } = await adminDb.auth.admin.createUser({
      email,
      password,
      email_confirm: true,
      user_metadata: { full_name: fullName },
    });

    if (createError) throw createError;

    const { error: profileError } = await adminDb.from('profiles').upsert({
      id: created.user.id,
      email,
      full_name: fullName,
    });
    if (profileError) {
      console.warn('Supabase profile save skipped:', profileError.message);
    }

    const { data: loginData, error: loginError } = await adminDb.auth.signInWithPassword({ email, password });
    if (loginError) throw loginError;

    await saveAuthEvent(getAdminSupabase(), {
      userId: created.user.id,
      email,
      eventType: 'signup',
      metadata: { full_name: fullName },
    });

    res.json({
      user: toSafeUser(loginData.user),
      session: {
        access_token: loginData.session.access_token,
        refresh_token: loginData.session.refresh_token,
        expires_at: loginData.session.expires_at,
      },
    });
  } catch (error) {
    next(error);
  }
});

app.post('/api/auth/login', async (req, res, next) => {
  try {
    const email = String(req.body.email || '').trim().toLowerCase();
    const password = String(req.body.password || '');

    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required.' });
    }

    const adminDb = getAdminSupabase();
    const { data, error } = await adminDb.auth.signInWithPassword({ email, password });
    if (error) throw error;

    await saveAuthEvent(getAdminSupabase(), {
      userId: data.user.id,
      email,
      eventType: 'login',
      metadata: { provider: 'password' },
    });

    res.json({
      user: toSafeUser(data.user),
      session: {
        access_token: data.session.access_token,
        refresh_token: data.session.refresh_token,
        expires_at: data.session.expires_at,
      },
    });
  } catch (error) {
    next(error);
  }
});

app.post('/api/interview/questions', async (req, res, next) => {
  try {
    const targetRole = String(req.body.targetRole || '').trim();
    if (!targetRole) {
      return res.status(400).json({ message: 'Target role is required.' });
    }

    const data = await askGeminiJson(
      `Generate interview preparation questions for this target role: "${targetRole}".
Include a balanced mix of technical, HR/behavioral, and scenario questions.
Make the questions specific to the role, not generic React-only content unless React is relevant.`,
      `{
  "questions": [
    {
      "type": "technical | hr | scenario",
      "difficulty": "easy | medium | hard",
      "question": "string",
      "answerGuidance": ["string", "string", "string"]
    }
  ]
}
Return exactly 10 questions.`
    );

    const questions = Array.isArray(data.questions) ? data.questions : [];
    await saveGeneratedRecord(req, 'interview_sessions', {
      target_role: targetRole,
      questions,
    });

    res.json({ questions });
  } catch (error) {
    next(error);
  }
});

app.post('/api/roadmap', async (req, res, next) => {
  try {
    const goal = String(req.body.goal || '').trim();
    if (!goal) {
      return res.status(400).json({ message: 'Career goal is required.' });
    }

    const data = await askGeminiJson(
      `Create a practical career roadmap for this goal: "${goal}".
Use concrete learning steps, projects, certifications only when useful, and a final job-readiness milestone.`,
      `{
  "estimatedTimeline": "string",
  "roadmap": [
    {
      "type": "learning | project | certification | milestone",
      "timeframe": "string",
      "title": "string",
      "description": "string",
      "skills": ["string", "string"]
    }
  ]
}
Return 5 to 7 roadmap items.`
    );

    const estimatedTimeline = data.estimatedTimeline || 'Custom timeline';
    const roadmap = Array.isArray(data.roadmap) ? data.roadmap : [];
    await saveGeneratedRecord(req, 'roadmaps', {
      career_goal: goal,
      estimated_timeline: estimatedTimeline,
      timeline: roadmap,
    });

    res.json({ estimatedTimeline, roadmap });
  } catch (error) {
    next(error);
  }
});

app.post('/api/resume/analyze', upload.single('resume'), async (req, res, next) => {
  try {
    const resumeText = (await extractResumeText(req.file)).slice(0, 15000);
    if (!resumeText.trim()) {
      return res.status(400).json({ message: 'Could not extract text from this resume.' });
    }

    const data = await askGeminiJson(
      `Analyze this resume for ATS readiness and career-market strength.
Resume text:
${resumeText}`,
      `{
  "overallScore": 0,
  "keywordScore": 0,
  "formattingScore": 0,
  "skillsScore": 0,
  "experienceScore": 0,
  "summary": "string",
  "suggestions": [
    { "type": "critical | warning | info", "text": "string" }
  ],
  "keywordsMatched": ["string"],
  "keywordsMissing": ["string"]
}
Scores must be integers from 0 to 100. Return 3 to 6 suggestions.`
    );

    await saveResumeAnalysis(req, req.file, resumeText, data);
    res.json(data);
  } catch (error) {
    next(error);
  }
});

app.post('/api/skill-gap/analyze', upload.single('resume'), async (req, res, next) => {
  try {
    const targetRole = String(req.body.targetRole || '').trim();
    if (!targetRole) {
      return res.status(400).json({ message: 'Target role is required.' });
    }

    const resumeText = (await extractResumeText(req.file)).slice(0, 15000);
    if (!resumeText.trim()) {
      return res.status(400).json({ message: 'Could not extract text from this resume.' });
    }

    const data = await askGeminiJson(
      `Compare this resume against the target role "${targetRole}" and identify skill gaps.
Resume text:
${resumeText}`,
      `{
  "overallMatch": 0,
  "summary": "string",
  "radarData": [
    { "subject": "string", "resume": 0, "required": 0, "fullMark": 100 }
  ],
  "missingSkills": [
    { "skill": "string", "priority": "High | Medium | Low", "category": "string" }
  ],
  "recommendedActions": ["string", "string", "string"]
}
Scores must be integers from 0 to 100. Return exactly 6 radar subjects and 3 to 6 missing skills.`
    );

    const { db, user } = await getAuthenticatedUser(req);
    if (db && user) {
      // 1. Upload resume file to storage and save record to resumes table
      const fileUrl = await uploadResumeFile(db, user.id, req.file);
      await db.from('resumes').insert({
        user_id: user.id,
        file_url: fileUrl || `local-upload:${req.file.originalname}`,
        file_name: req.file.originalname,
        raw_text: resumeText,
      });

      // 2. Save skill gap analysis linked to the user
      const { error } = await db.from('skill_gap_analyses').insert({
        user_id: user.id,
        target_role: targetRole,
        resume_snapshot: resumeText,
        overall_match: data.overallMatch || 0,
        summary: data.summary || '',
        radar_data: Array.isArray(data.radarData) ? data.radarData : [],
        missing_skills: Array.isArray(data.missingSkills) ? data.missingSkills : [],
        recommended_actions: Array.isArray(data.recommendedActions) ? data.recommendedActions : [],
      });

      if (error) {
        console.warn('Supabase save skipped for skill_gap_analyses:', error.message);
      }
    }

    res.json(data);
  } catch (error) {
    next(error);
  }
});

app.get('/api/resumes', async (req, res, next) => {
  try {
    const { db, user } = await getAuthenticatedUser(req);
    if (!db || !user) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    const { data, error } = await db
      .from('resumes')
      .select('*, resume_analyses(*)')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false });

    if (error) throw error;
    res.json(data);
  } catch (error) {
    next(error);
  }
});

app.get('/api/resumes/:id/download-url', async (req, res, next) => {
  try {
    const { db, user } = await getAuthenticatedUser(req);
    if (!db || !user) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    const { data: resume, error } = await db
      .from('resumes')
      .select('file_url')
      .eq('id', req.params.id)
      .eq('user_id', user.id)
      .single();

    if (error || !resume) {
      return res.status(404).json({ message: 'Resume not found' });
    }

    if (!resume.file_url || !resume.file_url.startsWith('supabase://')) {
      return res.status(400).json({ message: 'Resume file is not stored in cloud storage' });
    }

    const cleanUrl = resume.file_url.replace('supabase://', '');
    const parts = cleanUrl.split('/');
    const bucket = parts[0];
    const objectPath = parts.slice(1).join('/');

    const { data: signedData, error: signError } = await db.storage
      .from(bucket)
      .createSignedUrl(objectPath, 60);

    if (signError || !signedData) {
      throw signError || new Error('Could not create signed URL');
    }

    res.json({ url: signedData.signedUrl });
  } catch (error) {
    next(error);
  }
});

app.delete('/api/resumes/:id', async (req, res, next) => {
  try {
    const { db, user } = await getAuthenticatedUser(req);
    if (!db || !user) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    const { data: resume, error: fetchErr } = await db
      .from('resumes')
      .select('file_url')
      .eq('id', req.params.id)
      .eq('user_id', user.id)
      .single();

    if (fetchErr || !resume) {
      return res.status(404).json({ message: 'Resume not found' });
    }

    if (resume.file_url && resume.file_url.startsWith('supabase://')) {
      const cleanUrl = resume.file_url.replace('supabase://', '');
      const parts = cleanUrl.split('/');
      const bucket = parts[0];
      const objectPath = parts.slice(1).join('/');

      const { error: storageErr } = await db.storage.from(bucket).remove([objectPath]);
      if (storageErr) {
        console.warn('Storage file deletion skipped:', storageErr.message);
      }
    }

    const { error: dbErr } = await db
      .from('resumes')
      .delete()
      .eq('id', req.params.id)
      .eq('user_id', user.id);

    if (dbErr) throw dbErr;

    res.json({ success: true, message: 'Resume deleted successfully' });
  } catch (error) {
    next(error);
  }
});

async function saveResumeAnalysis(req, file, resumeText, analysis) {
  const { db, user } = await getAuthenticatedUser(req);
  if (!db || !user) return;

  const fileUrl = await uploadResumeFile(db, user.id, file);

  const { data: resume, error: resumeError } = await db
    .from('resumes')
    .insert({
      user_id: user.id,
      file_url: fileUrl || `local-upload:${file.originalname}`,
      file_name: file.originalname,
      raw_text: resumeText,
    })
    .select('id')
    .single();

  if (resumeError || !resume) {
    console.warn('Supabase resume save skipped:', resumeError?.message);
    return;
  }

  const { error } = await db.from('resume_analyses').insert({
    resume_id: resume.id,
    overall_score: analysis.overallScore || 0,
    keyword_score: analysis.keywordScore || 0,
    formatting_score: analysis.formattingScore || 0,
    skills_score: analysis.skillsScore || 0,
    experience_score: analysis.experienceScore || 0,
    summary: analysis.summary || '',
    suggestions: Array.isArray(analysis.suggestions) ? analysis.suggestions : [],
    keywords_matched: Array.isArray(analysis.keywordsMatched) ? analysis.keywordsMatched : [],
    keywords_missing: Array.isArray(analysis.keywordsMissing) ? analysis.keywordsMissing : [],
  });

  if (error) {
    console.warn('Supabase resume analysis save skipped:', error.message);
  }
}

async function uploadResumeFile(db, userId, file) {
  if (!file?.buffer) return '';

  const bucket = 'resume-uploads';
  const bucketResult = await db.storage.createBucket(bucket, {
    public: false,
    allowedMimeTypes: [
      'application/pdf',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    ],
    fileSizeLimit: 5 * 1024 * 1024,
  });

  if (bucketResult.error && !/already exists/i.test(bucketResult.error.message)) {
    console.warn('Supabase resume bucket create skipped:', bucketResult.error.message);
  }

  const objectPath = `${userId}/${Date.now()}-${safeStorageName(file.originalname)}`;
  const { error } = await db.storage.from(bucket).upload(objectPath, file.buffer, {
    contentType: file.mimetype || 'application/octet-stream',
    upsert: false,
  });

  if (error) {
    console.warn('Supabase resume file upload skipped:', error.message);
    return '';
  }

  return `supabase://${bucket}/${objectPath}`;
}

app.use((error, req, res, next) => {
  console.error(error);
  res.status(error.status || 500).json({
    message: error.message || 'Something went wrong.',
  });
});

if (process.env.NODE_ENV !== 'production' || !process.env.VERCEL) {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}

module.exports = app;
