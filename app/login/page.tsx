'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/lib/AuthContext';

export default function LoginPage() {
  const router = useRouter();
  const { login } = useAuth();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await login(formData.email, formData.password);
      router.push('/');
    } catch (err: any) {
      setError(err.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0f1117] flex items-center justify-center px-4">
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <Link href="/" className="inline-block">
            <h1 className="text-3xl font-bold text-[#c9a84c]">Vincevic Shades</h1>
          </Link>
          <p className="text-gray-400 mt-2">Sign in to your account</p>
        </div>

        <div className="bg-[#1a1d29] rounded-lg p-8 shadow-xl">
          {error && (
            <div className="mb-4 p-3 bg-red-500/10 border border-red-500 rounded text-red-500 text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Email
              </label>
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-4 py-3 bg-[#0f1117] border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#c9a84c] text-white"
                placeholder="your@email.com"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Password
              </label>
              <input
                type="password"
                required
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                className="w-full px-4 py-3 bg-[#0f1117] border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#c9a84c] text-white"
                placeholder="••••••••"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#c9a84c] hover:bg-[#b8973d] text-[#0f1117] font-semibold py-3 rounded-lg transition-colors disabled:opacity-50"
            >
              {loading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-gray-400 text-sm">
              Don't have an account?{' '}
              <Link href="/register" className="text-[#c9a84c] hover:underline">
                Sign up
              </Link>
            </p>
            <p className="text-gray-400 text-sm mt-2">
              Want to become a provider?{' '}
              <Link href="/register/provider" className="text-[#c9a84c] hover:underline">
                Register as Provider
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
