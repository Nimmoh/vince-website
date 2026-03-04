'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

interface Service {
  _id: string;
  name: string;
  category: string;
  price: string;
  description: string;
  image?: string;
  status: 'pending' | 'approved' | 'rejected';
  providerId: string;
  providerName: string;
  businessName: string;
  location?: {
    county: string;
    city: string;
  };
  createdAt: string;
}

export default function AdminApprovalsPage() {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<'all' | 'pending' | 'approved' | 'rejected'>('pending');

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      setLoading(true);
      // In production, add proper admin authentication
      const response = await fetch('/api/admin/services', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('vincevic_token')}`,
        },
      });
      const data = await response.json();
      
      if (data.success) {
        setServices(data.data);
      }
    } catch (error) {
      console.error('Error fetching services:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async (id: string) => {
    try {
      const response = await fetch(`/api/admin/services/${id}/approve`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('vincevic_token')}`,
        },
      });

      if (response.ok) {
        alert('Service approved!');
        fetchServices();
      }
    } catch (error) {
      alert('Error approving service');
    }
  };

  const handleReject = async (id: string) => {
    if (!confirm('Are you sure you want to reject this service?')) return;

    try {
      const response = await fetch(`/api/admin/services/${id}/reject`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('vincevic_token')}`,
        },
      });

      if (response.ok) {
        alert('Service rejected');
        fetchServices();
      }
    } catch (error) {
      alert('Error rejecting service');
    }
  };

  const filteredServices = services.filter(s => 
    filter === 'all' ? true : s.status === filter
  );

  const getStatusBadge = (status: string) => {
    const styles = {
      approved: 'bg-green-100 text-green-800',
      pending: 'bg-yellow-100 text-yellow-800',
      rejected: 'bg-red-100 text-red-800',
    };
    return styles[status as keyof typeof styles];
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Service Approvals</h1>
              <p className="text-sm text-gray-600">Review and approve provider services</p>
            </div>
            <Link
              href="/admin"
              className="bg-gray-600 hover:bg-gray-700 text-white px-6 py-2 rounded-lg font-medium transition-colors"
            >
              ← Back to Admin
            </Link>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Filter Tabs */}
        <div className="mb-6 flex gap-2">
          <button
            onClick={() => setFilter('all')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              filter === 'all'
                ? 'bg-green-600 text-white'
                : 'bg-white text-gray-700 hover:bg-gray-100'
            }`}
          >
            All ({services.length})
          </button>
          <button
            onClick={() => setFilter('pending')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              filter === 'pending'
                ? 'bg-yellow-600 text-white'
                : 'bg-white text-gray-700 hover:bg-gray-100'
            }`}
          >
            Pending ({services.filter(s => s.status === 'pending').length})
          </button>
          <button
            onClick={() => setFilter('approved')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              filter === 'approved'
                ? 'bg-green-600 text-white'
                : 'bg-white text-gray-700 hover:bg-gray-100'
            }`}
          >
            Approved ({services.filter(s => s.status === 'approved').length})
          </button>
          <button
            onClick={() => setFilter('rejected')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              filter === 'rejected'
                ? 'bg-red-600 text-white'
                : 'bg-white text-gray-700 hover:bg-gray-100'
            }`}
          >
            Rejected ({services.filter(s => s.status === 'rejected').length})
          </button>
        </div>

        {loading ? (
          <div className="text-center py-12">
            <p className="text-gray-500">Loading services...</p>
          </div>
        ) : filteredServices.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-lg">
            <p className="text-gray-500">No services found.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredServices.map((service) => (
              <div key={service._id} className="bg-white rounded-lg shadow-sm p-6">
                <div className="flex gap-6">
                  {/* Image */}
                  <div className="w-48 h-48 flex-shrink-0 bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg overflow-hidden">
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
                  </div>

                  {/* Details */}
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="text-xl font-semibold text-gray-900">{service.name}</h3>
                        <p className="text-sm text-gray-600">
                          by {service.businessName} ({service.providerName})
                        </p>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusBadge(service.status)}`}>
                        {service.status}
                      </span>
                    </div>

                    <div className="grid grid-cols-2 gap-4 mb-3">
                      <div>
                        <p className="text-sm text-gray-600">Category</p>
                        <p className="font-medium text-gray-900 capitalize">{service.category}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Price</p>
                        <p className="font-medium text-green-600">{service.price}</p>
                      </div>
                      {service.location && (
                        <div>
                          <p className="text-sm text-gray-600">Location</p>
                          <p className="font-medium text-gray-900">
                            {service.location.city}, {service.location.county}
                          </p>
                        </div>
                      )}
                      <div>
                        <p className="text-sm text-gray-600">Posted</p>
                        <p className="font-medium text-gray-900">
                          {new Date(service.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                    </div>

                    <div className="mb-4">
                      <p className="text-sm text-gray-600 mb-1">Description</p>
                      <p className="text-gray-900">{service.description}</p>
                    </div>

                    {/* Actions */}
                    {service.status === 'pending' && (
                      <div className="flex gap-3">
                        <button
                          onClick={() => handleApprove(service._id)}
                          className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg font-medium transition-colors"
                        >
                          ✓ Approve
                        </button>
                        <button
                          onClick={() => handleReject(service._id)}
                          className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-lg font-medium transition-colors"
                        >
                          ✕ Reject
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
