import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Map, Target, Briefcase, Download } from 'lucide-react';
import Input from '../components/common/Input';
import Button from '../components/common/Button';
import Card from '../components/common/Card';
import TimelineNode from '../components/roadmap/TimelineNode';
import { apiPost } from '../lib/api';

const mockRoadmap = [
  {
    type: 'learning',
    timeframe: 'Month 1-2',
    title: 'Master Frontend Fundamentals',
    description: 'Deep dive into advanced JavaScript (ES6+), semantic HTML5, and modern CSS techniques (Flexbox, Grid). Build 3 responsive landing pages.',
    skills: ['JavaScript', 'HTML5', 'CSS3', 'Responsive Design']
  },
  {
    type: 'learning',
    timeframe: 'Month 3-4',
    title: 'React Core & Ecosystem',
    description: 'Learn React hooks, state management (Redux/Zustand), routing, and API integration. Build a CRUD application with authentication.',
    skills: ['React', 'Redux', 'React Router', 'REST APIs']
  },
  {
    type: 'project',
    timeframe: 'Month 5',
    title: 'Full-Stack E-Commerce Project',
    description: 'Build and deploy a complete e-commerce platform using React, Node.js, and MongoDB. Integrate Stripe for payments.',
    skills: ['Node.js', 'MongoDB', 'Stripe', 'Deployment']
  },
  {
    type: 'certification',
    timeframe: 'Month 6',
    title: 'AWS Certified Cloud Practitioner',
    description: 'Prepare for and pass the AWS Cloud Practitioner exam to validate your cloud fundamentals, highly requested by employers.',
    skills: ['AWS', 'Cloud Computing', 'Infrastructure']
  },
  {
    type: 'milestone',
    timeframe: 'Month 7',
    title: 'Ready for Job Applications',
    description: 'Portfolio completed, resume optimized, and interview prep initiated. Start applying for Junior/Mid-level React developer roles.',
    skills: ['Interview Prep', 'Portfolio', 'Networking']
  }
];
void mockRoadmap;

export default function CareerRoadmapPage() {
  const [goal, setGoal] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [roadmap, setRoadmap] = useState(null);
  const [estimatedTimeline, setEstimatedTimeline] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (roadmap) {
      const resetScroll = () => {
        window.scrollTo(0, 0);
        if (document.documentElement) document.documentElement.scrollTop = 0;
        if (document.body) document.body.scrollTop = 0;
        
        const mainEl = document.querySelector('main');
        if (mainEl) {
          mainEl.scrollTop = 0;
        }
      };

      // Reset immediately
      resetScroll();

      // Trigger again after short delay to handle asynchronous layout height updates
      const timer = setTimeout(resetScroll, 100);
      return () => clearTimeout(timer);
    }
  }, [roadmap]);

  const handleGenerate = async (e) => {
    e.preventDefault();
    if (!goal) return;
    
    setIsGenerating(true);
    setError('');
    try {
      const data = await apiPost('/roadmap', { goal });
      setRoadmap(data.roadmap);
      setEstimatedTimeline(data.estimatedTimeline);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsGenerating(false);
    }
  };

  if (!roadmap) {
    return (
      <div className="max-w-4xl mx-auto h-full flex flex-col items-center justify-center py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center w-full"
        >
          <div className="w-16 h-16 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-sm">
            <Map className="w-8 h-8" />
          </div>
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">
            Career Roadmap Generator
          </h1>
          <p className="text-slate-600 dark:text-slate-400 max-w-lg mx-auto mb-12">
            Tell us your ultimate career goal, and we'll generate a step-by-step timeline of skills to learn, projects to build, and milestones to hit.
          </p>

          <Card className="max-w-2xl mx-auto p-8 shadow-xl shadow-slate-200/50 dark:shadow-none">
            <form onSubmit={handleGenerate} className="flex flex-col md:flex-row gap-4">
              <div className="flex-grow">
                <Input
                  icon={Target}
                  placeholder="e.g. Become a Senior Full Stack Engineer in 2 years"
                  value={goal}
                  onChange={(e) => setGoal(e.target.value)}
                  className="w-full"
                />
              </div>
              <Button 
                type="submit" 
                size="md" 
                loading={isGenerating}
                disabled={!goal}
                className="whitespace-nowrap bg-emerald-500 hover:bg-emerald-600 border-none shadow-emerald-500/25 text-white"
              >
                Generate Roadmap
              </Button>
            </form>
            {error && (
              <p className="mt-4 text-sm text-rose-600 dark:text-rose-400">{error}</p>
            )}
          </Card>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-12">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 rounded-xl flex items-center justify-center shrink-0">
            <Briefcase className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-slate-900 dark:text-white">
              {goal}
            </h1>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              Estimated timeline: {estimatedTimeline || 'Custom timeline'}
            </p>
          </div>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" icon={Download}>
            Export PDF
          </Button>
          <Button variant="ghost" onClick={() => setRoadmap(null)}>
            Edit Goal
          </Button>
        </div>
      </div>

      <div className="relative mt-12">
        {roadmap.map((item, i) => (
          <TimelineNode 
            key={i} 
            item={item} 
            index={i} 
            isLast={i === roadmap.length - 1} 
          />
        ))}
      </div>
    </div>
  );
}
