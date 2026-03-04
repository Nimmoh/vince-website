'use client';

import { useState, useEffect, Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useCart } from '@/lib/CartContext';

interface Service {
  _id: string;
  name: string;
  category: string;
  price: string;
  description: string;
  image?: string;
  location?: {
    county: string;
    city: string;
  };
  provider?: {
    name: string;
    businessName: string;
    verified: boolean;
    rating: number;
  };
}

function SearchContent() {
  const searchParams = useSearchParams();
  const { addToCart } = useCart();
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    q: searchParams.get('q') || '',
    category: searchParams.get('category') || 'all',
    county: searchParams.get('county') || '',
    sortBy: searchParams.get('sortBy') || 'recent',
    verified: searchParams.get('verified') === 'true',
  });

  useEffect(() => {
    fetchServices();
  }, [filters]);

  const fetchServices = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams();
      if (filters.q) params.append('q', filters.q);
      if (filters.category !== 'all') params.append('category', filters.category);
      if (filters.county) params.append('county', filters.county);
      params.append('sortBy', filters.sortBy);
      if (filters.verified) params.append('verified', 'true');

      const response = await fetch(`/api/services/search?${params}`);
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

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    fetchServices();
  };

  return (
    <div className="min-h-screen bg-[#0f1117]">
      {/* Header */}
      <header className="bg-[#1a1d29] border-b border-gray-800 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="text-2xl font-bold text-[#c9a84c]">
              Vincevic Shades
            </Link>
            <Link href="/" className="text-gray-400 hover:text-white">
              ← Back to Home
            </Link>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search Bar */}
        <form onSubmit={handleSearch} className="mb-8">
          <div className="flex gap-4">
            <input
              type="text"
              value={filters.q}
              onChange={(e) => setFilters({ ...filters, q: e.target.value })}
              placeholder="Search services..."
              className="flex-1 px-4 py-3 bg-[#1a1d29] border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#c9a84c] text-white"
            />
            <button
              type="submit"
              className="bg-[#c9a84c] hover:bg-[#b8973d] text-[#0f1117] px-8 py-3 rounded-lg font-semibold transition-colors"
            >
              Search
            </button>
          </div>
        </form>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Filters Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-[#1a1d29] rounded-lg p-6 border border-gray-800 sticky top-24">
              <h3 className="text-lg font-semibold text-white mb-4">Filters</h3>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Category
                  </label>
                  <select
                    value={filters.category}
                    onChange={(e) => setFilters({ ...filters, category: e.target.value })}
                    className="w-full px-3 py-2 bg-[#0f1117] border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#c9a84c] text-white"
                  >
                    <option value="all">All Categories</option>
                    <option value="shades">Shades</option>
                    <option value="gazebo">Gazebos</option>
                    <option value="pagola">Pagolas</option>
                    <option value="gates">Gates</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Location
                  </label>
                  <input
                    type="text"
                    value={filters.county}
                    onChange={(e) => setFilters({ ...filters, county: e.target.value })}
                    placeholder="County..."
                    className="w-full px-3 py-2 bg-[#0f1117] border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#c9a84c] text-white"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Sort By
                  </label>
                  <select
                    value={filters.sortBy}
                    onChange={(e) => setFilters({ ...filters, sortBy: e.target.value })}
                    className="w-full px-3 py-2 bg-[#0f1117] border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#c9a84c] text-white"
                  >
                    <option value="recent">Most Recent</option>
                    <option value="popular">Most Popular</option>
                    <option value="price-low">Price: Low to High</option>
                    <option value="price-high">Price: High to Low</option>
                  </select>
                </div>

                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="verified"
                    checked={filters.verified}
                    onChange={(e) => setFilters({ ...filters, verified: e.target.checked })}
                    className="w-4 h-4 text-[#c9a84c] bg-[#0f1117] border-gray-700 rounded focus:ring-[#c9a84c]"
                  />
                  <label htmlFor="verified" className="text-sm text-gray-300">
                    Verified Providers Only
                  </label>
                </div>
              </div>
            </div>
          </div>

          {/* Results */}
          <div className="lg:col-span-3">
            <div className="mb-4">
              <p className="text-gray-400">
                {loading ? 'Searching...' : `${services.length} services found`}
              </p>
            </div>

            {loading ? (
              <div className="text-center py-12">
                <p className="text-gray-400">Loading...</p>
              </div>
            ) : services.length === 0 ? (
              <div className="text-center py-12 bg-[#1a1d29] rounded-lg border border-gray-800">
                <p className="text-gray-400">No services found. Try different filters.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {services.map((service) => (
                  <div key={service._id} className="bg-[#1a1d29] rounded-lg overflow-hidden border border-gray-800 hover:border-[#c9a84c] transition-colors">
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
                      {service.provider?.verified && (
                        <div className="absolute top-2 right-2 bg-green-500 text-white px-2 py-1 rounded text-xs font-semibold">
                          ✓ Verified
                        </div>
                      )}
                    </div>
                    <div className="p-4">
                      <h4 className="font-semibold text-white mb-1">{service.name}</h4>
                      {service.provider && (
                        <p className="text-xs text-gray-400 mb-2">
                          by {service.provider.businessName || service.provider.name}
                        </p>
                      )}
                      <p className="text-sm text-gray-400 mb-2 line-clamp-2">{service.description}</p>
                      {service.location && (
                        <p className="text-xs text-gray-500 mb-2">
                          📍 {service.location.city}, {service.location.county}
                        </p>
                      )}
                      <p className="text-lg font-bold text-[#c9a84c] mb-3">{service.price}</p>
                      <button
                        onClick={() => addToCart(service)}
                        className="w-full bg-[#c9a84c] hover:bg-[#b8973d] text-[#0f1117] py-2 rounded-lg font-semibold transition-colors"
                      >
                        Add to Cart
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}


export default function SearchPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#0f1117] flex items-center justify-center"><p className="text-gray-400">Loading...</p></div>}>
      <SearchContent />
    </Suspense>
  );
}
