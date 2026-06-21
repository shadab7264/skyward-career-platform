import { useState } from 'react';
import { motion } from 'framer-motion';
import { FileText, CheckCircle, AlertTriangle, RefreshCcw, History, Trash2, Download, Eye, Loader2 } from 'lucide-react';
import ResumeUploader from '../components/resume/ResumeUploader';
import Card from '../components/common/Card';
import Badge from '../components/common/Badge';
import Button from '../components/common/Button';
import { apiPost, apiGet, apiDelete } from '../lib/api';

export default function ResumeAnalyzerPage() {
  const [isUploading, setIsUploading] = useState(false);
  const [analysisResult, setAnalysisResult] = useState(null);
  const [error, setError] = useState('');
  
  // History & Tab States
  const [activeTab, setActiveTab] = useState('analyze');
  const [history, setHistory] = useState([]);
  const [isLoadingHistory, setIsLoadingHistory] = useState(false);
  const [historyError, setHistoryError] = useState('');

  const handleUpload = async (file) => {
    setIsUploading(true);
    setError('');
    const formData = new FormData();
    formData.append('resume', file);

    try {
      const data = await apiPost('/resume/analyze', formData, true);
      setAnalysisResult(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsUploading(false);
    }
  };

  const fetchHistory = async () => {
    setIsLoadingHistory(true);
    setHistoryError('');
    try {
      const data = await apiGet('/resumes');
      setHistory(data);
    } catch (err) {
      setHistoryError(err.message || 'Failed to load history');
    } finally {
      setIsLoadingHistory(false);
    }
  };

  const handleViewHistoryAnalysis = (resume) => {
    const analysis = resume.resume_analyses?.[0];
    if (analysis) {
      const mappedAnalysis = {
        overallScore: analysis.overall_score,
        keywordScore: analysis.keyword_score,
        formattingScore: analysis.formatting_score,
        experienceScore: analysis.experience_score,
        skillsScore: analysis.skills_score,
        summary: analysis.summary,
        suggestions: analysis.suggestions,
        keywordsMatched: analysis.keywords_matched,
        keywordsMissing: analysis.keywords_missing,
      };
      setAnalysisResult(mappedAnalysis);
    } else {
      alert('No analysis found for this resume.');
    }
  };

  const handleDownload = async (resumeId) => {
    try {
      const res = await apiGet(`/resumes/${resumeId}/download-url`);
      window.open(res.url, '_blank');
    } catch (err) {
      alert('Failed to generate download link: ' + err.message);
    }
  };

  const handleDelete = async (resumeId) => {
    if (!confirm('Are you sure you want to delete this resume and its analysis?')) return;
    try {
      await apiDelete(`/resumes/${resumeId}`);
      setHistory(prev => prev.filter(r => r.id !== resumeId));
    } catch (err) {
      alert('Failed to delete resume: ' + err.message);
    }
  };

  const resetAnalysis = () => setAnalysisResult(null);

  const getScoreColor = (score) => {
    if (score >= 80) return 'text-emerald-500 bg-emerald-50 dark:bg-emerald-950/30';
    if (score >= 50) return 'text-amber-500 bg-amber-50 dark:bg-amber-950/30';
    return 'text-rose-500 bg-rose-50 dark:bg-rose-950/30';
  };

  if (!analysisResult) {
    return (
      <div className="max-w-4xl mx-auto h-full py-6">
        {/* Navigation Tabs */}
        <div className="w-full flex justify-center mb-10">
          <div className="flex bg-slate-100 dark:bg-slate-800/80 p-1.5 rounded-2xl border border-slate-200/50 dark:border-slate-700/50 backdrop-blur-md shadow-inner">
            <button
              onClick={() => setActiveTab('analyze')}
              className={`flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-medium transition-all ${
                activeTab === 'analyze'
                  ? 'bg-white dark:bg-slate-700 text-primary-600 dark:text-white shadow-md'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <FileText className="w-4 h-4" />
              Analyze New Resume
            </button>
            <button
              onClick={() => {
                setActiveTab('history');
                fetchHistory();
              }}
              className={`flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-medium transition-all ${
                activeTab === 'history'
                  ? 'bg-white dark:bg-slate-700 text-primary-600 dark:text-white shadow-md'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <History className="w-4 h-4" />
              Analysis History
            </button>
          </div>
        </div>

        {activeTab === 'analyze' ? (
          <div className="flex flex-col items-center justify-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center mb-10 w-full"
            >
              <div className="w-16 h-16 bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-sm">
                <FileText className="w-8 h-8" />
              </div>
              <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">
                ATS Resume Analyzer
              </h1>
              <p className="text-slate-600 dark:text-slate-400 max-w-lg mx-auto">
                Upload your resume to get an instant, data-driven analysis of your ATS compatibility, keyword match rate, and formatting.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1 }}
              className="w-full"
            >
              <ResumeUploader onUpload={handleUpload} isUploading={isUploading} />
              {error && (
                <p className="mt-4 text-center text-sm text-rose-600 dark:text-rose-400">{error}</p>
              )}
            </motion.div>
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-6"
          >
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Uploaded Resumes</h2>
              <span className="text-sm text-slate-500 dark:text-slate-400">{history.length} Saved Resumes</span>
            </div>

            {isLoadingHistory ? (
              <div className="flex flex-col items-center justify-center py-20">
                <Loader2 className="w-10 h-10 text-primary-500 animate-spin mb-4" />
                <p className="text-slate-600 dark:text-slate-400">Fetching history from Supabase...</p>
              </div>
            ) : historyError ? (
              <div className="text-center py-10 bg-rose-50 dark:bg-rose-950/20 border border-rose-100 dark:border-rose-900 rounded-2xl">
                <AlertTriangle className="w-8 h-8 text-rose-500 mx-auto mb-3" />
                <p className="text-rose-600 dark:text-rose-400">{historyError}</p>
                <Button variant="outline" className="mt-4" onClick={fetchHistory}>Retry</Button>
              </div>
            ) : history.length === 0 ? (
              <div className="text-center py-20 bg-white dark:bg-slate-800/50 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-sm">
                <FileText className="w-12 h-12 text-slate-300 dark:text-slate-600 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">No History Found</h3>
                <p className="text-slate-600 dark:text-slate-400 max-w-sm mx-auto mb-6">
                  You haven't uploaded any resumes for analysis yet. Head over to the analysis tab to begin!
                </p>
                <Button onClick={() => setActiveTab('analyze')}>Upload First Resume</Button>
              </div>
            ) : (
              <div className="grid gap-4">
                {history.map((resume) => {
                  const analysis = resume.resume_analyses?.[0];
                  const score = analysis?.overall_score ?? 0;
                  
                  return (
                    <motion.div
                      key={resume.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="bg-white dark:bg-slate-800/80 p-5 rounded-2xl border border-slate-100 dark:border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-sm hover:shadow-md transition-all"
                    >
                      <div className="flex items-start gap-4">
                        <div className="p-3 bg-blue-50 dark:bg-blue-900/20 text-blue-500 rounded-xl shrink-0">
                          <FileText className="w-6 h-6" />
                        </div>
                        <div className="space-y-1 pr-4 min-w-0 flex-1">
                          <h3 className="font-semibold text-slate-900 dark:text-white truncate">
                            {resume.file_name}
                          </h3>
                          <p className="text-xs text-slate-500 dark:text-slate-400">
                            Uploaded on {new Date(resume.created_at).toLocaleDateString(undefined, {
                              year: 'numeric',
                              month: 'short',
                              day: 'numeric',
                              hour: '2-digit',
                              minute: '2-digit'
                            })}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-3 shrink-0 self-end md:self-auto">
                        {analysis && (
                          <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-sm font-semibold ${getScoreColor(score)}`}>
                            <span>ATS Score:</span>
                            <span className="text-base font-bold">{score}</span>
                          </div>
                        )}

                        <div className="flex items-center gap-1">
                          {analysis && (
                            <button
                              onClick={() => handleViewHistoryAnalysis(resume)}
                              title="View Analysis"
                              className="p-2 text-slate-600 dark:text-slate-400 hover:text-primary-500 dark:hover:text-primary-400 hover:bg-slate-50 dark:hover:bg-slate-700/50 rounded-xl transition-all"
                            >
                              <Eye className="w-5 h-5" />
                            </button>
                          )}
                          
                          {resume.file_url?.startsWith('supabase://') && (
                            <button
                              onClick={() => handleDownload(resume.id)}
                              title="Download File"
                              className="p-2 text-slate-600 dark:text-slate-400 hover:text-emerald-500 dark:hover:text-emerald-400 hover:bg-slate-50 dark:hover:bg-slate-700/50 rounded-xl transition-all"
                            >
                              <Download className="w-5 h-5" />
                            </button>
                          )}

                          <button
                            onClick={() => handleDelete(resume.id)}
                            title="Delete"
                            className="p-2 text-slate-600 dark:text-slate-400 hover:text-rose-500 dark:hover:text-rose-400 hover:bg-slate-50 dark:hover:bg-slate-700/50 rounded-xl transition-all"
                          >
                            <Trash2 className="w-5 h-5" />
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            )}
          </motion.div>
        )}
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto space-y-8 pb-12">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Analysis Results</h1>
          <p className="text-slate-500 dark:text-slate-400">Based on standard ATS parsing algorithms</p>
        </div>
        <Button variant="outline" icon={RefreshCcw} onClick={resetAnalysis}>
          Analyze Another Resume
        </Button>
      </div>

      {/* Top Level Score */}
      <Card className="bg-gradient-to-br from-primary-600 to-secondary-700 text-white border-none shadow-xl shadow-primary-500/20" padding="p-8">
        <div className="flex flex-col md:flex-row items-center gap-8 justify-between">
          <div className="flex-1">
            <h2 className="text-xl font-medium text-white/80 mb-2">Overall ATS Score</h2>
            <div className="flex items-end gap-4 mb-4">
              <span className="text-6xl font-bold">{analysisResult.overallScore}</span>
              <span className="text-xl text-white/60 mb-1">/ 100</span>
            </div>
            <p className="text-white/80 text-lg">
              {analysisResult.summary || 'Your resume has useful strengths, and the suggestions below can improve ATS alignment.'}
            </p>
          </div>
          
          <div className="w-full md:w-1/3 bg-white/10 rounded-2xl p-6 backdrop-blur-md">
            <h3 className="font-semibold mb-4 text-white">Score Breakdown</h3>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-1 text-white/80">
                  <span>Formatting</span>
                  <span>{analysisResult.formattingScore}%</span>
                </div>
                <div className="w-full bg-white/20 rounded-full h-1.5">
                  <div className="bg-white h-1.5 rounded-full" style={{ width: `${analysisResult.formattingScore}%` }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1 text-white/80">
                  <span>Keywords</span>
                  <span>{analysisResult.keywordScore}%</span>
                </div>
                <div className="w-full bg-white/20 rounded-full h-1.5">
                  <div className="bg-white h-1.5 rounded-full" style={{ width: `${analysisResult.keywordScore}%` }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1 text-white/80">
                  <span>Experience</span>
                  <span>{analysisResult.experienceScore}%</span>
                </div>
                <div className="w-full bg-white/20 rounded-full h-1.5">
                  <div className="bg-white h-1.5 rounded-full" style={{ width: `${analysisResult.experienceScore}%` }}></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Card>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Keywords section */}
        <Card>
          <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-6 border-b border-slate-100 dark:border-slate-800 pb-4">
            Keyword Analysis
          </h3>
          
          <div className="mb-6">
            <h4 className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-3 flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-emerald-500" />
              Found Keywords
            </h4>
            <div className="flex flex-wrap gap-2">
              {analysisResult.keywordsMatched.map(kw => (
                <Badge key={kw} variant="success">{kw}</Badge>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-3 flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-rose-500" />
              Missing Keywords (Consider adding)
            </h4>
            <div className="flex flex-wrap gap-2">
              {analysisResult.keywordsMissing.map(kw => (
                <Badge key={kw} variant="danger">{kw}</Badge>
              ))}
            </div>
          </div>
        </Card>

        {/* Actionable Suggestions */}
        <Card>
          <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-6 border-b border-slate-100 dark:border-slate-800 pb-4">
            Improvement Suggestions
          </h3>
          <div className="space-y-4">
            {analysisResult.suggestions.map((suggestion, index) => (
              <div key={index} className="flex gap-4 items-start p-4 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-100 dark:border-slate-700">
                {suggestion.type === 'critical' ? (
                  <AlertTriangle className="w-5 h-5 text-rose-500 mt-0.5 shrink-0" />
                ) : suggestion.type === 'warning' ? (
                  <AlertTriangle className="w-5 h-5 text-amber-500 mt-0.5 shrink-0" />
                ) : (
                  <CheckCircle className="w-5 h-5 text-blue-500 mt-0.5 shrink-0" />
                )}
                <p className="text-slate-700 dark:text-slate-300 text-sm leading-relaxed">
                  {suggestion.text}
                </p>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
