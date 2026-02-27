'use client';

import Image from 'next/image';
import Link from 'next/link';

export default function AboutPage() {
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

        .content-section {
          max-width: 1280px;
          margin: 4rem auto;
          padding: 0 2rem;
        }
        .section-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 4rem;
          align-items: center;
          margin-bottom: 4rem;
        }
        .section-content h2 {
          font-family: 'Cormorant Garamond', serif;
          font-size: 2.5rem;
          font-weight: 700;
          color: var(--ink);
          margin-bottom: 1.5rem;
        }
        .section-content p {
          font-size: 1rem;
          line-height: 1.8;
          color: var(--slate-light);
          margin-bottom: 1rem;
        }
        .section-image {
          width: 100%;
          height: 400px;
          object-fit: cover;
          border-radius: 4px;
          border: 1px solid rgba(201,168,76,0.18);
        }

        .values-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 2rem;
          margin-top: 3rem;
        }
        .value-card {
          background: var(--white);
          padding: 2rem;
          border: 1px solid rgba(201,168,76,0.18);
          border-radius: 4px;
          text-align: center;
        }
        .value-icon {
          font-size: 3rem;
          margin-bottom: 1rem;
        }
        .value-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: 1.5rem;
          font-weight: 600;
          color: var(--ink);
          margin-bottom: 0.75rem;
        }
        .value-desc {
          font-size: 0.9rem;
          line-height: 1.6;
          color: var(--slate-light);
        }

        .stats-section {
          background: var(--ink);
          padding: 4rem 2rem;
          margin: 4rem 0;
        }
        .stats-grid {
          max-width: 1280px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 3rem;
          text-align: center;
        }
        .stat-value {
          font-family: 'Cormorant Garamond', serif;
          font-size: 3.5rem;
          font-weight: 700;
          color: var(--gold);
          margin-bottom: 0.5rem;
        }
        .stat-label {
          font-size: 0.9rem;
          color: rgba(255,255,255,0.6);
          letter-spacing: 0.05em;
          text-transform: uppercase;
        }

        .contact-cta {
          background: var(--white);
          padding: 3rem;
          border: 1px solid rgba(201,168,76,0.18);
          border-radius: 4px;
          text-align: center;
          margin: 4rem auto;
          max-width: 800px;
        }
        .contact-cta h2 {
          font-family: 'Cormorant Garamond', serif;
          font-size: 2.5rem;
          color: var(--ink);
          margin-bottom: 1rem;
        }
        .contact-cta p {
          font-size: 1rem;
          color: var(--slate-light);
          margin-bottom: 2rem;
        }
        .contact-info {
          display: flex;
          justify-content: center;
          gap: 2rem;
          flex-wrap: wrap;
        }
        .contact-item {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 1.1rem;
          color: var(--gold);
          font-weight: 500;
        }

        @media (max-width: 768px) {
          .nav-links { display: none; }
          .page-title { font-size: 2.5rem; }
          .section-grid {
            grid-template-columns: 1fr;
            gap: 2rem;
          }
          .section-content h2 {
            font-size: 2rem;
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
        <h1 className="page-title">About Us</h1>
        <p className="page-subtitle">
          Building Kenya's finest outdoor structures since 2012
        </p>
      </div>

      {/* Our Story */}
      <div className="content-section">
        <div className="section-grid">
          <div className="section-content">
            <h2>Our Story</h2>
            <p>
              Founded in 2012, Vincevic Shades Interprises has grown to become Kenya's premier provider of outdoor structures. What started as a small workshop in Nairobi has evolved into a trusted name across 47 counties.
            </p>
            <p>
              We specialize in designing, fabricating, and installing premium car shades, elegant gazebos, architectural pagolas, and automated security gates. Every project reflects our commitment to quality craftsmanship and customer satisfaction.
            </p>
            <p>
              Our team of skilled artisans and engineers work together to transform outdoor spaces, combining functionality with aesthetic appeal. We use only the finest materials and latest techniques to ensure durability and beauty.
            </p>
          </div>
          <Image
            src="/images/image2.jpeg"
            alt="Our Work"
            width={600}
            height={400}
            className="section-image"
          />
        </div>

        <div className="section-grid" style={{ flexDirection: 'row-reverse' }}>
          <div className="section-content">
            <h2>Our Approach</h2>
            <p>
              At Vincevic Shades, we believe every project is unique. We begin with understanding your vision, space requirements, and budget. Our design team then creates custom solutions that perfectly match your needs.
            </p>
            <p>
              From initial consultation to final installation, we maintain open communication and ensure every detail meets our high standards. Our professional installation team works efficiently while respecting your property.
            </p>
            <p>
              We stand behind our work with comprehensive warranties and ongoing support. Your satisfaction is our success, and we're committed to building lasting relationships with every client.
            </p>
          </div>
          <Image
            src="/images/image1.jpeg"
            alt="Our Process"
            width={600}
            height={400}
            className="section-image"
          />
        </div>
      </div>

      {/* Stats Section */}
      <div className="stats-section">
        <div className="stats-grid">
          <div>
            <div className="stat-value">500+</div>
            <div className="stat-label">Projects Completed</div>
          </div>
          <div>
            <div className="stat-value">12+</div>
            <div className="stat-label">Years Experience</div>
          </div>
          <div>
            <div className="stat-value">98%</div>
            <div className="stat-label">Client Satisfaction</div>
          </div>
          <div>
            <div className="stat-value">47</div>
            <div className="stat-label">Counties Served</div>
          </div>
        </div>
      </div>

      {/* Our Values */}
      <div className="content-section">
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '2.5rem', color: 'var(--ink)' }}>
            Our Values
          </h2>
        </div>
        <div className="values-grid">
          <div className="value-card">
            <div className="value-icon">⬡</div>
            <h3 className="value-title">Quality First</h3>
            <p className="value-desc">
              We never compromise on materials or workmanship. Every structure is built to last.
            </p>
          </div>
          <div className="value-card">
            <div className="value-icon">◎</div>
            <h3 className="value-title">Customer Focus</h3>
            <p className="value-desc">
              Your vision guides our work. We listen, understand, and deliver beyond expectations.
            </p>
          </div>
          <div className="value-card">
            <div className="value-icon">▲</div>
            <h3 className="value-title">Innovation</h3>
            <p className="value-desc">
              We embrace new techniques and designs while honoring traditional craftsmanship.
            </p>
          </div>
          <div className="value-card">
            <div className="value-icon">◫</div>
            <h3 className="value-title">Integrity</h3>
            <p className="value-desc">
              Honest pricing, transparent processes, and reliable service in every interaction.
            </p>
          </div>
        </div>
      </div>

      {/* Contact CTA */}
      <div className="content-section">
        <div className="contact-cta">
          <h2>Let's Build Something Amazing</h2>
          <p>
            Ready to transform your outdoor space? Get in touch with our team today for a free consultation and quote.
          </p>
          <div className="contact-info">
            <div className="contact-item">
              📞 0720 120 616
            </div>
            <div className="contact-item">
              📱 0716 632 889
            </div>
            <div className="contact-item">
              📍 Nairobi, Kenya
            </div>
          </div>
        </div>
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
