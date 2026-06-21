import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, User, ArrowRight, Home } from 'lucide-react';
import { useAuth } from '../context/useAuth';
import Input from '../components/common/Input';
import Button from '../components/common/Button';
import BrandLogo from '../components/common/BrandLogo';

export default function RegisterPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { signUp } = useAuth();
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      await signUp(email, password, name);
      // Depending on Supabase settings, email confirmation might be required
      // We will just navigate to login or dashboard
      navigate('/dashboard');
    } catch (err) {
      setError(err.message || 'Failed to create account');
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
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Create an account</h1>
          <p className="text-slate-500 dark:text-slate-400 mt-2">Join thousands of professionals</p>
        </div>

        <div className="bg-white/80 dark:bg-slate-900/80 rounded-2xl shadow-xl border border-slate-200/50 dark:border-slate-800/50 backdrop-blur-md p-8">
          {error && (
            <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 text-sm rounded-xl border border-red-100 dark:border-red-900/30">
              {error}
            </div>
          )}

          <form onSubmit={handleRegister} className="space-y-5">
            <Input
              label="Full Name"
              type="text"
              icon={User}
              placeholder="John Doe"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
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
              minLength={6}
            />

            <Button type="submit" className="w-full" size="lg" loading={loading} iconRight={ArrowRight}>
              Create Account
            </Button>
          </form>

          <div className="mt-6 text-center text-sm text-slate-500 dark:text-slate-400">
            Already have an account?{' '}
            <Link to="/login" className="font-semibold text-primary-600 hover:text-primary-500 dark:text-primary-400 dark:hover:text-primary-300">
              Sign in
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
