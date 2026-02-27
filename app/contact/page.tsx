'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    serviceName: '',
    message: '',
  });
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.phone || !formData.message) {
      alert('Please fill in all required fields');
      return;
    }

    try {
      setSubmitting(true);
      const response = await fetch('/api/inquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (data.success) {
        alert('Thank you! Your inquiry has been submitted successfully. We will contact you soon.');
        setFormData({ name: '', phone: '', email: '', serviceName: '', message: '' });
      } else {
        alert('Failed to submit inquiry. Please try again.');
      }
    } catch (error) {
      console.error('Error submitting inquiry:', error);
      alert('An error occurred. Please try again.');
    } finally {
      setSubmitting(false);
    }
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

        .contact-container {
          max-width: 1280px;
          margin: 4rem auto;
          padding: 0 2rem;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 4rem;
        }

        .contact-info-section {
          display: flex;
          flex-direction: column;
          gap: 2rem;
        }
        .info-card {
          background: var(--white);
          padding: 2rem;
          border: 1px solid rgba(201,168,76,0.18);
          border-radius: 4px;
        }
        .info-icon {
          font-size: 2.5rem;
          margin-bottom: 1rem;
        }
        .info-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: 1.5rem;
          font-weight: 600;
          color: var(--ink);
          margin-bottom: 0.75rem;
        }
        .info-text {
          font-size: 0.95rem;
          line-height: 1.6;
          color: var(--slate-light);
          margin-bottom: 0.5rem;
        }
        .info-link {
          color: var(--gold);
          text-decoration: none;
          font-weight: 500;
        }
        .info-link:hover {
          color: var(--gold-light);
        }

        .contact-form {
          background: var(--white);
          padding: 2.5rem;
          border: 1px solid rgba(201,168,76,0.18);
          border-radius: 4px;
        }
        .form-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: 2rem;
          font-weight: 600;
          color: var(--ink);
          margin-bottom: 1.5rem;
        }
        .form-group {
          margin-bottom: 1.5rem;
        }
        .form-label {
          display: block;
          font-size: 0.85rem;
          font-weight: 500;
          color: var(--slate);
          margin-bottom: 0.5rem;
          letter-spacing: 0.02em;
        }
        .form-input,
        .form-select,
        .form-textarea {
          width: 100%;
          padding: 0.85rem;
          border: 1px solid rgba(201,168,76,0.3);
          border-radius: 4px;
          font-family: 'DM Sans', sans-serif;
          font-size: 0.95rem;
          color: var(--ink);
          transition: all 0.2s;
        }
        .form-input:focus,
        .form-select:focus,
        .form-textarea:focus {
          outline: none;
          border-color: var(--gold);
          box-shadow: 0 0 0 3px rgba(201,168,76,0.1);
        }
        .form-textarea {
          resize: vertical;
          min-height: 120px;
        }
        .required {
          color: var(--gold);
        }
        .btn-submit {
          width: 100%;
          padding: 1rem;
          background: linear-gradient(135deg, var(--gold) 0%, #8a6f34 100%);
          color: var(--ink);
          border: none;
          font-size: 0.9rem;
          font-weight: 600;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          cursor: pointer;
          border-radius: 4px;
          transition: all 0.25s;
        }
        .btn-submit:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow: 0 8px 28px rgba(201,168,76,0.5);
        }
        .btn-submit:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }

        .map-section {
          max-width: 1280px;
          margin: 0 auto 4rem;
          padding: 0 2rem;
        }
        .map-container {
          background: var(--white);
          padding: 2rem;
          border: 1px solid rgba(201,168,76,0.18);
          border-radius: 4px;
          text-align: center;
        }
        .map-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: 2rem;
          font-weight: 600;
          color: var(--ink);
          margin-bottom: 1rem;
        }
        .map-text {
          font-size: 0.95rem;
          color: var(--slate-light);
          margin-bottom: 1.5rem;
        }

        @media (max-width: 768px) {
          .nav-links { display: none; }
          .page-title { font-size: 2.5rem; }
          .contact-container {
            grid-template-columns: 1fr;
            gap: 2rem;
          }
        }
      `}</style>

      {/* Header */}
      <header className="header">
        <div className="header-inner">
          <Link href="/">
            <div style={{ cursor: 'pointer' }}>
              <div className="logo-name">VINCEVIC SHADES</div>
              <div className="logo-sub">ENTERPRISES</div>
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
        <h1 className="page-title">Get In Touch</h1>
        <p className="page-subtitle">
          Ready to transform your outdoor space? We're here to help
        </p>
      </div>

      {/* Contact Container */}
      <div className="contact-container">
        {/* Contact Information */}
        <div className="contact-info-section">
          <div className="info-card">
            <h3 className="info-title">Call Us</h3>
            <p className="info-text">Speak directly with our team</p>
            <a href="tel:0720120616" className="info-link">0720 120 616</a>
            <br />
            <a href="tel:0716632889" className="info-link">0716 632 889</a>
          </div>

          <div className="info-card">
            <h3 className="info-title">WhatsApp</h3>
            <p className="info-text">Quick responses via WhatsApp</p>
            <a href="https://wa.me/254720120616" target="_blank" rel="noopener noreferrer" className="info-link">
              Chat on WhatsApp
            </a>
          </div>

          <div className="info-card">
            <h3 className="info-title">Visit Us</h3>
            <p className="info-text">Nairobi, Kenya</p>
            <p className="info-text" style={{ fontSize: '0.85rem', marginTop: '0.5rem' }}>
              Serving all 47 counties across Kenya
            </p>
          </div>

          <div className="info-card">
            <h3 className="info-title">Business Hours</h3>
            <p className="info-text">Monday – Friday: 8:00 AM – 6:00 PM</p>
            <p className="info-text">Saturday: 9:00 AM – 5:00 PM</p>
            <p className="info-text">Sunday: Closed</p>
          </div>
        </div>

        {/* Contact Form */}
        <div>
          <form className="contact-form" onSubmit={handleSubmit}>
            <h2 className="form-title">Send Us a Message</h2>

            <div className="form-group">
              <label className="form-label">
                Your Name <span className="required">*</span>
              </label>
              <input
                type="text"
                className="form-input"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Enter your full name"
              />
            </div>

            <div className="form-group">
              <label className="form-label">
                Phone Number <span className="required">*</span>
              </label>
              <input
                type="tel"
                className="form-input"
                required
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                placeholder="07XX XXX XXX"
              />
            </div>

            <div className="form-group">
              <label className="form-label">Email Address</label>
              <input
                type="email"
                className="form-input"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="your@email.com"
              />
            </div>

            <div className="form-group">
              <label className="form-label">Service Interested In</label>
              <select
                className="form-select"
                value={formData.serviceName}
                onChange={(e) => setFormData({ ...formData, serviceName: e.target.value })}
              >
                <option value="">Select a service</option>
                <option value="Car Shades">Car Shades</option>
                <option value="Gazebos">Gazebos</option>
                <option value="Pagolas">Pagolas</option>
                <option value="Gates">Gates</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div className="form-group">
              <label className="form-label">
                Your Message <span className="required">*</span>
              </label>
              <textarea
                className="form-textarea"
                required
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                placeholder="Tell us about your project requirements..."
              />
            </div>

            <button type="submit" className="btn-submit" disabled={submitting}>
              {submitting ? 'Sending...' : 'Send Message'}
            </button>
          </form>
        </div>
      </div>

      {/* Map Section */}
      <div className="map-section">
        <div className="map-container">
          <h2 className="map-title">We Serve All of Kenya</h2>
          <p className="map-text">
            From Nairobi to Mombasa, Kisumu to Eldoret we bring quality outdoor structures to all 47 counties.
            Contact us today for a free consultation and quote for your location.
          </p>
       
        </div>
      </div>

      {/* Footer */}
      <footer style={{ background: 'var(--ink)', color: 'var(--white)', padding: '4rem 2rem 2rem' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '3rem', paddingBottom: '3rem', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
            <div>
              <div style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.4rem', fontWeight: 700, marginBottom: '0.25rem' }}>VINCEVIC SHADES</div>
              <div style={{ fontSize: '0.65rem', fontWeight: 600, color: 'var(--gold)', letterSpacing: '0.25em', textTransform: 'uppercase', marginBottom: '1rem' }}>Enterprises</div>
              <p style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.4)', lineHeight: 1.7, maxWidth: '300px' }}>
                Your trusted partner for quality outdoor structures across Kenya.
              </p>
            </div>
            <div>
              <div style={{ fontSize: '0.72rem', fontWeight: 600, color: 'var(--gold)', textTransform: 'uppercase', letterSpacing: '0.2em', marginBottom: '1.25rem' }}>Quick Links</div>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
                <li style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.45)' }}><Link href="/" style={{ color: 'inherit', textDecoration: 'none' }}>Home</Link></li>
                <li style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.45)' }}><Link href="/services" style={{ color: 'inherit', textDecoration: 'none' }}>Services</Link></li>
                <li style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.45)' }}><Link href="/portfolio" style={{ color: 'inherit', textDecoration: 'none' }}>Portfolio</Link></li>
                <li style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.45)' }}><Link href="/about" style={{ color: 'inherit', textDecoration: 'none' }}>About Us</Link></li>
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
