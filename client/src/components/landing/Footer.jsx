import { ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';
import { APP_NAME } from '../../utils/constants';
import BrandLogo from '../common/BrandLogo';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white dark:bg-slate-950 pt-16 pb-8 border-t border-slate-200 dark:border-slate-800">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <BrandLogo size="md" />
            </div>
            <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed mb-4">
              Empowering students and job seekers with data-driven career intelligence.
            </p>
            <div className="text-xs text-slate-500 dark:text-slate-400 mb-6 space-y-1">
              <p className="font-medium">Developer: <span className="font-semibold text-slate-800 dark:text-slate-200">Shadab Karim</span></p>
              <p>Email: <a href="mailto:shadab7264karim@gmail.com" className="text-primary-600 dark:text-primary-400 hover:underline">shadab7264karim@gmail.com</a></p>
            </div>
            <a
              href="https://digitalheroesco.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-xl bg-slate-900 px-4 py-2.5 text-sm font-bold text-white shadow-sm transition-colors hover:bg-primary-600 dark:bg-white dark:text-slate-950 dark:hover:bg-cyan-100"
            >
              Built for Digital Heroes
              <ExternalLink className="h-4 w-4" />
            </a>
          </div>
          
          <div>
            <h4 className="font-semibold text-slate-900 dark:text-white mb-4">Product</h4>
            <ul className="space-y-3">
              <li><Link to="/resume" className="text-sm text-slate-500 hover:text-primary-500 dark:text-slate-400 dark:hover:text-primary-400 transition-colors">Resume Analyzer</Link></li>
              <li><Link to="/interview" className="text-sm text-slate-500 hover:text-primary-500 dark:text-slate-400 dark:hover:text-primary-400 transition-colors">Interview Prep</Link></li>
              <li><Link to="/roadmap" className="text-sm text-slate-500 hover:text-primary-500 dark:text-slate-400 dark:hover:text-primary-400 transition-colors">Career Roadmap</Link></li>
              <li><Link to="/skillgap" className="text-sm text-slate-500 hover:text-primary-500 dark:text-slate-400 dark:hover:text-primary-400 transition-colors">Skill Gap Analyzer</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-slate-900 dark:text-white mb-4">Company</h4>
            <ul className="space-y-3">
              <li><a href="#" className="text-sm text-slate-500 hover:text-primary-500 dark:text-slate-400 dark:hover:text-primary-400 transition-colors">About</a></li>
              <li><a href="#" className="text-sm text-slate-500 hover:text-primary-500 dark:text-slate-400 dark:hover:text-primary-400 transition-colors">Blog</a></li>
              <li><a href="#" className="text-sm text-slate-500 hover:text-primary-500 dark:text-slate-400 dark:hover:text-primary-400 transition-colors">Careers</a></li>
              <li><a href="#" className="text-sm text-slate-500 hover:text-primary-500 dark:text-slate-400 dark:hover:text-primary-400 transition-colors">Contact</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-slate-900 dark:text-white mb-4">Legal</h4>
            <ul className="space-y-3">
              <li><a href="#" className="text-sm text-slate-500 hover:text-primary-500 dark:text-slate-400 dark:hover:text-primary-400 transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="text-sm text-slate-500 hover:text-primary-500 dark:text-slate-400 dark:hover:text-primary-400 transition-colors">Terms of Service</a></li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-slate-200 dark:border-slate-800 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-slate-600 dark:text-slate-300">
            &copy; {currentYear} {APP_NAME}. Built by Shadab Karim · shadab7264karim@gmail.com
          </p>
          <div className="text-sm text-slate-600 dark:text-slate-300 flex items-center gap-2">
            <span className="font-semibold">Trust | Excellence | Growth</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
