'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';

const categories = [
  { id: 'all', name: 'All Projects',  },
  { id: 'shades', name: 'Shades', },
  { id: 'gazebo', name: 'Gazebos',  },
  { id: 'pagola', name: 'Pagolas',  },
  { id: 'gates', name: 'Gates',  },
];

const defaultPortfolio = [
  {
    _id: '1',
    title: 'Modern Car Shade Installation',
    category: 'shades',
    images: ['/images/image1.jpeg', '/images/image5.jpeg'],
    description: 'Premium curved car shade with UV protection installed in Nairobi',
    location: 'Nairobi',
  },
  {
    _id: '2',
    title: 'Luxury Outdoor Gazebo',
    category: 'gazebo',
    images: ['/images/image2.jpeg', '/images/image6.jpeg'],
    description: 'Custom-built gazebo with stone pillars for outdoor entertainment',
    location: 'Karen',
  },
  {
    _id: '3',
    title: 'Entrance Pagola Design',
    category: 'pagola',
    images: ['/images/image3.jpeg', '/images/image7.jpeg'],
    description: 'Contemporary wooden pagola for residential entrance',
    location: 'Westlands',
  },
  {
    _id: '4',
    title: 'Commercial Shade Structure',
    category: 'shades',
    images: ['/images/image4.jpeg', '/images/image9.jpeg'],
    description: 'Large cantilever shade for commercial parking area',
    location: 'Mombasa Road',
  },
];

export default function PortfolioPage() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [portfolio, setPortfolio] = useState(defaultPortfolio);
  const [loading, setLoading] = useState(false);
  const [selectedProject, setSelectedProject] = useState<any>(null);

  useEffect(() => {
    fetchPortfolio();
  }, []);

  const fetchPortfolio = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/portfolio');
      const data = await response.json();
      if (data.success && data.data.length > 0) {
        setPortfolio(data.data);
      }
    } catch (error) {
      console.error('Error fetching portfolio:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredPortfolio = portfolio.filter(item =>
    selectedCategory === 'all' || item.category === selectedCategory
  );

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

        .portfolio-grid {
          max-width: 1280px; margin: 0 auto 4rem;
          padding: 0 2rem;
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
          gap: 2rem;
        }
        .portfolio-card {
          background: var(--white);
          border: 1px solid rgba(201,168,76,0.18);
          border-radius: 4px;
          overflow: hidden;
          cursor: pointer;
          transition: all 0.3s;
        }
        .portfolio-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 12px 40px rgba(15,17,23,0.14);
        }
        .portfolio-image {
          width: 100%; height: 300px;
          object-fit: cover;
        }
        .portfolio-content {
          padding: 1.5rem;
        }
        .portfolio-category {
          font-size: 0.7rem; font-weight: 600;
          color: var(--gold);
          letter-spacing: 0.15em;
          text-transform: uppercase;
          margin-bottom: 0.5rem;
        }
        .portfolio-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: 1.5rem; font-weight: 600;
          color: var(--ink);
          margin-bottom: 0.75rem;
        }
        .portfolio-desc {
          font-size: 0.9rem; line-height: 1.6;
          color: var(--slate-light);
          margin-bottom: 0.75rem;
        }
        .portfolio-location {
          font-size: 0.85rem;
          color: var(--gold);
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .modal {
          position: fixed;
          inset: 0;
          background: rgba(0,0,0,0.9);
          z-index: 1000;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 2rem;
        }
        .modal-content {
          background: var(--white);
          max-width: 900px;
          width: 100%;
          max-height: 90vh;
          overflow-y: auto;
          border-radius: 4px;
          position: relative;
        }
        .modal-close {
          position: absolute;
          top: 1rem;
          right: 1rem;
          background: var(--ink);
          color: var(--white);
          border: none;
          width: 40px;
          height: 40px;
          border-radius: 50%;
          cursor: pointer;
          font-size: 1.5rem;
          z-index: 10;
        }
        .modal-images {
          display: grid;
          gap: 1rem;
        }
        .modal-image {
          width: 100%;
          height: auto;
        }

        @media (max-width: 768px) {
          .nav-links { display: none; }
          .page-title { font-size: 2.5rem; }
          .portfolio-grid {
            grid-template-columns: 1fr;
          }
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
        <h1 className="page-title">Our Portfolio</h1>
        <p className="page-subtitle">
          Explore our completed projects across Kenya
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
          </button>
        ))}
      </div>

      {/* Portfolio Grid */}
      <div className="portfolio-grid">
        {loading ? (
          <div style={{ gridColumn: '1/-1', textAlign: 'center', padding: '4rem' }}>
            <p style={{ color: 'var(--slate-light)' }}>Loading portfolio...</p>
          </div>
        ) : filteredPortfolio.length === 0 ? (
          <div style={{ gridColumn: '1/-1', textAlign: 'center', padding: '4rem' }}>
            <p style={{ color: 'var(--slate-light)' }}>No projects found in this category.</p>
          </div>
        ) : (
          filteredPortfolio.map(item => (
            <div
              key={item._id}
              className="portfolio-card"
              onClick={() => setSelectedProject(item)}
            >
              <Image
                src={item.images[0]}
                alt={item.title}
                width={400}
                height={300}
                className="portfolio-image"
                style={{ width: '100%', height: '300px', objectFit: 'cover' }}
              />
              <div className="portfolio-content">
                <div className="portfolio-category">{item.category}</div>
                <h3 className="portfolio-title">{item.title}</h3>
                <p className="portfolio-desc">{item.description}</p>
                {item.location && (
                  <div className="portfolio-location">
                    📍 {item.location}
                  </div>
                )}
              </div>
            </div>
          ))
        )}
      </div>

      {/* Project Modal */}
      {selectedProject && (
        <div className="modal" onClick={() => setSelectedProject(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setSelectedProject(null)}>
              ×
            </button>
            <div className="modal-images">
              {selectedProject.images.map((img: string, idx: number) => (
                <Image
                  key={idx}
                  src={img}
                  alt={`${selectedProject.title} - ${idx + 1}`}
                  width={900}
                  height={600}
                  className="modal-image"
                  style={{ width: '100%', height: 'auto' }}
                />
              ))}
            </div>
            <div style={{ padding: '2rem' }}>
              <div className="portfolio-category">{selectedProject.category}</div>
              <h2 className="portfolio-title">{selectedProject.title}</h2>
              <p className="portfolio-desc">{selectedProject.description}</p>
              {selectedProject.location && (
                <div className="portfolio-location">
                  📍 {selectedProject.location}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

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
