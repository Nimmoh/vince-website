'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { useCart } from '@/lib/CartContext';

interface Provider {
  _id: string;
  profile: {
    name: string;
    phone: string;
    bio?: string;
    location?: {
      county: string;
      city: string;
    };
  };
  providerInfo: {
    businessName: string;
    verified: boolean;
    rating: number;
    totalReviews: number;
    joinedDate: string;
  };
}

interface Service {
  _id: string;
  name: string;
  category: string;
  price: string;
  description: string;
  image?: string;
  views: number;
}

interface Review {
  _id: string;
  rating: number;
  comment: string;
  customerName: string;
  createdAt: string;
}

export default function ProviderProfilePage() {
  const params = useParams();
  const { addToCart } = useCart();
  const [provider, setProvider] = useState<Provider | null>(null);
  const [services, setServices] = useState<Service[]>([]);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'services' | 'reviews'>('services');

  useEffect(() => {
    fetchData();
  }, [params.id]);

  const fetchData = async () => {
    try {
      setLoading(true);
      
      // Fetch provider
      const providerRes = await fetch(`/api/users/${params.id}`);
      const providerData = await providerRes.json();
      if (providerData.success) {
        setProvider(providerData.data);
      }

      // Fetch provider's services
      const servicesRes = await fetch(`/api/services?providerId=${params.id}`);
      const servicesData = await servicesRes.json();
      if (servicesData.success) {
        setServices(servicesData.data.filter((s: any) => s.status === 'approved'));
      }

      // Fetch reviews
      const reviewsRes = await fetch(`/api/reviews?providerId=${params.id}`);
      const reviewsData = await reviewsRes.json();
      if (reviewsData.success) {
        setReviews(reviewsData.data);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0f1117] flex items-center justify-center">
        <p className="text-gray-400">Loading...</p>
      </div>
    );
  }

  if (!provider) {
    return (
      <div className="min-h-screen bg-[#0f1117] flex items-center justify-center">
        <p className="text-gray-400">Provider not found</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0f1117]">
      {/* Header */}
      <header className="bg-[#1a1d29] border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Link href="/search" className="text-[#c9a84c] hover:underline">
            ← Back to Search
          </Link>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Provider Info */}
        <div className="bg-[#1a1d29] rounded-lg p-8 border border-gray-800 mb-8">
          <div className="flex items-start justify-between">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <h1 className="text-3xl font-bold text-white">
                  {provider.providerInfo.businessName}
                </h1>
                {provider.providerInfo.verified && (
                  <span className="bg-green-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                    ✓ Verified
                  </span>
                )}
              </div>
              <p className="text-gray-400 mb-4">by {provider.profile.name}</p>
              
              <div className="flex items-center gap-6 mb-4">
                <div className="flex items-center gap-2">
                  <span className="text-[#c9a84c] text-2xl">⭐</span>
                  <span className="text-white font-semibold">
                    {provider.providerInfo.rating}/5
                  </span>
                  <span className="text-gray-400 text-sm">
                    ({provider.providerInfo.totalReviews} reviews)
                  </span>
                </div>
                {provider.profile.location && (
                  <div className="text-gray-400">
                    📍 {provider.profile.location.city}, {provider.profile.location.county}
                  </div>
                )}
              </div>

              {provider.profile.bio && (
                <p className="text-gray-300 mb-4">{provider.profile.bio}</p>
              )}

              <div className="text-sm text-gray-400">
                Member since {new Date(provider.providerInfo.joinedDate).toLocaleDateString()}
              </div>
            </div>

            <a
              href={`tel:${provider.profile.phone}`}
              className="bg-[#c9a84c] hover:bg-[#b8973d] text-[#0f1117] px-6 py-3 rounded-lg font-semibold transition-colors"
            >
              📞 Call {provider.profile.phone}
            </a>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-[#1a1d29] border-b border-gray-800 rounded-t-lg">
          <div className="flex gap-4 px-6">
            <button
              onClick={() => setActiveTab('services')}
              className={`px-4 py-3 font-medium border-b-2 transition-colors ${
                activeTab === 'services'
                  ? 'border-[#c9a84c] text-[#c9a84c]'
                  : 'border-transparent text-gray-400 hover:text-gray-300'
              }`}
            >
              Services ({services.length})
            </button>
            <button
              onClick={() => setActiveTab('reviews')}
              className={`px-4 py-3 font-medium border-b-2 transition-colors ${
                activeTab === 'reviews'
                  ? 'border-[#c9a84c] text-[#c9a84c]'
                  : 'border-transparent text-gray-400 hover:text-gray-300'
              }`}
            >
              Reviews ({reviews.length})
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="bg-[#1a1d29] rounded-b-lg p-6 border border-gray-800 border-t-0">
          {activeTab === 'services' && (
            <div>
              {services.length === 0 ? (
                <p className="text-center text-gray-400 py-8">No services available</p>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {services.map((service) => (
                    <div key={service._id} className="bg-[#0f1117] rounded-lg overflow-hidden border border-gray-700">
                      <div className="aspect-square bg-gradient-to-br from-gray-800 to-gray-900">
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
                      <div className="p-4">
                        <h4 className="font-semibold text-white mb-2">{service.name}</h4>
                        <p className="text-sm text-gray-400 mb-3 line-clamp-2">{service.description}</p>
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
          )}

          {activeTab === 'reviews' && (
            <div>
              {reviews.length === 0 ? (
                <p className="text-center text-gray-400 py-8">No reviews yet</p>
              ) : (
                <div className="space-y-4">
                  {reviews.map((review) => (
                    <div key={review._id} className="bg-[#0f1117] rounded-lg p-6 border border-gray-700">
                      <div className="flex items-center justify-between mb-3">
                        <div>
                          <p className="font-semibold text-white">{review.customerName}</p>
                          <p className="text-sm text-gray-400">
                            {new Date(review.createdAt).toLocaleDateString()}
                          </p>
                        </div>
                        <div className="flex items-center gap-1">
                          {[...Array(5)].map((_, i) => (
                            <span key={i} className={i < review.rating ? 'text-[#c9a84c]' : 'text-gray-600'}>
                              ⭐
                            </span>
                          ))}
                        </div>
                      </div>
                      <p className="text-gray-300">{review.comment}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
