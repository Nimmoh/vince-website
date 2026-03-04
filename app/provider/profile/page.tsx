'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/lib/AuthContext';

export default function ProviderProfilePage() {
  const router = useRouter();
  const { user, token, isProvider } = useAuth();
  const [loading, setLoading] = useState(false);
  const [profile, setProfile] = useState<any>(null);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    bio: '',
    businessName: '',
    county: '',
    city: '',
  });

  useEffect(() => {
    if (!isProvider) {
      router.push('/login');
      return;
    }
    fetchProfile();
  }, [isProvider]);

  const fetchProfile = async () => {
    try {
      const response = await fetch(`/api/users/${user?.id}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      const data = await response.json();
      
      if (data.success) {
        setProfile(data.data);
        setFormData({
          name: data.data.profile.name || '',
          phone: data.data.profile.phone || '',
          bio: data.data.profile.bio || '',
          businessName: data.data.providerInfo?.businessName || '',
          county: data.data.profile.location?.county || '',
          city: data.data.profile.location?.city || '',
        });
      }
    } catch (error) {
      console.error('Error fetching profile:', error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch(`/api/users/${user?.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          profile: {
            name: formData.name,
            phone: formData.phone,
            bio: formData.bio,
            location: {
              county: formData.county,
              city: formData.city,
            },
          },
          providerInfo: {
            businessName: formData.businessName,
          },
        }),
      });

      const data = await response.json();

      if (data.success) {
        alert('Profile updated successfully!');
        fetchProfile();
      } else {
        alert('Failed to update profile: ' + data.error);
      }
    } catch (error) {
      alert('An error occurred while updating profile.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0f1117] py-8">
      <div className="max-w-3xl mx-auto px-4">
        <div className="mb-6">
          <Link
            href="/provider/dashboard"
            className="text-[#c9a84c] hover:underline"
          >
            ← Back to Dashboard
          </Link>
        </div>

        <div className="bg-[#1a1d29] rounded-lg p-8 border border-gray-800">
          <h1 className="text-2xl font-bold text-white mb-6">Provider Profile</h1>

          {profile && (
            <div className="mb-6 p-4 bg-[#0f1117] rounded-lg border border-gray-700">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-gray-400">Status:</span>
                  <span className={`ml-2 font-semibold ${profile.providerInfo?.verified ? 'text-green-500' : 'text-yellow-500'}`}>
                    {profile.providerInfo?.verified ? '✓ Verified' : 'Pending Verification'}
                  </span>
                </div>
                <div>
                  <span className="text-gray-400">Rating:</span>
                  <span className="ml-2 text-[#c9a84c] font-semibold">
                    ⭐ {profile.providerInfo?.rating || 0}/5
                  </span>
                </div>
                <div>
                  <span className="text-gray-400">Total Reviews:</span>
                  <span className="ml-2 text-white font-semibold">
                    {profile.providerInfo?.totalReviews || 0}
                  </span>
                </div>
                <div>
                  <span className="text-gray-400">Subscription:</span>
                  <span className="ml-2 text-white font-semibold uppercase">
                    {profile.providerInfo?.subscription || 'free'}
                  </span>
                </div>
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Your Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-4 py-3 bg-[#0f1117] border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#c9a84c] text-white"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Business Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                required
                value={formData.businessName}
                onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
                className="w-full px-4 py-3 bg-[#0f1117] border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#c9a84c] text-white"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Phone Number <span className="text-red-500">*</span>
              </label>
              <input
                type="tel"
                required
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full px-4 py-3 bg-[#0f1117] border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#c9a84c] text-white"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Bio / About Your Business
              </label>
              <textarea
                rows={4}
                value={formData.bio}
                onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                className="w-full px-4 py-3 bg-[#0f1117] border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#c9a84c] text-white"
                placeholder="Tell customers about your business..."
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  County
                </label>
                <input
                  type="text"
                  value={formData.county}
                  onChange={(e) => setFormData({ ...formData, county: e.target.value })}
                  className="w-full px-4 py-3 bg-[#0f1117] border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#c9a84c] text-white"
                  placeholder="e.g., Nairobi"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  City/Area
                </label>
                <input
                  type="text"
                  value={formData.city}
                  onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                  className="w-full px-4 py-3 bg-[#0f1117] border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#c9a84c] text-white"
                  placeholder="e.g., Westlands"
                />
              </div>
            </div>

            <div className="flex gap-4">
              <button
                type="submit"
                disabled={loading}
                className="flex-1 bg-[#c9a84c] hover:bg-[#b8973d] text-[#0f1117] py-3 rounded-lg font-semibold transition-colors disabled:opacity-50"
              >
                {loading ? 'Saving...' : 'Save Profile'}
              </button>
              <Link
                href="/provider/dashboard"
                className="px-6 bg-gray-700 hover:bg-gray-600 text-white py-3 rounded-lg font-semibold transition-colors text-center"
              >
                Cancel
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
