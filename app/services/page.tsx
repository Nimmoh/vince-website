'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';

const categories = [
  { id: 'all', name: 'All Services', icon: '◈' },
  { id: 'shades', name: 'Shades', icon: '⬡' },
  { id: 'gazebo', name: 'Gazebos', icon: '◎' },
  { id: 'pagola', name: 'Pagolas', icon: '▲' },
  { id: 'gates', name: 'Gates', icon: '◫' },
];

export default function ServicesPage() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [services, setServices] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showContact, setShowContact] = useState(false);
  const [selectedService, setSelectedService] = useState<string>('');

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
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

  const filteredServices = services.filter(service => 
    selectedCategory === 'all' || service.category === selectedCategory
  );

  const categoryIcon = (category: string) => {
    const icons: any = { shades: '⬡', gazebo: '◎', pagola: '▲', gates: '◫' };
    return icons[category] || '◈';
  };

  return (
    <div style={{ background: 'var(--surface)', minHeight: '100vh' }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;500;600;700&family=DM+Sans:wght@300;400;500;600&display=swap');
        
        :root {
          --ink: #0f1117;
          --surface: #f7f5f0;
          --gold: #c9a84c;
          --gold-light: #e4c97a;
          --white: #ffffff;
          --slate: #2d3448;
          --slate-light: #718096;
        }

        body { font-family: 'DM Sans', sans-serif; }
        .font-display { font-family: 'Cormorant Garamond', serif; }

        .header {
          position: sticky; top: 0; z-index: 100;
          background: rgba(15,17,23,0.97);
          backdrop-filter: blur(12px);
          border-bottom: 1px solid rgba(201,168,76,0.15);
        }
        .header-inner {
          max-width: 1280px; margin: 0 auto; padding: 0 2rem;
          display: flex; align-items: center; justify-content: space-between;
          height: 72px;
        }
        .logo-name {
          font-family: 'Cormorant Garamond', serif;
          font-size: 1.5rem; font-weight: 700;
          color: var(--white); letter-spacing: 0.06em;
        }
        .logo-sub {
          font-size: 0.62rem; font-weight: 500;
          color: var(--gold); letter-spacing: 0.3em;
          text-transform: uppercase;
        }
        .nav-links {
          display: flex; gap: 2.5rem;
        }
        .nav-links a {
          font-size: 0.82rem; font-weight: 500;
          color: rgba(255,255,255,0.65);
          text-decoration: none; letter-spacing: 0.05em;
          text-transform: uppercase;
          transition: color 0.2s;
        }
        .nav-links a:hover { color: var(--gold-light); }

        .page-hero {
          background: var(--ink);
          padding: 4rem 2rem 3rem;
          text-align: center;
          border-bottom: 1px solid rgba(201,168,76,0.15);
        }
        .page-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: 3.5rem; font-weight: 700;
          color: var(--white); margin-bottom: 1rem;
        }
        .page-subtitle {
          font-size: 1.1rem; color: rgba(255,255,255,0.6);
          max-width: 600px; margin: 0 auto;
        }

        .category-filter {
          max-width: 1280px; margin: 2rem auto;
          padding: 0 2rem;
          display: flex; gap: 1rem; flex-wrap: wrap;
          justify-content: center;
        }
        .category-btn {
          padding: 0.75rem 1.5rem;
          border: 1px solid rgba(201,168,76,0.3);
          background: var(--white);
          color: var(--slate);
          font-size: 0.85rem; font-weight: 500;
          letter-spacing: 0.05em;
          text-transform: uppercase;
          cursor: pointer;
          transition: all 0.2s;
          border-radius: 4px;
        }
        .category-btn:hover {
          border-color: var(--gold);
          color: var(--gold);
        }
        .category-btn.active {
          background: var(--gold);
          color: var(--ink);
          border-color: var(--gold);
        }

        .services-grid {
          max-width: 1280px; margin: 0 auto 4rem;
          padding: 0 2rem;
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
          gap: 2rem;
        }
        .service-card {
          background: var(--white);
          border: 1px solid rgba(201,168,76,0.18);
          border-radius: 4px;
          overflow: hidden;
          transition: all 0.3s;
        }
        .service-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 12px 40px rgba(15,17,23,0.14);
        }
        .service-image {
          width: 100%; height: 280px;
          object-fit: cover;
          background: linear-gradient(135deg, #f0ece4 0%, #e8e4d8 100%);
        }
        .service-content {
          padding: 1.5rem;
        }
        .service-category {
          font-size: 0.7rem; font-weight: 600;
          color: var(--gold);
          letter-spacing: 0.15em;
          text-transform: uppercase;
          margin-bottom: 0.5rem;
        }
        .service-name {
          font-family: 'Cormorant Garamond', serif;
          font-size: 1.5rem; font-weight: 600;
          color: var(--ink);
          margin-bottom: 0.75rem;
        }
        .service-desc {
          font-size: 0.9rem; line-height: 1.6;
          color: var(--slate-light);
          margin-bottom: 1rem;
        }
        .service-price {
          font-size: 1.3rem; font-weight: 600;
          color: var(--gold);
          margin-bottom: 1rem;
        }
        .btn-inquire {
          width: 100%;
          padding: 0.85rem;
          background: linear-gradient(135deg, var(--gold) 0%, #8a6f34 100%);
          color: var(--ink);
          border: none;
          font-size: 0.85rem; font-weight: 600;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          cursor: pointer;
          border-radius: 4px;
          transition: all 0.25s;
        }
        .btn-inquire:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 28px rgba(201,168,76,0.5);
        }

        @media (max-width: 768px) {
          .nav-links { display: none; }
          .page-title { font-size: 2.5rem; }
        }
      `}</style>

      {/* Header */}
      <header className="header">
        <div className="header-inner">
          <Link href="/">
            <div style={{ cursor: 'pointer' }}>
              <div className="logo-name">VINCEVIC SHADES</div>
              <div className="logo-sub">INTERPRISES</div>
            </div>
          </Link>
          <nav className="nav-links">
            <Link href="/">Home</Link>
            <Link href="/services">Services</Link>
            <Link href="/portfolio">Portfolio</Link>
            <Link href="/about">About Us</Link>
            <Link href="/contact">Contact</Link>
          </nav>
        </div>
      </header>

      {/* Page Hero */}
      <div className="page-hero">
        <h1 className="page-title">Our Services</h1>
        <p className="page-subtitle">
          Premium outdoor structures crafted with precision and installed with care
        </p>
      </div>

      {/* Category Filter */}
      <div className="category-filter">
        {categories.map(cat => (
          <button
            key={cat.id}
            className={`category-btn ${selectedCategory === cat.id ? 'active' : ''}`}
            onClick={() => setSelectedCategory(cat.id)}
          >
            {cat.icon} {cat.name}
          </button>
        ))}
      </div>

      {/* Services Grid */}
      <div className="services-grid">
        {loading ? (
          <div style={{ gridColumn: '1/-1', textAlign: 'center', padding: '4rem' }}>
            <p style={{ color: 'var(--slate-light)' }}>Loading services...</p>
          </div>
        ) : filteredServices.length === 0 ? (
          <div style={{ gridColumn: '1/-1', textAlign: 'center', padding: '4rem' }}>
            <p style={{ color: 'var(--slate-light)' }}>No services found in this category.</p>
          </div>
        ) : (
          filteredServices.map(service => (
            <div key={service._id} className="service-card">
              {service.image && service.image.startsWith('/images/') ? (
                <Image
                  src={service.image}
                  alt={service.name}
                  width={400}
                  height={280}
                  className="service-image"
                  style={{ width: '100%', height: '280px', objectFit: 'cover' }}
                />
              ) : (
                <div className="service-image" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '4rem' }}>
                  {service.image || categoryIcon(service.category)}
                </div>
              )}
              <div className="service-content">
                <div className="service-category">{categoryIcon(service.category)} {service.category}</div>
                <h3 className="service-name">{service.name}</h3>
                <p className="service-desc">{service.description}</p>
                <div className="service-price">{service.price}</div>
                <button className="btn-inquire" onClick={() => {
                  setSelectedService(service.name);
                  setShowContact(true);
                }}>
                  Request Quote
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Footer */}
      <footer style={{ background: 'var(--ink)', color: 'var(--white)', padding: '4rem 2rem 2rem', marginTop: '4rem' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '3rem', paddingBottom: '3rem', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
            <div>
              <div style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.4rem', fontWeight: 700, marginBottom: '0.25rem' }}>VINCEVIC SHADES</div>
              <div style={{ fontSize: '0.65rem', fontWeight: 600, color: 'var(--gold)', letterSpacing: '0.25em', textTransform: 'uppercase', marginBottom: '1rem' }}>Enterprises</div>
              <p style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.4)', lineHeight: 1.7, maxWidth: '300px' }}>
                Your trusted partner for quality outdoor structures across Kenya. We bring craftsmanship, durability, and design excellence to every project.
              </p>
            </div>
            <div>
              <div style={{ fontSize: '0.72rem', fontWeight: 600, color: 'var(--gold)', textTransform: 'uppercase', letterSpacing: '0.2em', marginBottom: '1.25rem' }}>Quick Links</div>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
                <li style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.45)' }}><Link href="/" style={{ color: 'inherit', textDecoration: 'none' }}>Home</Link></li>
                <li style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.45)' }}><Link href="/services" style={{ color: 'inherit', textDecoration: 'none' }}>Services</Link></li>
                <li style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.45)' }}><Link href="/portfolio" style={{ color: 'inherit', textDecoration: 'none' }}>Portfolio</Link></li>
                <li style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.45)' }}><Link href="/about" style={{ color: 'inherit', textDecoration: 'none' }}>About Us</Link></li>
                <li style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.45)' }}><Link href="/contact" style={{ color: 'inherit', textDecoration: 'none' }}>Contact</Link></li>
              </ul>
            </div>
            <div>
              <div style={{ fontSize: '0.72rem', fontWeight: 600, color: 'var(--gold)', textTransform: 'uppercase', letterSpacing: '0.2em', marginBottom: '1.25rem' }}>Services</div>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
                <li style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.45)' }}>Car Shades & Covers</li>
                <li style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.45)' }}>Garden Gazebos</li>
                <li style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.45)' }}>Decorative Pagolas</li>
                <li style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.45)' }}>Security Gates</li>
              </ul>
            </div>
            <div>
              <div style={{ fontSize: '0.72rem', fontWeight: 600, color: 'var(--gold)', textTransform: 'uppercase', letterSpacing: '0.2em', marginBottom: '1.25rem' }}>Contact</div>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
                <li style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.45)' }}>📞 0720 120 616</li>
                <li style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.45)' }}>📱 0716 632 889</li>
                <li style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.45)' }}>🕒 Mon–Fri: 8AM–6PM</li>
                <li style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.45)' }}>🕒 Sat: 9AM–5PM</li>
              </ul>
            </div>
          </div>
          <div style={{ paddingTop: '2rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
            <span style={{ fontSize: '0.78rem', color: 'rgba(255,255,255,0.25)' }}>© 2026 Vincevic Shades Interprises. All rights reserved.</span>
            <div style={{ width: '40px', height: '1px', background: 'var(--gold)', opacity: 0.4 }} />
          </div>
        </div>
      </footer>
    </div>
  );
}
