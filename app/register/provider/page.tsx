'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/lib/AuthContext';

export default function ProviderRegisterPage() {
  const router = useRouter();
  const { register } = useAuth();
  const [formData, setFormData] = useState({
    name: '',
    businessName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    setLoading(true);

    try {
      await register({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        password: formData.password,
        role: 'provider',
        businessName: formData.businessName,
      });
      router.push('/provider/dashboard');
    } catch (err: any) {
      setError(err.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0f1117] flex items-center justify-center px-4 py-8">
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <Link href="/" className="inline-block">
            <h1 className="text-3xl font-bold text-[#c9a84c]">Vincevic Shades</h1>
          </Link>
          <p className="text-gray-400 mt-2">Register as a Service Provider</p>
          <p className="text-gray-500 text-sm mt-1">Start offering your services on our marketplace</p>
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
                Your Full Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-4 py-3 bg-[#0f1117] border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#c9a84c] text-white"
                placeholder="John Doe"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Business Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                required
                value={formData.businessName}
                onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
                className="w-full px-4 py-3 bg-[#0f1117] border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#c9a84c] text-white"
                placeholder="Your Business Name"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Email <span className="text-red-500">*</span>
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
                Phone Number <span className="text-red-500">*</span>
              </label>
              <input
                type="tel"
                required
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full px-4 py-3 bg-[#0f1117] border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#c9a84c] text-white"
                placeholder="0712345678"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Password <span className="text-red-500">*</span>
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

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Confirm Password <span className="text-red-500">*</span>
              </label>
              <input
                type="password"
                required
                value={formData.confirmPassword}
                onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                className="w-full px-4 py-3 bg-[#0f1117] border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#c9a84c] text-white"
                placeholder="••••••••"
              />
            </div>

            <div className="bg-[#c9a84c]/10 border border-[#c9a84c]/30 rounded-lg p-4">
              <h4 className="text-[#c9a84c] font-semibold mb-2">Provider Benefits:</h4>
              <ul className="text-gray-300 text-sm space-y-1">
                <li>✓ Post unlimited services (Free plan: 3 listings)</li>
                <li>✓ Reach thousands of customers</li>
                <li>✓ Manage your business dashboard</li>
                <li>✓ Get customer inquiries directly</li>
              </ul>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#c9a84c] hover:bg-[#b8973d] text-[#0f1117] font-semibold py-3 rounded-lg transition-colors disabled:opacity-50"
            >
              {loading ? 'Creating Account...' : 'Register as Provider'}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-gray-400 text-sm">
              Already have an account?{' '}
              <Link href="/login" className="text-[#c9a84c] hover:underline">
                Sign in
              </Link>
            </p>
            <p className="text-gray-400 text-sm mt-2">
              Just looking to hire services?{' '}
              <Link href="/register" className="text-[#c9a84c] hover:underline">
                Register as Customer
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
