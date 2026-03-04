'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/lib/AuthContext';

export default function NewServicePage() {
  const router = useRouter();
  const { token, isProvider } = useAuth();
  const [loading, setLoading] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    category: 'shades',
    price: '',
    priceNegotiable: false,
    description: '',
    image: '',
    location: {
      county: '',
      city: '',
    },
  });

  if (!isProvider) {
    router.push('/login');
    return null;
  }

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      alert('Please select an image file');
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      alert('Image size should be less than 5MB');
      return;
    }

    try {
      setUploadingImage(true);
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({ ...formData, image: reader.result as string });
        setUploadingImage(false);
      };
      reader.onerror = () => {
        alert('Error reading file');
        setUploadingImage(false);
      };
      reader.readAsDataURL(file);
    } catch (error) {
      alert('Failed to upload image');
      setUploadingImage(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch('/api/provider/services', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (data.success) {
        alert('Service posted successfully! It will be reviewed by admin.');
        router.push('/provider/dashboard');
      } else {
        alert('Failed to post service: ' + data.error);
      }
    } catch (error) {
      alert('An error occurred while posting the service.');
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
          <h1 className="text-2xl font-bold text-white mb-6">Post New Service</h1>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Service Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-4 py-3 bg-[#0f1117] border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#c9a84c] text-white"
                placeholder="e.g., Premium Car Shade Installation"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Category <span className="text-red-500">*</span>
                </label>
                <select
                  required
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="w-full px-4 py-3 bg-[#0f1117] border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#c9a84c] text-white"
                >
                  <option value="shades">Shades</option>
                  <option value="gazebo">Gazebos</option>
                  <option value="pagola">Pagolas</option>
                  <option value="gates">Gates</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Price <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={formData.price}
                  onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                  className="w-full px-4 py-3 bg-[#0f1117] border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#c9a84c] text-white"
                  placeholder="e.g., KSh 45,000"
                />
              </div>
            </div>

            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="negotiable"
                checked={formData.priceNegotiable}
                onChange={(e) => setFormData({ ...formData, priceNegotiable: e.target.checked })}
                className="w-4 h-4 text-[#c9a84c] bg-[#0f1117] border-gray-700 rounded focus:ring-[#c9a84c]"
              />
              <label htmlFor="negotiable" className="text-sm text-gray-300">
                Price is negotiable
              </label>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Description <span className="text-red-500">*</span>
              </label>
              <textarea
                required
                rows={5}
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="w-full px-4 py-3 bg-[#0f1117] border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#c9a84c] text-white"
                placeholder="Describe your service in detail..."
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  County
                </label>
                <input
                  type="text"
                  value={formData.location.county}
                  onChange={(e) => setFormData({ ...formData, location: { ...formData.location, county: e.target.value } })}
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
                  value={formData.location.city}
                  onChange={(e) => setFormData({ ...formData, location: { ...formData.location, city: e.target.value } })}
                  className="w-full px-4 py-3 bg-[#0f1117] border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#c9a84c] text-white"
                  placeholder="e.g., Westlands"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Service Image
              </label>
              
              {formData.image && (
                <div className="mb-3">
                  <div className="relative w-full h-48 bg-gray-900 rounded-lg overflow-hidden border border-gray-700">
                    <img
                      src={formData.image}
                      alt="Preview"
                      className="w-full h-full object-cover"
                    />
                    <button
                      type="button"
                      onClick={() => setFormData({ ...formData, image: '' })}
                      className="absolute top-2 right-2 bg-red-500 hover:bg-red-600 text-white p-2 rounded-full transition-colors"
                    >
                      ✕
                    </button>
                  </div>
                </div>
              )}

              <label className="block">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                  disabled={uploadingImage}
                />
                <div className="cursor-pointer bg-[#0f1117] hover:bg-gray-900 border-2 border-dashed border-gray-700 rounded-lg p-6 text-center transition-colors">
                  {uploadingImage ? (
                    <div className="flex items-center justify-center gap-2">
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-[#c9a84c]"></div>
                      <span className="text-[#c9a84c] font-medium">Uploading...</span>
                    </div>
                  ) : (
                    <>
                      <div className="text-3xl mb-2">📸</div>
                      <div className="text-sm font-medium text-gray-300">
                        Click to upload image
                      </div>
                      <div className="text-xs text-gray-500 mt-1">
                        PNG, JPG, JPEG up to 5MB
                      </div>
                    </>
                  )}
                </div>
              </label>
            </div>

            <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-4">
              <p className="text-yellow-500 text-sm">
                ℹ️ Your service will be reviewed by admin before it goes live on the marketplace.
              </p>
            </div>

            <div className="flex gap-4">
              <button
                type="submit"
                disabled={loading || uploadingImage}
                className="flex-1 bg-[#c9a84c] hover:bg-[#b8973d] text-[#0f1117] py-3 rounded-lg font-semibold transition-colors disabled:opacity-50"
              >
                {loading ? 'Posting...' : 'Post Service'}
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
