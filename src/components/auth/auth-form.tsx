import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { BarChart3 } from 'lucide-react';
import { useAuth } from '../../lib/auth-context';
import { Button } from '../ui/button';
import { Input } from '../ui/input';

export function AuthForm() {
  const { signIn, signUp, demoLogin, user, loading } = useAuth();
  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    if (user && !loading) {
      navigate('/dashboard');
    }
  }, [user, loading]);

  async function handleDemoLogin() {
    try {
      setFormError(null);
      setIsLoading(true);
      await demoLogin();
      navigate('/dashboard');
    } catch (error) {
      setFormError(error instanceof Error ? error.message : 'Failed to login');
    } finally {
      setIsLoading(false);
    }
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setFormError(null);
    setIsLoading(true);

    const formData = new FormData(e.currentTarget);
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;

    try {
      if (!isLogin) {
        await signUp(email, password);
        setFormError('Check your email for the confirmation link.');
      } else {
        await signIn(email, password);
        navigate('/dashboard');
      }
    } catch (err) {
      setFormError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="w-full max-w-md space-y-8 p-8 bg-white rounded-xl shadow-lg">
      <div className="text-center">
        <div className="flex items-center justify-center mb-6">
          <BarChart3 className="h-8 w-8 text-indigo-600" />
          <span className="ml-2 text-2xl font-bold text-gray-900">A1.money</span>
          <span className="ml-1 text-sm text-gray-500">by Ekazz</span>
        </div>
        <h2 className="text-3xl font-bold">{isLogin ? 'Welcome back' : 'Create account'}</h2>
        <p className="mt-2 text-gray-600">
          {isLogin ? 'Sign in to your account' : 'Sign up for a new account'}
        </p>
        {isLogin && (
          <div className="mt-4 p-4 bg-gray-50 rounded-lg text-left">
            <p className="text-sm font-medium text-gray-900">Demo Account:</p>
            <p className="text-sm text-gray-600">Email: demo@a1.money</p>
            <p className="text-sm text-gray-600">Password: demo123456</p>
          </div>
        )}
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <Input
          name="email"
          type="email"
          label="Email address"
          required
          autoComplete="email"
        />

        <Input
          name="password"
          type="password"
          label={
            <div className="flex justify-between">
              <span>Password</span>
              <button
                type="button"
                className="text-sm text-indigo-600 hover:text-indigo-500"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? 'Hide' : 'Show'}
              </button>
            </div>
          }
          required
          type={showPassword ? "text" : "password"}
          autoComplete={isLogin ? 'current-password' : 'new-password'}
        />

        {formError && (
          <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-sm text-red-600">{formError}</p>
          </div>
        )}

        <Button type="submit" className="w-full" isLoading={isLoading}>
          {isLogin ? 'Sign in' : 'Sign up'}
        </Button>

        <Button
          type="button"
          variant="ghost"
          className="w-full"
          onClick={() => setIsLogin(!isLogin)}
        >
          {isLogin ? "Don't have an account? Sign up" : 'Already have an account? Sign in'}
        </Button>
        
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-white text-gray-500">Or</span>
          </div>
        </div>

        <Button
          type="button"
          variant="outline"
          className="w-full"
          onClick={handleDemoLogin}
          isLoading={isLoading}
        >
          Try Demo Account
        </Button>
      </form>
    </div>
  );
}