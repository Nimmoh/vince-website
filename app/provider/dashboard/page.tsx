'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/lib/AuthContext';

interface Service {
  _id: string;
  name: string;
  category: string;
  price: string;
  description: string;
  image?: string;
  status: 'pending' | 'approved' | 'rejected' | 'inactive';
  views: number;
  contactCount: number;
  createdAt: string;
}

interface Stats {
  totalServices: number;
  activeServices: number;
  pendingServices: number;
  totalViews: number;
  totalContacts: number;
}

export default function ProviderDashboard() {
  const router = useRouter();
  const { user, token, isProvider } = useAuth();
  const [services, setServices] = useState<Service[]>([]);
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'overview' | 'services'>('overview');

  useEffect(() => {
    if (!isProvider) {
      router.push('/login');
      return;
    }
    fetchData();
  }, [isProvider]);

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/provider/services', {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      const data = await response.json();
      
      if (data.success) {
        setServices(data.data);
        calculateStats(data.data);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const calculateStats = (servicesList: Service[]) => {
    const stats: Stats = {
      totalServices: servicesList.length,
      activeServices: servicesList.filter(s => s.status === 'approved').length,
      pendingServices: servicesList.filter(s => s.status === 'pending').length,
      totalViews: servicesList.reduce((sum, s) => sum + (s.views || 0), 0),
      totalContacts: servicesList.reduce((sum, s) => sum + (s.contactCount || 0), 0),
    };
    setStats(stats);
  };

  const handleDeleteService = async (id: string) => {
    if (!confirm('Are you sure you want to delete this service?')) return;

    try {
      const response = await fetch(`/api/provider/services/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (response.ok) {
        alert('Service deleted successfully!');
        fetchData();
      }
    } catch (error) {
      alert('Error deleting service');
    }
  };

  const getStatusBadge = (status: string) => {
    const styles = {
      approved: 'bg-green-100 text-green-800',
      pending: 'bg-yellow-100 text-yellow-800',
      rejected: 'bg-red-100 text-red-800',
      inactive: 'bg-gray-100 text-gray-800',
    };
    return styles[status as keyof typeof styles] || styles.inactive;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0f1117] flex items-center justify-center">
        <p className="text-gray-400">Loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0f1117]">
      {/* Header */}
      <header className="bg-[#1a1d29] border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-[#c9a84c]">Provider Dashboard</h1>
              <p className="text-sm text-gray-400">Welcome back, {user?.name}</p>
            </div>
            <div className="flex gap-3">
              <Link
                href="/"
                className="bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-lg transition-colors"
              >
                View Site
              </Link>
              <Link
                href="/provider/services/new"
                className="bg-[#c9a84c] hover:bg-[#b8973d] text-[#0f1117] px-4 py-2 rounded-lg font-semibold transition-colors"
              >
                + Post Service
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Tabs */}
      <div className="bg-[#1a1d29] border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex gap-4">
            <button
              onClick={() => setActiveTab('overview')}
              className={`px-4 py-3 font-medium border-b-2 transition-colors ${
                activeTab === 'overview'
                  ? 'border-[#c9a84c] text-[#c9a84c]'
                  : 'border-transparent text-gray-400 hover:text-gray-300'
              }`}
            >
              Overview
            </button>
            <button
              onClick={() => setActiveTab('services')}
              className={`px-4 py-3 font-medium border-b-2 transition-colors ${
                activeTab === 'services'
                  ? 'border-[#c9a84c] text-[#c9a84c]'
                  : 'border-transparent text-gray-400 hover:text-gray-300'
              }`}
            >
              My Services ({services.length})
            </button>
          </div>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Overview Tab */}
        {activeTab === 'overview' && stats && (
          <div>
            <h2 className="text-xl font-semibold text-white mb-6">Dashboard Overview</h2>
            
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
              <div className="bg-[#1a1d29] rounded-lg p-6 border border-gray-800">
                <div className="text-sm text-gray-400 mb-1">Total Services</div>
                <div className="text-3xl font-bold text-[#c9a84c]">{stats.totalServices}</div>
              </div>
              <div className="bg-[#1a1d29] rounded-lg p-6 border border-gray-800">
                <div className="text-sm text-gray-400 mb-1">Active</div>
                <div className="text-3xl font-bold text-green-500">{stats.activeServices}</div>
              </div>
              <div className="bg-[#1a1d29] rounded-lg p-6 border border-gray-800">
                <div className="text-sm text-gray-400 mb-1">Pending</div>
                <div className="text-3xl font-bold text-yellow-500">{stats.pendingServices}</div>
              </div>
              <div className="bg-[#1a1d29] rounded-lg p-6 border border-gray-800">
                <div className="text-sm text-gray-400 mb-1">Total Views</div>
                <div className="text-3xl font-bold text-blue-500">{stats.totalViews}</div>
              </div>
              <div className="bg-[#1a1d29] rounded-lg p-6 border border-gray-800">
                <div className="text-sm text-gray-400 mb-1">Contacts</div>
                <div className="text-3xl font-bold text-purple-500">{stats.totalContacts}</div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-[#1a1d29] rounded-lg p-6 border border-gray-800">
              <h3 className="text-lg font-semibold text-white mb-4">Quick Actions</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Link
                  href="/provider/services/new"
                  className="bg-[#c9a84c] hover:bg-[#b8973d] text-[#0f1117] p-4 rounded-lg text-center font-semibold transition-colors"
                >
                  📝 Post New Service
                </Link>
                <Link
                  href="/provider/profile"
                  className="bg-gray-700 hover:bg-gray-600 text-white p-4 rounded-lg text-center font-semibold transition-colors"
                >
                  👤 Edit Profile
                </Link>
                <button
                  onClick={() => setActiveTab('services')}
                  className="bg-gray-700 hover:bg-gray-600 text-white p-4 rounded-lg text-center font-semibold transition-colors"
                >
                  📊 View Services
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Services Tab */}
        {activeTab === 'services' && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold text-white">My Services</h2>
              <Link
                href="/provider/services/new"
                className="bg-[#c9a84c] hover:bg-[#b8973d] text-[#0f1117] px-6 py-2 rounded-lg font-semibold transition-colors"
              >
                + Post New Service
              </Link>
            </div>

            {services.length === 0 ? (
              <div className="text-center py-12 bg-[#1a1d29] rounded-lg border border-gray-800">
                <p className="text-gray-400 mb-4">You haven't posted any services yet.</p>
                <Link
                  href="/provider/services/new"
                  className="inline-block bg-[#c9a84c] hover:bg-[#b8973d] text-[#0f1117] px-6 py-2 rounded-lg font-semibold transition-colors"
                >
                  Post Your First Service
                </Link>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {services.map((service) => (
                  <div key={service._id} className="bg-[#1a1d29] rounded-lg overflow-hidden border border-gray-800">
                    <div className="aspect-square bg-gradient-to-br from-gray-800 to-gray-900 relative">
                      {service.image && (service.image.startsWith('/images/') || service.image.startsWith('data:image')) ? (
                        <img
                          src={service.image}
                          alt={service.name}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-6xl">
                          {service.image || '📦'}
                        </div>
                      )}
                      <div className="absolute top-2 right-2">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusBadge(service.status)}`}>
                          {service.status}
                        </span>
                      </div>
                    </div>
                    <div className="p-4">
                      <h4 className="font-semibold text-white mb-1">{service.name}</h4>
                      <p className="text-sm text-gray-400 mb-2 line-clamp-2">{service.description}</p>
                      <p className="text-lg font-bold text-[#c9a84c] mb-3">{service.price}</p>
                      
                      <div className="flex gap-2 text-xs text-gray-400 mb-3">
                        <span>👁 {service.views || 0} views</span>
                        <span>📞 {service.contactCount || 0} contacts</span>
                      </div>

                      <div className="flex gap-2">
                        <Link
                          href={`/provider/services/${service._id}/edit`}
                          className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg text-sm font-medium text-center transition-colors"
                        >
                          Edit
                        </Link>
                        <button
                          onClick={() => handleDeleteService(service._id)}
                          className="flex-1 bg-red-600 hover:bg-red-700 text-white py-2 rounded-lg text-sm font-medium transition-colors"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
}
