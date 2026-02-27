'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

interface Order {
  _id: string;
  orderNumber: string;
  customerName: string;
  customerPhone: string;
  customerEmail?: string;
  items: {
    serviceId: string;
    serviceName: string;
    price: string;
    quantity: number;
  }[];
  totalAmount: string;
  status: 'pending' | 'contacted' | 'confirmed' | 'completed' | 'cancelled';
  notes?: string;
  createdAt: string;
}

interface Stats {
  overview: {
    totalOrders: number;
    totalCustomers: number;
    totalInquiries: number;
    totalServices: number;
    totalRevenue: string;
  };
  orders: {
    pending: number;
    confirmed: number;
    completed: number;
  };
  inquiries: {
    total: number;
    new: number;
  };
  topServices: {
    _id: string;
    count: number;
    serviceId: string;
  }[];
  recentOrders: {
    _id: string;
    orderNumber: string;
    customerName: string;
    totalAmount: string;
    status: string;
    createdAt: string;
  }[];
}

interface Service {
  _id: string;
  name: string;
  category: string;
  price: string;
  description: string;
  image?: string;
}

interface Portfolio {
  _id: string;
  title: string;
  category: string;
  images: string[];
  description: string;
  location?: string;
  featured?: boolean;
}

interface Inquiry {
  _id: string;
  name: string;
  phone: string;
  email?: string;
  serviceName?: string;
  message: string;
  status: string;
  createdAt: string;
}

interface Portfolio {
  _id: string;
  title: string;
  category: string;
  images: string[];
  description: string;
  location?: string;
  featured?: boolean;
}

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState<'services' | 'inquiries' | 'portfolio' | 'orders' | 'stats'>('stats');
  const [services, setServices] = useState<Service[]>([]);
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [portfolio, setPortfolio] = useState<Portfolio[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [editingService, setEditingService] = useState<Service | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    category: 'shades',
    price: '',
    description: '',
    image: '',
  });

  useEffect(() => {
    fetchServices();
    fetchInquiries();
    fetchPortfolio();
    fetchOrders();
    fetchStats();
  }, []);

  const fetchServices = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/services');
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

  const fetchInquiries = async () => {
    try {
      const response = await fetch('/api/inquiries');
      const data = await response.json();
      if (data.success) {
        setInquiries(data.data);
      }
    } catch (error) {
      console.error('Error fetching inquiries:', error);
    }
  };

  const fetchPortfolio = async () => {
    try {
      const response = await fetch('/api/portfolio');
      const data = await response.json();
      if (data.success) {
        setPortfolio(data.data);
      }
    } catch (error) {
      console.error('Error fetching portfolio:', error);
    }
  };

  const fetchOrders = async () => {
    try {
      const response = await fetch('/api/orders');
      const data = await response.json();
      if (data.success) {
        setOrders(data.data);
      }
    } catch (error) {
      console.error('Error fetching orders:', error);
    }
  };

  const fetchStats = async () => {
    try {
      const response = await fetch('/api/stats');
      const data = await response.json();
      if (data.success) {
        setStats(data.data);
      }
    } catch (error) {
      console.error('Error fetching stats:', error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const url = editingService ? `/api/services/${editingService._id}` : '/api/services';
      const method = editingService ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (data.success) {
        alert(editingService ? 'Service updated successfully!' : 'Service added successfully!');
        setShowForm(false);
        setEditingService(null);
        setFormData({ name: '', category: 'shades', price: '', description: '', image: '' });
        fetchServices();
      } else {
        alert('Failed to save service: ' + data.error);
      }
    } catch (error) {
      console.error('Error saving service:', error);
      alert('An error occurred while saving the service.');
    }
  };

  const handleEdit = (service: Service) => {
    setEditingService(service);
    setFormData({
      name: service.name,
      category: service.category,
      price: service.price,
      description: service.description,
      image: service.image || '',
    });
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this service?')) return;

    try {
      const response = await fetch(`/api/services/${id}`, {
        method: 'DELETE',
      });

      const data = await response.json();

      if (data.success) {
        alert('Service deleted successfully!');
        fetchServices();
      } else {
        alert('Failed to delete service.');
      }
    } catch (error) {
      console.error('Error deleting service:', error);
      alert('An error occurred while deleting the service.');
    }
  };

  const categoryIcon = (category: string) => {
    const icons: any = {
      shades: '☂️',
      gazebo: '⛺',
      pagola: '🏛️',
      gates: '🚪',
    };
    return icons[category] || '📦';
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
              <p className="text-sm text-gray-600">Vincevic Shades Interprises</p>
            </div>
            <Link
              href="/"
              className="bg-gray-600 hover:bg-gray-700 text-white px-6 py-2 rounded-lg font-medium transition-colors"
            >
              View Website
            </Link>
          </div>
        </div>
      </header>

      {/* Tabs */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex gap-4">
            <button
              onClick={() => setActiveTab('stats')}
              className={`px-4 py-3 font-medium border-b-2 transition-colors ${
                activeTab === 'stats'
                  ? 'border-green-600 text-green-600'
                  : 'border-transparent text-gray-600 hover:text-gray-900'
              }`}
            >
              Dashboard
            </button>
            <button
              onClick={() => setActiveTab('orders')}
              className={`px-4 py-3 font-medium border-b-2 transition-colors ${
                activeTab === 'orders'
                  ? 'border-green-600 text-green-600'
                  : 'border-transparent text-gray-600 hover:text-gray-900'
              }`}
            >
              Orders ({orders.length})
            </button>
            <button
              onClick={() => setActiveTab('services')}
              className={`px-4 py-3 font-medium border-b-2 transition-colors ${
                activeTab === 'services'
                  ? 'border-green-600 text-green-600'
                  : 'border-transparent text-gray-600 hover:text-gray-900'
              }`}
            >
              Services ({services.length})
            </button>
            <button
              onClick={() => setActiveTab('inquiries')}
              className={`px-4 py-3 font-medium border-b-2 transition-colors ${
                activeTab === 'inquiries'
                  ? 'border-green-600 text-green-600'
                  : 'border-transparent text-gray-600 hover:text-gray-900'
              }`}
            >
              Inquiries ({inquiries.length})
            </button>
            <button
              onClick={() => setActiveTab('portfolio')}
              className={`px-4 py-3 font-medium border-b-2 transition-colors ${
                activeTab === 'portfolio'
                  ? 'border-green-600 text-green-600'
                  : 'border-transparent text-gray-600 hover:text-gray-900'
              }`}
            >
              Portfolio ({portfolio.length})
            </button>
          </div>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Dashboard Tab */}
        {activeTab === 'stats' && (
          <div>
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">Dashboard Overview</h2>
            
            {stats ? (
              <>
                {/* Overview Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
                  <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
                    <div className="text-sm text-gray-600 mb-1">Total Orders</div>
                    <div className="text-3xl font-bold text-green-600">{stats.overview.totalOrders}</div>
                  </div>
                  <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
                    <div className="text-sm text-gray-600 mb-1">Total Customers</div>
                    <div className="text-3xl font-bold text-blue-600">{stats.overview.totalCustomers}</div>
                  </div>
                  <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
                    <div className="text-sm text-gray-600 mb-1">Total Inquiries</div>
                    <div className="text-3xl font-bold text-purple-600">{stats.overview.totalInquiries}</div>
                  </div>
                  <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
                    <div className="text-sm text-gray-600 mb-1">Total Services</div>
                    <div className="text-3xl font-bold text-orange-600">{stats.overview.totalServices}</div>
                  </div>
                  <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
                    <div className="text-sm text-gray-600 mb-1">Total Revenue</div>
                    <div className="text-2xl font-bold text-green-700">{stats.overview.totalRevenue}</div>
                  </div>
                </div>

                {/* Order Status */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                  <div className="bg-yellow-50 rounded-lg shadow-sm p-6 border border-yellow-200">
                    <div className="text-sm text-yellow-800 mb-1">Pending Orders</div>
                    <div className="text-3xl font-bold text-yellow-600">{stats.orders.pending}</div>
                  </div>
                  <div className="bg-blue-50 rounded-lg shadow-sm p-6 border border-blue-200">
                    <div className="text-sm text-blue-800 mb-1">Confirmed Orders</div>
                    <div className="text-3xl font-bold text-blue-600">{stats.orders.confirmed}</div>
                  </div>
                  <div className="bg-green-50 rounded-lg shadow-sm p-6 border border-green-200">
                    <div className="text-sm text-green-800 mb-1">Completed Orders</div>
                    <div className="text-3xl font-bold text-green-600">{stats.orders.completed}</div>
                  </div>
                </div>

                {/* Top Services & Recent Orders */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div className="bg-white rounded-lg shadow-sm p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Top Requested Services</h3>
                    {stats.topServices.length > 0 ? (
                      <div className="space-y-3">
                        {stats.topServices.map((service, index) => (
                          <div key={service._id} className="flex items-center justify-between p-3 bg-gray-50 rounded">
                            <div className="flex items-center gap-3">
                              <span className="text-lg font-bold text-gray-400">#{index + 1}</span>
                              <span className="font-medium text-gray-900">{service._id}</span>
                            </div>
                            <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-semibold">
                              {service.count} orders
                            </span>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-gray-500 text-center py-4">No service data yet</p>
                    )}
                  </div>

                  <div className="bg-white rounded-lg shadow-sm p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Orders</h3>
                    {stats.recentOrders.length > 0 ? (
                      <div className="space-y-3">
                        {stats.recentOrders.map((order) => (
                          <div key={order._id} className="p-3 bg-gray-50 rounded">
                            <div className="flex justify-between items-start mb-1">
                              <span className="font-semibold text-gray-900">{order.orderNumber}</span>
                              <span className={`text-xs px-2 py-1 rounded-full ${
                                order.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                                order.status === 'confirmed' ? 'bg-blue-100 text-blue-800' :
                                order.status === 'completed' ? 'bg-green-100 text-green-800' :
                                'bg-gray-100 text-gray-800'
                              }`}>
                                {order.status}
                              </span>
                            </div>
                            <div className="text-sm text-gray-600">{order.customerName}</div>
                            <div className="flex justify-between items-center mt-2">
                              <span className="text-sm font-semibold text-green-600">{order.totalAmount}</span>
                              <span className="text-xs text-gray-500">
                                {new Date(order.createdAt).toLocaleDateString()}
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-gray-500 text-center py-4">No orders yet</p>
                    )}
                  </div>
                </div>
              </>
            ) : (
              <div className="text-center py-12">
                <p className="text-gray-500">Loading statistics...</p>
              </div>
            )}
          </div>
        )}

        {/* Orders Tab */}
        {activeTab === 'orders' && (
          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Customer Orders</h2>

            {orders.length === 0 ? (
              <div className="text-center py-12 bg-white rounded-lg">
                <p className="text-gray-500">No orders yet.</p>
              </div>
            ) : (
              <div className="space-y-4">
                {orders.map((order) => (
                  <div key={order._id} className="bg-white rounded-lg shadow-sm p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h4 className="font-semibold text-gray-900 text-lg">Order #{order.orderNumber}</h4>
                        <p className="text-sm text-gray-600">
                          {new Date(order.createdAt).toLocaleDateString('en-KE', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit',
                          })}
                        </p>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                        order.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                        order.status === 'contacted' ? 'bg-blue-100 text-blue-800' :
                        order.status === 'confirmed' ? 'bg-purple-100 text-purple-800' :
                        order.status === 'completed' ? 'bg-green-100 text-green-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {order.status}
                      </span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <div>
                        <p className="text-sm text-gray-600">Customer Name</p>
                        <p className="font-medium text-gray-900">{order.customerName}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Phone</p>
                        <a href={`tel:${order.customerPhone}`} className="text-green-600 font-medium hover:underline">
                          {order.customerPhone}
                        </a>
                      </div>
                      {order.customerEmail && (
                        <div>
                          <p className="text-sm text-gray-600">Email</p>
                          <a href={`mailto:${order.customerEmail}`} className="text-green-600 font-medium hover:underline">
                            {order.customerEmail}
                          </a>
                        </div>
                      )}
                    </div>

                    <div className="mb-4">
                      <p className="text-sm text-gray-600 mb-2">Items Ordered</p>
                      <div className="bg-gray-50 rounded p-3 space-y-2">
                        {order.items.map((item, index) => (
                          <div key={index} className="flex justify-between items-center">
                            <span className="text-gray-900">
                              {item.quantity}x {item.serviceName}
                            </span>
                            <span className="font-medium text-gray-700">{item.price}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {order.notes && (
                      <div className="mb-4">
                        <p className="text-sm text-gray-600">Notes</p>
                        <p className="text-gray-900">{order.notes}</p>
                      </div>
                    )}

                    <div className="flex justify-between items-center pt-4 border-t">
                      <span className="text-lg font-bold text-gray-900">Total: {order.totalAmount}</span>
                      <select
                        value={order.status}
                        onChange={async (e) => {
                          try {
                            const response = await fetch(`/api/orders/${order._id}`, {
                              method: 'PUT',
                              headers: { 'Content-Type': 'application/json' },
                              body: JSON.stringify({ status: e.target.value }),
                            });
                            if (response.ok) {
                              fetchOrders();
                              fetchStats();
                            }
                          } catch (error) {
                            alert('Error updating order status');
                          }
                        }}
                        className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                      >
                        <option value="pending">Pending</option>
                        <option value="contacted">Contacted</option>
                        <option value="confirmed">Confirmed</option>
                        <option value="completed">Completed</option>
                        <option value="cancelled">Cancelled</option>
                      </select>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Services Tab */}
        {activeTab === 'services' && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold text-gray-900">Manage Services</h2>
              <button
                onClick={() => {
                  setShowForm(true);
                  setEditingService(null);
                  setFormData({ name: '', category: 'shades', price: '', description: '', image: '' });
                }}
                className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg font-medium transition-colors"
              >
                + Add New Service
              </button>
            </div>

            {/* Service Form Modal */}
            {showForm && (
              <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
                <div className="bg-white rounded-lg p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-xl font-bold text-gray-900">
                      {editingService ? 'Edit Service' : 'Add New Service'}
                    </h3>
                    <button
                      onClick={() => {
                        setShowForm(false);
                        setEditingService(null);
                      }}
                      className="text-gray-500 hover:text-gray-700"
                    >
                      ✕
                    </button>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Service Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                        placeholder="e.g., Premium Car Shade"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Category <span className="text-red-500">*</span>
                      </label>
                      <select
                        required
                        value={formData.category}
                        onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                      >
                        <option value="shades">Shades</option>
                        <option value="gazebo">Gazebos</option>
                        <option value="pagola">Pagolas</option>
                        <option value="gates">Gates</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Price <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.price}
                        onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                        placeholder="e.g., KSh 45,000"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Image Path or Icon
                      </label>
                      <input
                        type="text"
                        value={formData.image}
                        onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                        placeholder="e.g., /images/shade1.jpg or ☂️"
                      />
                      <p className="text-xs text-gray-500 mt-1">
                        Use /images/filename.jpg for uploaded images or emoji for icons
                      </p>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Description <span className="text-red-500">*</span>
                      </label>
                      <textarea
                        required
                        rows={4}
                        value={formData.description}
                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                        placeholder="Describe the service..."
                      />
                    </div>

                    <div className="flex gap-3">
                      <button
                        type="submit"
                        className="flex-1 bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg font-medium transition-colors"
                      >
                        {editingService ? 'Update Service' : 'Add Service'}
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          setShowForm(false);
                          setEditingService(null);
                        }}
                        className="px-6 bg-gray-200 hover:bg-gray-300 text-gray-700 py-3 rounded-lg font-medium transition-colors"
                      >
                        Cancel
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}

            {/* Services List */}
            {loading ? (
              <div className="text-center py-12">
                <p className="text-gray-500">Loading services...</p>
              </div>
            ) : services.length === 0 ? (
              <div className="text-center py-12 bg-white rounded-lg">
                <p className="text-gray-500 mb-4">No services added yet.</p>
                <button
                  onClick={() => setShowForm(true)}
                  className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg font-medium transition-colors"
                >
                  Add Your First Service
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {services.map((service) => (
                  <div key={service._id} className="bg-white rounded-lg shadow-sm overflow-hidden">
                    <div className="aspect-square bg-gradient-to-br from-gray-100 to-gray-200 relative overflow-hidden">
                      {service.image && service.image.startsWith('/images/') ? (
                        <img
                          src={service.image}
                          alt={service.name}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <span className="text-6xl">{service.image || categoryIcon(service.category)}</span>
                        </div>
                      )}
                    </div>
                    <div className="p-4">
                      <div className="flex items-start justify-between mb-2">
                        <h4 className="font-semibold text-gray-900">{service.name}</h4>
                        <span className="text-xs bg-gray-100 px-2 py-1 rounded">{service.category}</span>
                      </div>
                      <p className="text-sm text-gray-600 mb-2">{service.description}</p>
                      <p className="text-lg font-bold text-green-600 mb-3">{service.price}</p>
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleEdit(service)}
                          className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg text-sm font-medium transition-colors"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(service._id)}
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

        {/* Inquiries Tab */}
        {activeTab === 'inquiries' && (
          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Customer Inquiries</h2>

            {inquiries.length === 0 ? (
              <div className="text-center py-12 bg-white rounded-lg">
                <p className="text-gray-500">No inquiries yet.</p>
              </div>
            ) : (
              <div className="space-y-4">
                {inquiries.map((inquiry) => (
                  <div key={inquiry._id} className="bg-white rounded-lg shadow-sm p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h4 className="font-semibold text-gray-900 text-lg">{inquiry.name}</h4>
                        <p className="text-sm text-gray-600">
                          {new Date(inquiry.createdAt).toLocaleDateString('en-KE', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit',
                          })}
                        </p>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                        inquiry.status === 'new' ? 'bg-green-100 text-green-800' :
                        inquiry.status === 'contacted' ? 'bg-blue-100 text-blue-800' :
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {inquiry.status}
                      </span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <div>
                        <p className="text-sm text-gray-600">Phone</p>
                        <a href={`tel:${inquiry.phone}`} className="text-green-600 font-medium hover:underline">
                          {inquiry.phone}
                        </a>
                      </div>
                      {inquiry.email && (
                        <div>
                          <p className="text-sm text-gray-600">Email</p>
                          <a href={`mailto:${inquiry.email}`} className="text-green-600 font-medium hover:underline">
                            {inquiry.email}
                          </a>
                        </div>
                      )}
                    </div>

                    {inquiry.serviceName && (
                      <div className="mb-4">
                        <p className="text-sm text-gray-600">Interested in</p>
                        <p className="font-medium text-gray-900">{inquiry.serviceName}</p>
                      </div>
                    )}

                    <div>
                      <p className="text-sm text-gray-600 mb-1">Message</p>
                      <p className="text-gray-900">{inquiry.message}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Portfolio Tab */}
        {activeTab === 'portfolio' && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold text-gray-900">Portfolio Management</h2>
              <button
                onClick={() => {
                  // Add portfolio form logic here
                  alert('Portfolio management coming soon! For now, add portfolio items via API or database.');
                }}
                className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg font-medium transition-colors"
              >
                + Add Portfolio Item
              </button>
            </div>

            {portfolio.length === 0 ? (
              <div className="text-center py-12 bg-white rounded-lg">
                <p className="text-gray-500 mb-4">No portfolio items yet.</p>
                <p className="text-sm text-gray-400">
                  Portfolio items showcase your completed projects with multiple images.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {portfolio.map((item) => (
                  <div key={item._id} className="bg-white rounded-lg shadow-sm overflow-hidden">
                    <div className="aspect-square bg-gradient-to-br from-gray-100 to-gray-200 relative overflow-hidden">
                      {item.images && item.images.length > 0 && item.images[0].startsWith('/images/') ? (
                        <img
                          src={item.images[0]}
                          alt={item.title}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-4xl">
                          📸
                        </div>
                      )}
                      {item.images && item.images.length > 1 && (
                        <div className="absolute top-2 right-2 bg-black bg-opacity-70 text-white px-2 py-1 rounded text-xs">
                          +{item.images.length - 1} more
                        </div>
                      )}
                    </div>
                    <div className="p-4">
                      <div className="flex items-start justify-between mb-2">
                        <h4 className="font-semibold text-gray-900">{item.title}</h4>
                        <span className="text-xs bg-gray-100 px-2 py-1 rounded">{item.category}</span>
                      </div>
                      <p className="text-sm text-gray-600 mb-2">{item.description}</p>
                      {item.location && (
                        <p className="text-xs text-green-600 mb-3">📍 {item.location}</p>
                      )}
                      <div className="flex gap-2">
                        <button
                          onClick={() => alert('Edit functionality coming soon!')}
                          className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg text-sm font-medium transition-colors"
                        >
                          Edit
                        </button>
                        <button
                          onClick={async () => {
                            if (!confirm('Delete this portfolio item?')) return;
                            try {
                              const response = await fetch(`/api/portfolio/${item._id}`, {
                                method: 'DELETE',
                              });
                              if (response.ok) {
                                alert('Portfolio item deleted!');
                                fetchPortfolio();
                              }
                            } catch (error) {
                              alert('Error deleting item');
                            }
                          }}
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
