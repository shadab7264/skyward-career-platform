import { useState } from 'react';
import { motion } from 'framer-motion';
import { Target, FileText, CheckCircle, Activity, TrendingUp } from 'lucide-react';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer } from 'recharts';
import Card from '../components/common/Card';
import Input from '../components/common/Input';
import Button from '../components/common/Button';
import Badge from '../components/common/Badge';
import { apiPost } from '../lib/api';

const mockData = {
  overallMatch: 68,
  radarData: [
    { subject: 'Frontend', resume: 85, required: 90, fullMark: 100 },
    { subject: 'Backend', resume: 40, required: 70, fullMark: 100 },
    { subject: 'Database', resume: 60, required: 65, fullMark: 100 },
    { subject: 'DevOps', resume: 20, required: 50, fullMark: 100 },
    { subject: 'Testing', resume: 70, required: 80, fullMark: 100 },
    { subject: 'Architecture', resume: 30, required: 60, fullMark: 100 },
  ],
  missingSkills: [
    { skill: 'Docker/Kubernetes', priority: 'High', category: 'DevOps' },
    { skill: 'System Design', priority: 'High', category: 'Architecture' },
    { skill: 'Node.js/Express', priority: 'Medium', category: 'Backend' },
    { skill: 'GraphQL', priority: 'Low', category: 'Backend' },
  ]
};
void mockData;

export default function SkillGapPage() {
  const [targetRole, setTargetRole] = useState('');
  const [resumeFile, setResumeFile] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [results, setResults] = useState(null);
  const [error, setError] = useState('');

  const handleAnalyze = async (e) => {
    e.preventDefault();
    if (!targetRole || !resumeFile) return;
    
    setIsAnalyzing(true);
    setError('');
    const formData = new FormData();
    formData.append('targetRole', targetRole);
    formData.append('resume', resumeFile);

    try {
      const data = await apiPost('/skill-gap/analyze', formData, true);
      setResults(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsAnalyzing(false);
    }
  };

  if (!results) {
    return (
      <div className="max-w-4xl mx-auto h-full flex flex-col items-center justify-center py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center w-full"
        >
          <div className="w-16 h-16 bg-rose-100 dark:bg-rose-900/30 text-rose-600 dark:text-rose-400 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-sm">
            <Activity className="w-8 h-8" />
          </div>
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">
            Skill Gap Analyzer
          </h1>
          <p className="text-slate-600 dark:text-slate-400 max-w-lg mx-auto mb-12">
            Compare your current resume against your target role to identify missing skills, assess your readiness, and find growth opportunities.
          </p>

          <Card className="max-w-2xl mx-auto p-8 shadow-xl shadow-slate-200/50 dark:shadow-none">
            <form onSubmit={handleAnalyze} className="space-y-6">
              {/* Target Role Input */}
              <div className="text-left">
                <Input
                  label="Target Role"
                  icon={Target}
                  placeholder="e.g. Full Stack Developer"
                  value={targetRole}
                  onChange={(e) => setTargetRole(e.target.value)}
                  required
                />
              </div>

              {/* Resume Upload Block */}
              <div className="space-y-3 text-left">
                <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 tracking-wide uppercase">
                  Resume Document
                </label>
                
                <div className="w-full">
                  {!resumeFile ? (
                    // Sleek Modern File Bar (Default State)
                    <div
                      onClick={() => document.getElementById('skillgap-file-input').click()}
                      className="group flex flex-col sm:flex-row items-center justify-between p-6 bg-slate-50/50 dark:bg-slate-900/40 border border-slate-200 dark:border-slate-800 hover:border-rose-500/50 dark:hover:border-rose-500/50 rounded-2xl cursor-pointer transition-all duration-300 hover:shadow-md backdrop-blur-sm"
                    >
                      <input 
                        id="skillgap-file-input"
                        type="file" 
                        className="hidden" 
                        accept=".pdf,.doc,.docx"
                        onChange={(e) => {
                          if (e.target.files && e.target.files[0]) {
                            setResumeFile(e.target.files[0]);
                          }
                        }}
                        disabled={isAnalyzing}
                      />
                      <div className="flex items-center gap-4 text-center sm:text-left mb-4 sm:mb-0">
                        <div className="w-12 h-12 bg-rose-100 dark:bg-rose-950/40 text-rose-500 rounded-xl flex items-center justify-center shadow-inner group-hover:scale-110 transition-transform duration-300">
                          <FileText className="w-6 h-6" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-slate-850 dark:text-slate-200">Attach your resume</h4>
                          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">PDF or DOCX formats up to 5MB</p>
                        </div>
                      </div>
                      
                      <div className="px-5 py-2.5 bg-rose-500 hover:bg-rose-600 text-white rounded-xl text-sm font-semibold transition-all shadow-md shadow-rose-500/10 hover:shadow-rose-500/25">
                        Browse Files
                      </div>
                    </div>
                  ) : (
                    // Premium Selected File Meta Card (Active State)
                    <div className="p-6 bg-emerald-500/5 dark:bg-emerald-500/10 border border-emerald-500/30 rounded-2xl transition-all duration-300">
                      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                        <div className="flex items-center gap-4 text-center sm:text-left">
                          <div className="w-12 h-12 bg-emerald-100 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 rounded-xl flex items-center justify-center">
                            <CheckCircle className="w-6 h-6" />
                          </div>
                          <div className="min-w-0 flex-1">
                            <h4 className="font-semibold text-slate-800 dark:text-slate-200 truncate max-w-[250px] sm:max-w-[350px]">
                              {resumeFile.name}
                            </h4>
                            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                              Ready for gap analysis • {(resumeFile.size / (1024 * 1024)).toFixed(2)} MB
                            </p>
                          </div>
                        </div>

                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            setResumeFile(null);
                          }}
                          className="px-4 py-2 text-xs font-semibold text-slate-600 dark:text-slate-400 hover:text-rose-500 dark:hover:text-rose-400 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-rose-500/30 rounded-xl transition-all shadow-sm"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
              
              <Button 
                type="submit" 
                size="lg" 
                loading={isAnalyzing}
                disabled={!targetRole || !resumeFile}
                className="w-full bg-rose-500 hover:bg-rose-600 border-none shadow-lg shadow-rose-500/25 text-white"
              >
                Analyze Skill Gap
              </Button>
              {error && (
                <p className="text-sm text-rose-600 dark:text-rose-400 text-center">{error}</p>
              )}
            </form>
          </Card>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto space-y-8 pb-12">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white mb-1">
            Skill Gap Analysis
          </h1>
          <p className="text-slate-500 dark:text-slate-400">
            Comparing your profile to <span className="font-semibold text-slate-700 dark:text-slate-300">{targetRole}</span>
          </p>
        </div>
        <Button variant="outline" onClick={() => setResults(null)}>
          New Analysis
        </Button>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <Card>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-6">Competency Radar</h3>
            <div className="h-[400px] w-full bg-slate-50/50 dark:bg-slate-900/20 rounded-xl p-4">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart cx="50%" cy="50%" outerRadius="70%" data={results.radarData}>
                  <PolarGrid stroke="#cbd5e1" strokeDasharray="3 3" />
                  <PolarAngleAxis dataKey="subject" tick={{ fill: '#64748b', fontSize: 12 }} />
                  <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
                  <Radar name="Your Skills" dataKey="resume" stroke="#0A66C2" fill="#0A66C2" fillOpacity={0.5} />
                  <Radar name="Required" dataKey="required" stroke="#F59E0B" fill="#F59E0B" fillOpacity={0.3} />
                </RadarChart>
              </ResponsiveContainer>
            </div>
            <div className="flex justify-center gap-6 mt-4 text-sm">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-[#0A66C2] rounded-sm opacity-50"></div>
                <span className="text-slate-600 dark:text-slate-400">Your Skills</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-[#F59E0B] rounded-sm opacity-30"></div>
                <span className="text-slate-600 dark:text-slate-400">Required Level</span>
              </div>
            </div>
          </Card>

          <Card>
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-rose-500" />
                Critical Missing Skills
              </h3>
            </div>
            
            <div className="space-y-4">
              {results.missingSkills.map((item, i) => (
                <div key={i} className="flex items-center justify-between p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
                  <div>
                    <h4 className="font-semibold text-slate-900 dark:text-white mb-1">{item.skill}</h4>
                    <span className="text-xs text-slate-500">{item.category}</span>
                  </div>
                  <Badge variant={item.priority === 'High' ? 'danger' : item.priority === 'Medium' ? 'warning' : 'default'}>
                    {item.priority} Priority
                  </Badge>
                </div>
              ))}
            </div>
          </Card>
        </div>

        <div className="space-y-8">
          <Card className="bg-gradient-to-br from-slate-900 to-slate-800 text-white border-none">
            <h3 className="text-lg font-medium text-slate-300 mb-2">Overall Match Score</h3>
            <div className="flex items-end gap-2 mb-6">
              <span className="text-5xl font-bold text-emerald-400">{results.overallMatch}%</span>
            </div>
            <p className="text-slate-300 text-sm leading-relaxed mb-6">
              {results.summary || 'Closing the priority gaps below can improve your match for this role.'}
            </p>
            <Button className="w-full bg-white/10 hover:bg-white/20 text-white border-none">
              Generate Custom Roadmap
            </Button>
          </Card>

          <Card>
            <h3 className="font-bold text-slate-900 dark:text-white mb-4">Recommended Actions</h3>
            <ul className="space-y-4">
              {(results.recommendedActions || []).map((action, index) => (
                <li key={action} className="flex gap-3 text-sm">
                  <div className="w-6 h-6 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 flex items-center justify-center shrink-0 mt-0.5">{index + 1}</div>
                  <p className="text-slate-600 dark:text-slate-400">{action}</p>
                </li>
              ))}
            </ul>
          </Card>
        </div>
      </div>
    </div>
  );
}
