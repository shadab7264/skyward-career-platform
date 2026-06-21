import { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, MessageSquare, Target, Clock, Zap } from 'lucide-react';
import Input from '../components/common/Input';
import Button from '../components/common/Button';
import Card from '../components/common/Card';
import QuestionCard from '../components/interview/QuestionCard';
import { apiPost } from '../lib/api';

const mockQuestions = [
  {
    type: 'technical',
    difficulty: 'medium',
    question: 'Explain the Virtual DOM in React and how it differs from the Real DOM.',
    answerGuidance: [
      'Define Real DOM (Document Object Model) as the actual browser representation.',
      'Explain Virtual DOM as a lightweight memory representation of the Real DOM.',
      'Describe the reconciliation process and diffing algorithm.',
      'Highlight performance benefits: batched updates minimize expensive Real DOM manipulation.'
    ]
  },
  {
    type: 'technical',
    difficulty: 'hard',
    question: 'How would you optimize a React application that is experiencing performance issues with large lists?',
    answerGuidance: [
      'Mention component memoization (React.memo, useMemo, useCallback).',
      'Explain the concept of virtualization/windowing (using libraries like react-window).',
      'Discuss lazy loading of components with React.lazy and Suspense.',
      'Address proper use of keys in lists to optimize rendering.'
    ]
  },
  {
    type: 'hr',
    difficulty: 'easy',
    question: 'Tell me about a time you disagreed with a senior engineer or manager. How did you handle it?',
    answerGuidance: [
      'Use the STAR method (Situation, Task, Action, Result).',
      'Focus on the Action: show that you handled the disagreement professionally, relying on data or objective reasoning rather than emotion.',
      'Highlight communication skills and willingness to compromise.',
      'Ensure the Result is positive or a valuable learning experience.'
    ]
  },
  {
    type: 'scenario',
    difficulty: 'medium',
    question: 'You discover a critical bug in production on a Friday afternoon. What steps do you take?',
    answerGuidance: [
      '1. Assess impact and communicate with stakeholders/team immediately.',
      '2. If possible, initiate an immediate rollback to the last stable version.',
      '3. Reproduce the bug locally, write a failing test, and fix it.',
      '4. Deploy the fix and conduct a post-mortem to prevent future occurrences.'
    ]
  },
  {
    type: 'technical',
    difficulty: 'medium',
    question: 'What are React Hooks? Explain the difference between useState and useReducer.',
    answerGuidance: [
      'Explain Hooks allow state and lifecycle features in functional components.',
      'useState is for simple, independent pieces of state.',
      'useReducer is for complex state logic that involves multiple sub-values or when the next state depends on the previous one.',
      'Mention that useReducer is similar to Redux.'
    ]
  },
  {
    type: 'technical',
    difficulty: 'hard',
    question: 'Explain the concept of Event Delegation in JavaScript.',
    answerGuidance: [
      'Define Event Delegation as adding a single event listener to a parent element.',
      'Explain how it uses event bubbling (events propagating up the DOM tree).',
      'Highlight benefits: better memory usage, handles dynamically added elements automatically.',
      'Give a concrete example like a list of buttons.'
    ]
  },
  {
    type: 'hr',
    difficulty: 'medium',
    question: 'Describe a project that failed. What went wrong and what did you learn?',
    answerGuidance: [
      'Choose a real failure, but not one caused by gross negligence.',
      'Take accountability for your part in the failure.',
      'Focus heavily on the lessons learned and how you changed your process afterward.',
      'Show resilience and a growth mindset.'
    ]
  },
  {
    type: 'scenario',
    difficulty: 'hard',
    question: 'Your team is missing a critical deadline due to scope creep. How do you communicate this to the stakeholders?',
    answerGuidance: [
      'Communicate early—do not wait until the deadline day.',
      'Come with a proposed solution or alternatives (e.g., cutting non-essential features).',
      'Be transparent about the causes without blaming individuals.',
      'Focus on realigning expectations and resetting the timeline.'
    ]
  },
  {
    type: 'technical',
    difficulty: 'easy',
    question: 'What is Semantic HTML and why is it important?',
    answerGuidance: [
      'Define it as using HTML tags that convey meaning (e.g., <header>, <article>, <nav>).',
      'Explain benefits for SEO (search engines understand content better).',
      'Explain benefits for Accessibility (screen readers can navigate the page).',
      'Mention maintainability and cleaner code.'
    ]
  },
  {
    type: 'technical',
    difficulty: 'medium',
    question: 'How does CSS Grid differ from Flexbox? When would you use one over the other?',
    answerGuidance: [
      'Flexbox is 1-dimensional (rows OR columns).',
      'Grid is 2-dimensional (rows AND columns).',
      'Use Flexbox for alignment and distributing space within a single line/axis.',
      'Use Grid for complex, macro-level page layouts.'
    ]
  },
  {
    type: 'hr',
    difficulty: 'medium',
    question: 'Where do you see yourself in 5 years?',
    answerGuidance: [
      'Align your answer with the company’s trajectory and the role you are applying for.',
      'Express a desire to deepen your technical expertise or move into technical leadership.',
      'Avoid mentioning plans to start your own competing company or leaving the industry.',
      'Show ambition but remain realistic.'
    ]
  },
  {
    type: 'scenario',
    difficulty: 'medium',
    question: 'A junior developer on your team keeps pushing code that breaks the build. How do you handle it?',
    answerGuidance: [
      'Approach the situation with empathy, not anger.',
      'Set up a pair-programming session to understand their workflow.',
      'Ensure CI/CD pipelines have proper automated checks (linting, tests) before merges.',
      'Review the PR process and ensure they understand expectations.'
    ]
  },
  {
    type: 'technical',
    difficulty: 'hard',
    question: 'Explain CORS (Cross-Origin Resource Sharing). How do you resolve CORS errors?',
    answerGuidance: [
      'Define CORS as a security feature implemented by browsers.',
      'Explain it restricts web pages from making requests to a different domain than the one that served the web page.',
      'Explain that the server must include specific HTTP headers (Access-Control-Allow-Origin) to permit the request.',
      'Mention preflight requests (OPTIONS).'
    ]
  },
  {
    type: 'technical',
    difficulty: 'medium',
    question: 'What are the differences between REST and GraphQL?',
    answerGuidance: [
      'REST has multiple endpoints for different resources; GraphQL uses a single endpoint.',
      'REST often suffers from over-fetching or under-fetching data.',
      'GraphQL allows the client to specify exactly what data it needs.',
      'REST relies on standard HTTP methods (GET, POST, PUT, DELETE) natively.'
    ]
  },
  {
    type: 'hr',
    difficulty: 'easy',
    question: 'Why do you want to work here?',
    answerGuidance: [
      'Research the company beforehand and mention specific products or culture points.',
      'Align their mission with your own personal career goals.',
      'Mention how your specific skills can solve their current problems.',
      'Show genuine enthusiasm for the industry they operate in.'
    ]
  }
];
void mockQuestions;

export default function InterviewPrepPage() {
  const [targetRole, setTargetRole] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [questions, setQuestions] = useState(null);
  const [error, setError] = useState('');

  const handleGenerate = async (e) => {
    e.preventDefault();
    if (!targetRole) return;
    
    setIsGenerating(true);
    setError('');
    try {
      const data = await apiPost('/interview/questions', { targetRole });
      setQuestions(data.questions);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsGenerating(false);
    }
  };

  if (!questions) {
    return (
      <div className="max-w-4xl mx-auto h-full flex flex-col items-center justify-center py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center w-full"
        >
          <div className="w-16 h-16 bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-sm">
            <MessageSquare className="w-8 h-8" />
          </div>
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">
            Interview Prep Hub
          </h1>
          <p className="text-slate-600 dark:text-slate-400 max-w-lg mx-auto mb-12">
            Enter your target role to generate a customized set of technical, behavioral, and scenario-based questions with expert answer strategies.
          </p>

          <Card className="max-w-2xl mx-auto p-8 shadow-xl shadow-slate-200/50 dark:shadow-none">
            <form onSubmit={handleGenerate} className="flex flex-col md:flex-row gap-4">
              <div className="flex-grow">
                <Input
                  icon={Search}
                  placeholder="e.g. Senior Frontend Engineer, Product Manager"
                  value={targetRole}
                  onChange={(e) => setTargetRole(e.target.value)}
                  className="w-full"
                />
              </div>
              <Button 
                type="submit" 
                size="md" 
                loading={isGenerating}
                disabled={!targetRole}
                className="whitespace-nowrap"
              >
                Generate Questions
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
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white mb-1">
            Interview Prep: {targetRole}
          </h1>
          <p className="text-slate-500 dark:text-slate-400">
            Practice these tailored questions. Mark them as done when you're confident.
          </p>
        </div>
        <Button variant="outline" onClick={() => setQuestions(null)}>
          Change Role
        </Button>
      </div>

      <div className="grid md:grid-cols-3 gap-6 mb-8">
        <Card className="bg-primary-50 dark:bg-primary-900/10 border-primary-100 dark:border-primary-900/30">
          <div className="flex items-center gap-3 text-primary-600 dark:text-primary-400 mb-2">
            <Target className="w-5 h-5" />
            <h3 className="font-semibold">Strategy</h3>
          </div>
          <p className="text-sm text-slate-600 dark:text-slate-400">
            Use the STAR method for behavioral questions. Focus on impact and metrics.
          </p>
        </Card>
        <Card className="bg-emerald-50 dark:bg-emerald-900/10 border-emerald-100 dark:border-emerald-900/30">
          <div className="flex items-center gap-3 text-emerald-600 dark:text-emerald-400 mb-2">
            <Clock className="w-5 h-5" />
            <h3 className="font-semibold">Pacing</h3>
          </div>
          <p className="text-sm text-slate-600 dark:text-slate-400">
            Keep answers between 2-3 minutes. Pause and think before answering hard questions.
          </p>
        </Card>
        <Card className="bg-amber-50 dark:bg-amber-900/10 border-amber-100 dark:border-amber-900/30">
          <div className="flex items-center gap-3 text-amber-600 dark:text-amber-400 mb-2">
            <Zap className="w-5 h-5" />
            <h3 className="font-semibold">Confidence</h3>
          </div>
          <p className="text-sm text-slate-600 dark:text-slate-400">
            It's okay to say "I don't know, but here's how I would find out."
          </p>
        </Card>
      </div>

      <div className="space-y-4">
        {questions.map((q, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
          >
            <QuestionCard index={i} {...q} />
          </motion.div>
        ))}
      </div>
    </div>
  );
}
