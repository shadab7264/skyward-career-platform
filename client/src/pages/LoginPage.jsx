import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, ArrowRight, Home } from 'lucide-react';
import { useAuth } from '../context/useAuth';
import Input from '../components/common/Input';
import Button from '../components/common/Button';
import BrandLogo from '../components/common/BrandLogo';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { signIn } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      await signIn(email, password);
      navigate('/dashboard');
    } catch (err) {
      setError(err.message || 'Failed to sign in');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen relative flex items-center justify-center bg-slate-50 dark:bg-slate-950 p-4 overflow-hidden">
      {/* Background decorative blobs */}
      <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-primary-500/10 dark:bg-primary-500/5 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-1/4 right-1/4 translate-x-1/2 translate-y-1/2 w-96 h-96 bg-secondary-500/10 dark:bg-secondary-500/5 rounded-full blur-3xl pointer-events-none"></div>

      {/* Floating Home button */}
      <Link
        to="/"
        className="absolute top-6 left-6 flex items-center gap-2 px-4 py-2.5 text-sm font-medium text-slate-700 dark:text-slate-300 bg-white/60 dark:bg-slate-900/60 hover:bg-white dark:hover:bg-slate-900 border border-slate-200/50 dark:border-slate-800/50 backdrop-blur-md rounded-xl transition-all shadow-sm hover:shadow z-20"
      >
        <Home className="w-4 h-4" />
        Back to Home
      </Link>

      <div className="w-full max-w-md relative z-10">
        <div className="text-center mb-8">
          <BrandLogo size="xl" className="mx-auto mb-4 inline-flex" />
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Welcome back</h1>
          <p className="text-slate-500 dark:text-slate-400 mt-2">Sign in to your account to continue</p>
        </div>

        <div className="bg-white/80 dark:bg-slate-900/80 rounded-2xl shadow-xl border border-slate-200/50 dark:border-slate-800/50 backdrop-blur-md p-8">
          {error && (
            <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 text-sm rounded-xl border border-red-100 dark:border-red-900/30">
              {error}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-5">
            <Input
              label="Email address"
              type="email"
              icon={Mail}
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <Input
              label="Password"
              type="password"
              icon={Lock}
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 rounded border-slate-300 text-primary-600 focus:ring-primary-600"
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-slate-700 dark:text-slate-300">
                  Remember me
                </label>
              </div>
              <div className="text-sm">
                <a href="#" className="font-medium text-primary-600 hover:text-primary-500">
                  Forgot password?
                </a>
              </div>
            </div>

            <Button type="submit" className="w-full" size="lg" loading={loading} iconRight={ArrowRight}>
              Sign In
            </Button>
          </form>

          <div className="mt-6 text-center text-sm text-slate-500 dark:text-slate-400">
            Don't have an account?{' '}
            <Link to="/register" className="font-semibold text-primary-600 hover:text-primary-500 dark:text-primary-400 dark:hover:text-primary-300">
              Sign up
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
