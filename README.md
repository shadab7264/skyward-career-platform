# Skyward Career Intelligence Platform

A production-grade SaaS platform to help students and job seekers analyze resumes, prepare for interviews, identify skill gaps, and generate career roadmaps.

Built for **Digital Heroes** by **Shadab Karim**.

## Features

- **ATS Resume Analyzer**: Upload PDF/DOCX to get instant feedback on ATS compatibility, keyword matches, and formatting.
- **Interview Prep Hub**: Generate tailored technical, behavioral, and scenario-based questions based on your target role.
- **Career Roadmap Generator**: Create step-by-step learning paths with milestones and recommended projects.
- **Skill Gap Analyzer**: Compare your current resume against your target role to identify missing skills.
- **Admin Dashboard**: Analytics and user engagement overview.

## Tech Stack

- **Frontend**: React 19, Vite, Tailwind CSS v4, Framer Motion, React Router, Recharts, dnd-kit.
- **Backend**: Node.js, Express.
- **Database / Auth**: Supabase (PostgreSQL).
- **Deployment**: Vercel ready.

## Local Development Setup

### 1. Clone the repository

### 2. Setup Supabase
1. Create a project at [Supabase](https://supabase.com).
2. Run the SQL scripts located in `supabase/schema.sql` and `supabase/seed.sql` in the Supabase SQL editor.
3. Get your URL and Anon Key.

The app stores user profiles, signup/login audit events, uploaded resume metadata, extracted resume text, AI resume analyses, interview sessions, roadmaps, and skill-gap analyses in the tables created by `supabase/schema.sql`. Uploaded resume files are stored in the private `resume-uploads` Storage bucket.

### 3. Setup Environment Variables
Copy `.env.example` to `.env` in both the `client` and `server` directories and fill in the values.
Add `GEMINI_API_KEY` in the server environment so the AI-powered resume, roadmap, interview, and skill-gap endpoints can generate real answers.
Add `SUPABASE_URL` and `SUPABASE_ANON_KEY` in the server environment so generated results can be saved to each logged-in user's database records.

### 4. Install Dependencies
```bash
# Frontend
cd client
npm install

# Backend
cd ../server
npm install
```

### 5. Run the Application
```bash
# Frontend (in one terminal)
cd client
npm run dev

# Backend (in another terminal)
cd server
npm start
```

## Deployment

This project includes a `vercel.json` configured for monorepo deployment. Simply connect the repository to Vercel, and it will deploy both the React frontend and the Express backend automatically.
