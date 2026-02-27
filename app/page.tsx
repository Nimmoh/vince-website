'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';

const categories = [
  { id: 'all', name: 'All Services', },
  { id: 'shades', name: 'Shades',  },
  { id: 'gazebo', name: 'Gazebos',  },
  { id: 'pagola', name: 'Pagolas',  },
  { id: 'gates', name: 'Gates', },
];

const defaultServices = [
  { _id: '1', name: 'Premium Car Shade', category: 'shades', price: 'KSh 45,000', image: '/images/image1.jpeg', description: 'Durable car parking shade with UV protection and modern curved design' },
  { _id: '2', name: 'Luxury Outdoor Gazebo', category: 'gazebo', price: 'KSh 150,000', image: '/images/image2.jpeg', description: 'Premium gazebo with stone pillars, perfect for outdoor entertainment and events' },
  { _id: '3', name: 'Modern Wooden Pagola', category: 'pagola', price: 'KSh 75,000', image: '/images/image3.jpeg', description: 'Contemporary wooden pagola with sleek design for entrance or patio coverage' },
  { _id: '4', name: 'Industrial Cantilever Shade', category: 'shades', price: 'KSh 95,000', image: '/images/image4.jpeg', description: 'Heavy-duty cantilever shade structure ideal for commercial and residential spaces' },
  { _id: '5', name: 'Residential Patio Shade', category: 'shades', price: 'KSh 55,000', image: '/images/image5.jpeg', description: 'Weather-resistant patio shade cover with elegant design' },
  { _id: '6', name: 'Garden Gazebo Deluxe', category: 'gazebo', price: 'KSh 120,000', image: '/images/image6.jpeg', description: 'Spacious garden gazebo perfect for relaxation and outdoor gatherings' },
  { _id: '7', name: 'Entrance Pagola', category: 'pagola', price: 'KSh 65,000', image: '/images/image7.jpeg', description: 'Elegant entrance pagola with modern architectural design' },
  { _id: '8', name: 'Automated Sliding Gate', category: 'gates', price: 'KSh 120,000', image: '/images/image8.jpeg', description: 'Automated sliding gate with remote control and security features' },
  { _id: '9', name: 'Commercial Shade Structure', category: 'shades', price: 'KSh 85,000', image: '/images/image9.jpeg', description: 'Large commercial-grade shade structure for parking or outdoor areas' },
  { _id: '10', name: 'Event Gazebo Premium', category: 'gazebo', price: 'KSh 180,000', image: '/images/image10.jpeg', description: 'Premium event gazebo with luxury finishes and spacious design' },
  { _id: '11', name: 'Decorative Pagola', category: 'pagola', price: 'KSh 70,000', image: '/images/image11.jpeg', description: 'Decorative pagola perfect for garden pathways and entrances' },
  { _id: '12', name: 'Security Gate System', category: 'gates', price: 'KSh 150,000', image: '/images/image12.jpeg', description: 'Complete security gate system with automation and access control' },
];

const stats = [
  { value: '500+', label: 'Projects Completed' },
  { value: '12+', label: 'Years Experience' },
  { value: '98%', label: 'Client Satisfaction' },
  { value: '47', label: 'Counties Served' },
];

export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [showContact, setShowContact] = useState(false);
  const [services, setServices] = useState(defaultServices);
  const [loading, setLoading] = useState(false);
  const [selectedService, setSelectedService] = useState<string>('');
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);
  const [inquiryForm, setInquiryForm] = useState({
    name: '',
    phone: '',
    email: '',
    message: '',
  });
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/services');
      const data = await response.json();
      if (data.success && data.data.length > 0) {
        setServices(data.data);
      }
    } catch (error) {
      console.error('Error fetching services:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleInquiry = async (serviceName: string) => {
    setSelectedService(serviceName);
    setShowContact(true);
  };

  const submitInquiry = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inquiryForm.name || !inquiryForm.phone || !inquiryForm.message) {
      alert('Please fill in all required fields');
      return;
    }
    try {
      setSubmitting(true);
      const response = await fetch('/api/inquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...inquiryForm, serviceName: selectedService }),
      });
      const data = await response.json();
      if (data.success) {
        alert('Thank you! Your inquiry has been submitted successfully.');
        setInquiryForm({ name: '', phone: '', email: '', message: '' });
        setShowContact(false);
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

  const filteredServices = services.filter(service => {
    const matchesCategory = selectedCategory === 'all' || service.category === selectedCategory;
    const matchesSearch =
      service.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      service.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const categoryIcon = (category: string) => {
    const icons: any = { shades: '⬡', gazebo: '◎', pagola: '▲', gates: '◫' };
    return icons[category] || '◈';
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;500;600;700&family=DM+Sans:wght@300;400;500;600&display=swap');

        :root {
          --ink: #0f1117;
          --ink-soft: #1c2030;
          --surface: #f7f5f0;
          --surface-warm: #f0ece4;
          --gold: #c9a84c;
          --gold-light: #e4c97a;
          --gold-dim: #8a6f34;
          --slate: #2d3448;
          --slate-mid: #4a5568;
          --slate-light: #718096;
          --white: #ffffff;
          --border: rgba(201,168,76,0.18);
          --border-soft: rgba(45,52,72,0.12);
          --shadow-card: 0 4px 24px rgba(15,17,23,0.08), 0 1px 4px rgba(15,17,23,0.06);
          --shadow-hover: 0 12px 40px rgba(15,17,23,0.14), 0 2px 8px rgba(15,17,23,0.08);
          --shadow-gold: 0 0 0 1px rgba(201,168,76,0.3), 0 8px 24px rgba(201,168,76,0.12);
        }

        * { box-sizing: border-box; margin: 0; padding: 0; }

        body {
          font-family: 'DM Sans', sans-serif;
          background: var(--surface);
          color: var(--ink);
          -webkit-font-smoothing: antialiased;
        }

        .font-display { font-family: 'Cormorant Garamond', serif; }

        /* ── HEADER ── */
        .header {
          position: sticky; top: 0; z-index: 100;
          background: rgba(15,17,23,0.97);
          backdrop-filter: blur(12px);
          border-bottom: 1px solid rgba(201,168,76,0.15);
        }
        .header-inner {
          max-width: 1280px; margin: 0 auto;
          padding: 0 2rem;
          display: flex; align-items: center; justify-content: space-between;
          height: 72px;
        }
        .logo-mark {
          display: flex; flex-direction: column; gap: 0;
        }
        .logo-name {
          font-family: 'Cormorant Garamond', serif;
          font-size: 1.5rem; font-weight: 700;
          color: var(--white); letter-spacing: 0.06em;
          line-height: 1;
        }
        .logo-sub {
          font-size: 0.62rem; font-weight: 500;
          color: var(--gold); letter-spacing: 0.3em;
          text-transform: uppercase; margin-top: 2px;
        }
        .nav-links {
          display: flex; align-items: center; gap: 2.5rem;
          list-style: none;
        }
        .nav-links a {
          font-size: 0.82rem; font-weight: 500;
          color: rgba(255,255,255,0.65);
          text-decoration: none; letter-spacing: 0.05em;
          text-transform: uppercase;
          transition: color 0.2s;
        }
        .nav-links a:hover { color: var(--gold-light); }
        .btn-cta {
          background: linear-gradient(135deg, var(--gold) 0%, var(--gold-dim) 100%);
          color: var(--ink);
          border: none; cursor: pointer;
          padding: 0.6rem 1.5rem;
          font-family: 'DM Sans', sans-serif;
          font-size: 0.82rem; font-weight: 600;
          letter-spacing: 0.08em; text-transform: uppercase;
          border-radius: 4px;
          transition: all 0.25s;
          box-shadow: 0 2px 12px rgba(201,168,76,0.3);
        }
        .btn-cta:hover {
          transform: translateY(-1px);
          box-shadow: 0 4px 20px rgba(201,168,76,0.45);
        }

        /* ── HERO ── */
        .hero {
          background: var(--ink);
          position: relative; overflow: hidden;
          padding: 5rem 2rem 4rem;
        }
        .hero-video {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          z-index: 0;
          opacity: 0.35;
        }
        .hero::before {
          content: '';
          position: absolute; inset: 0;
          z-index: 1;
          background: 
            radial-gradient(ellipse 80% 60% at 60% 40%, rgba(201,168,76,0.07) 0%, transparent 70%),
            radial-gradient(ellipse 40% 80% at 10% 70%, rgba(45,52,72,0.8) 0%, transparent 60%);
        }
        .hero-grid-lines {
          position: absolute; inset: 0; opacity: 0.04;
          z-index: 1;
          background-image: 
            linear-gradient(rgba(201,168,76,1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(201,168,76,1) 1px, transparent 1px);
          background-size: 60px 60px;
        }
        .hero-inner {
          position: relative; z-index: 2;
          max-width: 1280px; margin: 0 auto;
          display: grid; grid-template-columns: 1fr 1fr; gap: 4rem;
          align-items: center;
        }
        .hero-eyebrow {
          display: inline-flex; align-items: center; gap: 0.5rem;
          font-size: 0.72rem; font-weight: 600; letter-spacing: 0.25em;
          text-transform: uppercase; color: var(--gold);
          margin-bottom: 1.25rem;
        }
        .hero-eyebrow::before {
          content: ''; display: block;
          width: 28px; height: 1px; background: var(--gold);
        }
        .hero-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(2.8rem, 5vw, 4.2rem);
          font-weight: 600; line-height: 1.08;
          color: var(--white); margin-bottom: 1.5rem;
        }
        .hero-title em {
          font-style: italic; color: var(--gold-light);
        }
        .hero-desc {
          font-size: 1rem; line-height: 1.7;
          color: rgba(255,255,255,0.55);
          max-width: 480px; margin-bottom: 2.5rem;
        }
        .hero-actions {
          display: flex; gap: 1rem; flex-wrap: wrap;
        }
        .btn-primary {
          background: linear-gradient(135deg, var(--gold) 0%, var(--gold-dim) 100%);
          color: var(--ink); border: none; cursor: pointer;
          padding: 0.85rem 2rem;
          font-family: 'DM Sans', sans-serif;
          font-size: 0.88rem; font-weight: 600;
          letter-spacing: 0.06em; text-transform: uppercase;
          border-radius: 4px; transition: all 0.25s;
          box-shadow: 0 4px 16px rgba(201,168,76,0.35);
        }
        .btn-primary:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 28px rgba(201,168,76,0.5);
        }
        .btn-outline {
          background: transparent;
          color: rgba(255,255,255,0.8);
          border: 1px solid rgba(255,255,255,0.2);
          cursor: pointer;
          padding: 0.85rem 2rem;
          font-family: 'DM Sans', sans-serif;
          font-size: 0.88rem; font-weight: 500;
          letter-spacing: 0.06em; text-transform: uppercase;
          border-radius: 4px; transition: all 0.25s;
        }
        .btn-outline:hover {
          border-color: var(--gold);
          color: var(--gold-light);
        }
        .hero-stats {
          display: grid; grid-template-columns: repeat(2,1fr); gap: 1.5rem;
        }
        .stat-card {
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(201,168,76,0.15);
          border-radius: 8px; padding: 1.5rem;
          transition: border-color 0.2s;
        }
        .stat-card:hover { border-color: rgba(201,168,76,0.35); }
        .stat-value {
          font-family: 'Cormorant Garamond', serif;
          font-size: 2.4rem; font-weight: 700;
          color: var(--gold-light); line-height: 1;
        }
        .stat-label {
          font-size: 0.78rem; color: rgba(255,255,255,0.45);
          text-transform: uppercase; letter-spacing: 0.1em;
          margin-top: 0.4rem;
        }

        /* ── SEARCH & FILTER BAR ── */
        .filter-bar {
          background: var(--white);
          border-bottom: 1px solid var(--border-soft);
          position: sticky; top: 72px; z-index: 90;
        }
        .filter-inner {
          max-width: 1280px; margin: 0 auto;
          padding: 1rem 2rem;
          display: flex; gap: 1rem; align-items: center;
          flex-wrap: wrap;
        }
        .search-wrap {
          position: relative; flex: 1; min-width: 240px;
        }
        .search-icon {
          position: absolute; left: 14px; top: 50%;
          transform: translateY(-50%);
          color: var(--slate-light); font-size: 0.9rem;
          pointer-events: none;
        }
        .search-input {
          width: 100%; padding: 0.75rem 1rem 0.75rem 2.8rem;
          border: 1.5px solid var(--border-soft);
          border-radius: 6px;
          font-family: 'DM Sans', sans-serif;
          font-size: 0.9rem; color: var(--ink);
          background: var(--surface);
          transition: border-color 0.2s, box-shadow 0.2s;
          outline: none;
        }
        .search-input:focus {
          border-color: var(--gold);
          box-shadow: 0 0 0 3px rgba(201,168,76,0.1);
          background: var(--white);
        }
        .search-input::placeholder { color: var(--slate-light); }
        .category-pills {
          display: flex; gap: 0.5rem; flex-wrap: wrap;
        }
        .pill {
          display: flex; align-items: center; gap: 0.4rem;
          padding: 0.5rem 1rem;
          border-radius: 100px;
          font-family: 'DM Sans', sans-serif;
          font-size: 0.82rem; font-weight: 500;
          cursor: pointer; border: 1.5px solid transparent;
          transition: all 0.2s; white-space: nowrap;
          background: var(--surface-warm);
          color: var(--slate-mid);
        }
        .pill:hover {
          border-color: var(--gold);
          color: var(--gold-dim);
        }
        .pill.active {
          background: var(--ink);
          color: var(--gold-light);
          border-color: var(--ink);
        }

        /* ── SECTION HEADER ── */
        .section-header {
          max-width: 1280px; margin: 0 auto;
          padding: 2.5rem 2rem 1.5rem;
          display: flex; justify-content: space-between; align-items: flex-end;
        }
        .section-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: 1.8rem; font-weight: 600;
          color: var(--ink);
        }
        .section-count {
          font-size: 0.82rem; color: var(--slate-light);
          font-weight: 500; letter-spacing: 0.05em;
        }

        /* ── SERVICES GRID ── */
        .services-grid {
          max-width: 1280px; margin: 0 auto;
          padding: 0 2rem 4rem;
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
          gap: 1.5rem;
        }

        /* ── SERVICE CARD ── */
        .service-card {
          background: var(--white);
          border-radius: 10px;
          overflow: hidden;
          border: 1px solid var(--border-soft);
          box-shadow: var(--shadow-card);
          transition: all 0.3s cubic-bezier(0.25,0.8,0.25,1);
          display: flex; flex-direction: column;
        }
        .service-card:hover {
          transform: translateY(-4px);
          box-shadow: var(--shadow-hover);
          border-color: rgba(201,168,76,0.25);
        }
        .card-image {
          aspect-ratio: 4/3;
          position: relative; overflow: hidden;
          background: linear-gradient(135deg, var(--surface-warm) 0%, #e2ddd5 100%);
        }
        .card-image-overlay {
          position: absolute; inset: 0;
          background: linear-gradient(to bottom, transparent 50%, rgba(15,17,23,0.5) 100%);
          opacity: 0; transition: opacity 0.3s;
        }
        .service-card:hover .card-image-overlay { opacity: 1; }
        .card-category-badge {
          position: absolute; top: 12px; left: 12px;
          background: rgba(15,17,23,0.75);
          backdrop-filter: blur(6px);
          color: var(--gold-light);
          font-size: 0.68rem; font-weight: 600;
          text-transform: uppercase; letter-spacing: 0.12em;
          padding: 0.3rem 0.65rem; border-radius: 100px;
          border: 1px solid rgba(201,168,76,0.25);
        }
        .card-placeholder {
          width: 100%; height: 100%;
          display: flex; flex-direction: column;
          align-items: center; justify-content: center;
          gap: 0.5rem;
        }
        .card-placeholder-icon {
          font-size: 2.5rem; opacity: 0.4;
        }
        .card-placeholder-text {
          font-size: 0.75rem; color: var(--slate-light);
          text-transform: uppercase; letter-spacing: 0.1em;
        }
        .card-body {
          padding: 1.25rem 1.25rem 1.5rem;
          display: flex; flex-direction: column; flex: 1;
        }
        .card-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: 1.15rem; font-weight: 600;
          color: var(--ink); margin-bottom: 0.4rem;
          line-height: 1.25;
        }
        .card-desc {
          font-size: 0.82rem; color: var(--slate-mid);
          line-height: 1.6; flex: 1; margin-bottom: 1rem;
        }
        .card-footer {
          display: flex; align-items: center;
          justify-content: space-between; gap: 0.75rem;
          padding-top: 1rem;
          border-top: 1px solid var(--border-soft);
          margin-top: auto;
        }
        .card-price {
          font-family: 'Cormorant Garamond', serif;
          font-size: 1.25rem; font-weight: 700;
          color: var(--gold-dim);
        }
        .btn-inquire {
          background: var(--ink);
          color: var(--gold-light);
          border: 1px solid transparent;
          cursor: pointer;
          padding: 0.55rem 1.1rem;
          border-radius: 5px;
          font-family: 'DM Sans', sans-serif;
          font-size: 0.78rem; font-weight: 600;
          letter-spacing: 0.06em; text-transform: uppercase;
          transition: all 0.2s;
          white-space: nowrap;
        }
        .btn-inquire:hover {
          background: var(--gold);
          color: var(--ink);
          border-color: var(--gold);
        }

        /* ── WHY US STRIP ── */
        .why-strip {
          background: var(--ink-soft);
          padding: 3rem 2rem;
          border-top: 1px solid rgba(201,168,76,0.1);
          border-bottom: 1px solid rgba(201,168,76,0.1);
        }
        .why-inner {
          max-width: 1280px; margin: 0 auto;
          display: grid; grid-template-columns: repeat(auto-fit, minmax(200px,1fr));
          gap: 2rem;
        }
        .why-item {
          display: flex; align-items: flex-start; gap: 1rem;
        }
        .why-icon {
          width: 44px; height: 44px; flex-shrink: 0;
          background: rgba(201,168,76,0.1);
          border: 1px solid rgba(201,168,76,0.2);
          border-radius: 8px;
          display: flex; align-items: center; justify-content: center;
          font-size: 1.1rem;
        }
        .why-text-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: 1.05rem; font-weight: 600;
          color: var(--white); margin-bottom: 0.25rem;
        }
        .why-text-desc {
          font-size: 0.8rem; color: rgba(255,255,255,0.45);
          line-height: 1.5;
        }

        /* ── MODAL ── */
        .modal-backdrop {
          position: fixed; inset: 0;
          background: rgba(15,17,23,0.75);
          backdrop-filter: blur(4px);
          z-index: 200;
          display: flex; align-items: center; justify-content: center;
          padding: 1rem;
        }
        .modal {
          background: var(--white);
          border-radius: 12px;
          width: 100%; max-width: 480px;
          max-height: 90vh; overflow-y: auto;
          box-shadow: 0 24px 64px rgba(15,17,23,0.4);
          border: 1px solid rgba(201,168,76,0.15);
        }
        .modal-header {
          padding: 1.5rem 1.5rem 1rem;
          border-bottom: 1px solid var(--border-soft);
          display: flex; align-items: center; justify-content: space-between;
        }
        .modal-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: 1.5rem; font-weight: 600;
          color: var(--ink);
        }
        .modal-close {
          background: var(--surface-warm);
          border: none; cursor: pointer;
          width: 32px; height: 32px;
          border-radius: 50%;
          display: flex; align-items: center; justify-content: center;
          font-size: 1rem; color: var(--slate-mid);
          transition: background 0.2s;
        }
        .modal-close:hover { background: #e2ddd5; }
        .modal-body { padding: 1.5rem; }
        .inquiry-service-tag {
          display: flex; align-items: center; gap: 0.75rem;
          background: linear-gradient(135deg, #fffbf0 0%, #fff8e6 100%);
          border: 1px solid rgba(201,168,76,0.25);
          border-radius: 8px; padding: 0.75rem 1rem;
          margin-bottom: 1.5rem;
        }
        .inquiry-service-dot {
          width: 8px; height: 8px; border-radius: 50%;
          background: var(--gold); flex-shrink: 0;
        }
        .inquiry-service-label {
          font-size: 0.75rem; color: var(--slate-light);
          text-transform: uppercase; letter-spacing: 0.1em;
        }
        .inquiry-service-name {
          font-weight: 600; font-size: 0.9rem; color: var(--ink);
        }
        .form-group { margin-bottom: 1rem; }
        .form-label {
          display: block; font-size: 0.8rem; font-weight: 600;
          color: var(--slate); margin-bottom: 0.4rem;
          text-transform: uppercase; letter-spacing: 0.06em;
        }
        .form-req { color: var(--gold-dim); margin-left: 2px; }
        .form-input, .form-textarea {
          width: 100%; padding: 0.75rem 1rem;
          border: 1.5px solid var(--border-soft);
          border-radius: 6px;
          font-family: 'DM Sans', sans-serif;
          font-size: 0.9rem; color: var(--ink);
          background: var(--surface);
          transition: border-color 0.2s, box-shadow 0.2s;
          outline: none;
        }
        .form-input:focus, .form-textarea:focus {
          border-color: var(--gold);
          box-shadow: 0 0 0 3px rgba(201,168,76,0.1);
          background: var(--white);
        }
        .form-textarea { resize: vertical; min-height: 100px; }
        .form-input::placeholder, .form-textarea::placeholder { color: var(--slate-light); }
        .btn-submit {
          width: 100%;
          background: linear-gradient(135deg, var(--ink) 0%, var(--slate) 100%);
          color: var(--gold-light);
          border: none; cursor: pointer;
          padding: 0.9rem 2rem;
          font-family: 'DM Sans', sans-serif;
          font-size: 0.88rem; font-weight: 600;
          letter-spacing: 0.08em; text-transform: uppercase;
          border-radius: 6px; transition: all 0.25s;
          margin-top: 0.5rem;
        }
        .btn-submit:hover:not(:disabled) {
          background: linear-gradient(135deg, var(--gold-dim) 0%, var(--gold) 100%);
          color: var(--ink);
          transform: translateY(-1px);
        }
        .btn-submit:disabled { opacity: 0.5; cursor: not-allowed; }
        .contact-divider {
          display: flex; align-items: center; gap: 1rem;
          margin: 1.5rem 0;
          font-size: 0.75rem; color: var(--slate-light);
          text-transform: uppercase; letter-spacing: 0.1em;
        }
        .contact-divider::before, .contact-divider::after {
          content: ''; flex: 1; height: 1px;
          background: var(--border-soft);
        }
        .contact-links {
          display: grid; grid-template-columns: repeat(3,1fr); gap: 0.75rem;
        }
        .contact-link {
          display: flex; flex-direction: column; align-items: center; gap: 0.4rem;
          padding: 0.75rem;
          background: var(--surface);
          border: 1px solid var(--border-soft);
          border-radius: 8px; text-decoration: none;
          transition: all 0.2s;
        }
        .contact-link:hover {
          border-color: var(--gold);
          background: #fffbf0;
        }
        .contact-link-icon { font-size: 1.25rem; }
        .contact-link-label {
          font-size: 0.72rem; font-weight: 600;
          color: var(--slate); text-transform: uppercase;
          letter-spacing: 0.08em;
        }
        .contact-link-value {
          font-size: 0.78rem; color: var(--gold-dim); font-weight: 500;
        }

        /* ── FOOTER ── */
        .footer {
          background: var(--ink);
          color: var(--white);
          padding: 4rem 2rem 2rem;
        }
        .footer-inner {
          max-width: 1280px; margin: 0 auto;
        }
        .footer-top {
          display: grid; grid-template-columns: 2fr 1fr 1fr 1fr;
          gap: 3rem; padding-bottom: 3rem;
          border-bottom: 1px solid rgba(255,255,255,0.08);
        }
        .footer-brand-name {
          font-family: 'Cormorant Garamond', serif;
          font-size: 1.4rem; font-weight: 700;
          color: var(--white); margin-bottom: 0.25rem;
        }
        .footer-brand-sub {
          font-size: 0.65rem; font-weight: 600;
          color: var(--gold); letter-spacing: 0.25em;
          text-transform: uppercase; margin-bottom: 1rem;
        }
        .footer-brand-desc {
          font-size: 0.85rem; color: rgba(255,255,255,0.4);
          line-height: 1.7; max-width: 300px;
        }
        .footer-col-title {
          font-size: 0.72rem; font-weight: 600;
          color: var(--gold); text-transform: uppercase;
          letter-spacing: 0.2em; margin-bottom: 1.25rem;
        }
        .footer-col ul {
          list-style: none;
          display: flex; flex-direction: column; gap: 0.65rem;
        }
        .footer-col ul li {
          font-size: 0.85rem; color: rgba(255,255,255,0.45);
          display: flex; align-items: center; gap: 0.5rem;
        }
        .footer-bottom {
          padding-top: 2rem;
          display: flex; align-items: center; justify-content: space-between;
          flex-wrap: wrap; gap: 1rem;
        }
        .footer-copy {
          font-size: 0.78rem; color: rgba(255,255,255,0.25);
        }
        .footer-gold-line {
          width: 40px; height: 1px; background: var(--gold);
          opacity: 0.4;
        }

        /* ── LOADING ── */
        .loading-wrap {
          padding: 5rem 2rem; text-align: center;
        }
        .loading-spinner {
          width: 40px; height: 40px;
          border: 2px solid var(--border-soft);
          border-top-color: var(--gold);
          border-radius: 50%;
          animation: spin 0.8s linear infinite;
          margin: 0 auto 1rem;
        }
        @keyframes spin { to { transform: rotate(360deg); } }
        .loading-text {
          font-size: 0.9rem; color: var(--slate-light);
        }

        /* ── EMPTY STATE ── */
        .empty-state {
          padding: 5rem 2rem; text-align: center;
        }
        .empty-icon { font-size: 3rem; opacity: 0.2; margin-bottom: 1rem; }
        .empty-text {
          font-family: 'Cormorant Garamond', serif;
          font-size: 1.4rem; color: var(--slate-mid);
        }

        /* ── RESPONSIVE ── */
        @media (max-width: 900px) {
          .hero-inner { grid-template-columns: 1fr; gap: 3rem; }
          .footer-top { grid-template-columns: 1fr 1fr; }
          .nav-links { display: none; }
        }
        @media (max-width: 600px) {
          .footer-top { grid-template-columns: 1fr; gap: 2rem; }
          .contact-links { grid-template-columns: repeat(3,1fr); }
          .section-header { flex-direction: column; align-items: flex-start; gap: 0.5rem; }
        }
      `}</style>

      <div className="min-h-screen" style={{ background: 'var(--surface)' }}>

        {/* HEADER */}
        <header className="header">
          <div className="header-inner">
            <Link href="/">
              <div className="logo-mark" style={{ cursor: 'pointer' }}>
                <span className="logo-name">VINCEVIC SHADES</span>
                <span className="logo-sub">Enterprises · Kenya</span>
              </div>
            </Link>
            <nav>
              <ul className="nav-links">
                <li><Link href="/">Home</Link></li>
                <li><Link href="/services">Services</Link></li>
                <li><Link href="/portfolio">Portfolio</Link></li>
                <li><Link href="/about">About Us</Link></li>
                <li><Link href="/contact">Contact</Link></li>
              </ul>
            </nav>
            <button className="btn-cta" onClick={() => setShowContact(true)}>
              Get a Quote
            </button>
          </div>
        </header>

        {/* MODAL */}
        {showContact && (
          <div className="modal-backdrop" onClick={(e) => { if (e.target === e.currentTarget) setShowContact(false); }}>
            <div className="modal">
              <div className="modal-header">
                <h2 className="modal-title">Send an Inquiry</h2>
                <button className="modal-close" onClick={() => setShowContact(false)}>✕</button>
              </div>
              <div className="modal-body">
                {selectedService && (
                  <div className="inquiry-service-tag">
                    <div className="inquiry-service-dot" />
                    <div>
                      <div className="inquiry-service-label">Inquiring about</div>
                      <div className="inquiry-service-name">{selectedService}</div>
                    </div>
                  </div>
                )}
                <form onSubmit={submitInquiry}>
                  <div className="form-group">
                    <label className="form-label">Your Name <span className="form-req">*</span></label>
                    <input type="text" required className="form-input"
                      placeholder="Enter your full name"
                      value={inquiryForm.name}
                      onChange={(e) => setInquiryForm({ ...inquiryForm, name: e.target.value })} />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Phone Number <span className="form-req">*</span></label>
                    <input type="tel" required className="form-input"
                      placeholder="07XX XXX XXX"
                      value={inquiryForm.phone}
                      onChange={(e) => setInquiryForm({ ...inquiryForm, phone: e.target.value })} />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Email <span style={{ color: 'var(--slate-light)', fontWeight: 400, textTransform: 'none', letterSpacing: 0 }}>(Optional)</span></label>
                    <input type="email" className="form-input"
                      placeholder="your@email.com"
                      value={inquiryForm.email}
                      onChange={(e) => setInquiryForm({ ...inquiryForm, email: e.target.value })} />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Message <span className="form-req">*</span></label>
                    <textarea required className="form-textarea"
                      placeholder="Tell us about your project requirements, location, and timeline..."
                      value={inquiryForm.message}
                      onChange={(e) => setInquiryForm({ ...inquiryForm, message: e.target.value })} />
                  </div>
                  <button type="submit" className="btn-submit" disabled={submitting}>
                    {submitting ? 'Submitting…' : 'Submit Inquiry →'}
                  </button>
                </form>
                <div className="contact-divider">Or reach us directly</div>
                <div className="contact-links">
                  <a href="tel:0720120616" className="contact-link">
                    <span className="contact-link-icon">📞</span>
                    <span className="contact-link-label">Call</span>
                    <span className="contact-link-value">0720 120 616</span>
                  </a>
                  <a href="tel:0716632889" className="contact-link">
                    <span className="contact-link-icon">📱</span>
                    <span className="contact-link-label">Call</span>
                    <span className="contact-link-value">0716 632 889</span>
                  </a>
                  <a href="https://wa.me/254720120616" target="_blank" rel="noopener noreferrer" className="contact-link">
                    <span className="contact-link-icon">💬</span>
                    <span className="contact-link-label">WhatsApp</span>
                    <span className="contact-link-value">Chat Now</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* HERO */}
        <section className="hero">
          {/* Video Background */}
          <video
            autoPlay
            loop
            muted
            playsInline
            className="hero-video"
          >
            <source src="/images/video1.mp4" type="video/mp4" />
          </video>
          <div className="hero-grid-lines" />
          <div className="hero-inner">
            <div>
              <div className="hero-eyebrow">Nairobi, Kenya · Since 2012</div>
              <h1 className="hero-title">
                <em>Outdoor Structures</em><br />
                Specialist
              </h1>
              <p className="hero-desc">
                From elegant car shades and bespoke gazebos to architectural pagolas and automated security gates, we design, fabricate, and install with uncompromising quality.
              </p>
              <div className="hero-actions">
                <button className="btn-primary" onClick={() => { setSelectedService(''); setShowContact(true); }}>
                  Request Free Quote
                </button>
                <button className="btn-outline" onClick={() => document.querySelector('.services-grid')?.scrollIntoView({ behavior: 'smooth' })}>
                  Browse Services
                </button>
              </div>
            </div>
      
          </div>
        </section>



        {/* SEARCH & FILTER */}
        <div className="filter-bar">
          <div className="filter-inner">
            <div className="search-wrap">
              <span className="search-icon"></span>
              <input
                type="text"
                className="search-input"
                placeholder="Search shades, gazebos, pagolas, gates…"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="category-pills">
              {categories.map(cat => (
                <button
                  key={cat.id}
                  className={`pill ${selectedCategory === cat.id ? 'active' : ''}`}
                  onClick={() => setSelectedCategory(cat.id)}
                >
                  <span>{cat.name}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* SECTION TITLE */}
        <div className="section-header">
          <h2 className="section-title font-display">Our Services</h2>
          <span className="section-count">
            {filteredServices.length} {filteredServices.length === 1 ? 'result' : 'results'}
          </span>
        </div>

        {/* SERVICES GRID */}
        {loading ? (
          <div className="loading-wrap">
            <div className="loading-spinner" />
            <p className="loading-text">Loading services…</p>
          </div>
        ) : filteredServices.length === 0 ? (
          <div className="empty-state">
            <div className="empty-icon"></div>
            <p className="empty-text">No services match your search</p>
          </div>
        ) : (
          <div className="services-grid">
            {filteredServices.map(service => (
              <div key={service._id} className="service-card">
                <div className="card-image">
                  {service.image && service.image.startsWith('/images/') ? (
                    <>
                      <Image src={service.image} alt={service.name} fill
                        className="object-cover" sizes="(max-width:640px) 100vw, (max-width:1024px) 50vw, 25vw" />
                      <div className="card-image-overlay" />
                    </>
                  ) : (
                    <div className="card-placeholder">
                      <span className="card-placeholder-icon">{categoryIcon(service.category)}</span>
                      <span className="card-placeholder-text">{service.category}</span>
                    </div>
                  )}
                  <span className="card-category-badge">{service.category}</span>
                </div>
                <div className="card-body">
                  <h3 className="card-title">{service.name}</h3>
                  <p className="card-desc">{service.description}</p>
                  <div className="card-footer">
                    <span className="card-price">{service.price}</span>
                    <button className="btn-inquire" onClick={() => handleInquiry(service.name)}>
                      Inquire 
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* FOOTER */}
        <footer className="footer">
          <div className="footer-inner">
            <div className="footer-top">
              <div>
                <div className="footer-brand-name">VINCEVIC SHADES</div>
                <div className="footer-brand-sub">Enterprises</div>
                <p className="footer-brand-desc">
                  Your trusted partner for quality outdoor structures across Kenya. We bring craftsmanship, durability, and design excellence to every project.
                </p>
              </div>
              <div className="footer-col">
                <div className="footer-col-title">Quick Links</div>
                <ul>
                  <li><Link href="/" style={{ color: 'inherit', textDecoration: 'none' }}>Home</Link></li>
                  <li><Link href="/services" style={{ color: 'inherit', textDecoration: 'none' }}>Services</Link></li>
                  <li><Link href="/portfolio" style={{ color: 'inherit', textDecoration: 'none' }}>Portfolio</Link></li>
                  <li><Link href="/about" style={{ color: 'inherit', textDecoration: 'none' }}>About Us</Link></li>
                  <li><Link href="/contact" style={{ color: 'inherit', textDecoration: 'none' }}>Contact</Link></li>
                </ul>
              </div>
              <div className="footer-col">
                <div className="footer-col-title">Services</div>
                <ul>
                  <li>Car Shades & Covers</li>
                  <li>Garden Gazebos</li>
                  <li>Decorative Pagolas</li>
                  <li>Security Gates</li>
                </ul>
              </div>
              <div className="footer-col">
                <div className="footer-col-title">Contact</div>
                <ul>
                  <li>📞 0720 120 616</li>
                  <li>📱 0716 632 889</li>
                  <li>🕒 Mon–Fri: 8AM–6PM</li>
                  <li>🕒 Sat: 9AM–5PM</li>
                </ul>
              </div>
            </div>
            <div className="footer-bottom">
              <span className="footer-copy">© 2026 Vincevic Shades Interprises. All rights reserved.</span>
              <div className="footer-gold-line" />
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}