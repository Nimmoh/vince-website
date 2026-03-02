'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useCart } from '@/lib/CartContext';

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

const processSteps = [
  { num: '01', title: 'Consultation', desc: 'We visit your site, understand your needs, and advise on the best solution for your space and budget.' },
  { num: '02', title: 'Custom Design', desc: 'Our team creates detailed designs and material specifications tailored precisely to your project.' },
  { num: '03', title: 'Fabrication', desc: 'Structures are fabricated in our workshop using high-grade steel, aluminium, and treated timber.' },
  { num: '04', title: 'Installation', desc: 'Our experienced crew installs your structure on-site with minimal disruption, on schedule.' },
];

const testimonials = [
  { name: 'James Mwangi', role: 'Homeowner, Karen', text: 'Vincevic transformed our backyard completely. The gazebo they built is the centerpiece of every family gathering. Exceptional quality and on-time delivery.' },
  { name: 'Sarah Kamau', role: 'Property Manager, Westlands', text: 'We\'ve hired them for three commercial parking shades across our properties. Professional, durable, and competitively priced. Highly recommend.' },
  { name: 'David Otieno', role: 'Hotel Manager, Naivasha', text: 'The automated gate system they installed has been flawless for two years. The team was thorough from design to commissioning.' },
];

export default function Home() {
  const { addToCart, cartCount } = useCart();
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [showContact, setShowContact] = useState(false);
  const [services, setServices] = useState(defaultServices);
  const [loading, setLoading] = useState(false);
  const [selectedService, setSelectedService] = useState<string>('');
  const [activeTestimonial, setActiveTestimonial] = useState(0);
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

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveTestimonial(prev => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(timer);
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
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;0,700;1,400;1,600&family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500;9..40,600&display=swap');

        :root {
          --ink: #0f1117;
          --ink-soft: #1c2030;
          --surface: #f7f5f0;
          --surface-warm: #f0ece4;
          --gold: #c9a84c;
          --gold-light: #e4c97a;
          --gold-dim: #8a6f34;
          --gold-pale: #fdf8ee;
          --slate: #2d3448;
          --slate-mid: #4a5568;
          --slate-light: #718096;
          --white: #ffffff;
          --border: rgba(201,168,76,0.18);
          --border-soft: rgba(45,52,72,0.12);
          --shadow-card: 0 4px 24px rgba(15,17,23,0.07), 0 1px 4px rgba(15,17,23,0.05);
          --shadow-hover: 0 16px 48px rgba(15,17,23,0.14), 0 4px 12px rgba(15,17,23,0.08);
          --shadow-gold: 0 0 0 1px rgba(201,168,76,0.3), 0 8px 24px rgba(201,168,76,0.12);
        }

        * { box-sizing: border-box; margin: 0; padding: 0; }

        html { scroll-behavior: smooth; }

        body {
          font-family: 'DM Sans', sans-serif;
          background: var(--surface);
          color: var(--ink);
          -webkit-font-smoothing: antialiased;
        }

        .font-display { font-family: 'Cormorant Garamond', serif; }

        /* ── ANNOUNCEMENT BAR ── */
        .announcement-bar {
          background: linear-gradient(90deg, var(--gold-dim) 0%, var(--gold) 50%, var(--gold-dim) 100%);
          padding: 0.55rem 2rem;
          text-align: center;
          font-size: 0.75rem;
          font-weight: 600;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: var(--ink);
        }
        .announcement-bar a {
          color: var(--ink);
          text-decoration: underline;
          text-underline-offset: 3px;
          margin-left: 0.75rem;
          opacity: 0.75;
          transition: opacity 0.2s;
        }
        .announcement-bar a:hover { opacity: 1; }

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
          position: relative;
          padding-bottom: 2px;
        }
        .nav-links a::after {
          content: '';
          position: absolute; bottom: -2px; left: 0;
          width: 0; height: 1px;
          background: var(--gold);
          transition: width 0.25s;
        }
        .nav-links a:hover { color: var(--gold-light); }
        .nav-links a:hover::after { width: 100%; }
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
        .cart-icon-btn {
          position: relative;
          background: transparent;
          border: 1px solid rgba(201,168,76,0.3);
          color: var(--gold-light);
          cursor: pointer;
          padding: 0.6rem 1rem;
          font-size: 1.2rem;
          border-radius: 4px;
          transition: all 0.25s;
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }
        .cart-icon-btn:hover {
          border-color: var(--gold);
          background: rgba(201,168,76,0.1);
        }
        .cart-count {
          position: absolute;
          top: -8px;
          right: -8px;
          background: var(--gold);
          color: var(--ink);
          font-size: 0.7rem;
          font-weight: 700;
          padding: 0.15rem 0.4rem;
          border-radius: 100px;
          min-width: 18px;
          text-align: center;
        }

        /* ── HERO ── */
        .hero {
          background: var(--ink);
          position: relative; overflow: hidden;
          padding: 6rem 2rem 5rem;
          min-height: 88vh;
          display: flex; align-items: center;
        }
        .hero-video {
          position: absolute;
          top: 0; left: 0;
          width: 100%; height: 100%;
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
          max-width: 1280px; margin: 0 auto; width: 100%;
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
          font-size: clamp(2.8rem, 5vw, 4.4rem);
          font-weight: 600; line-height: 1.06;
          color: var(--white); margin-bottom: 1.5rem;
        }
        .hero-title em {
          font-style: italic; color: var(--gold-light);
        }
        .hero-desc {
          font-size: 1rem; line-height: 1.75;
          color: rgba(255,255,255,0.55);
          max-width: 480px; margin-bottom: 2rem;
        }
        .hero-trust-row {
          display: flex; align-items: center; gap: 1.5rem;
          margin-bottom: 2.5rem;
          flex-wrap: wrap;
        }
        .hero-trust-item {
          display: flex; align-items: center; gap: 0.4rem;
          font-size: 0.78rem; color: rgba(255,255,255,0.45);
        }
        .hero-trust-item span:first-child { color: var(--gold); font-size: 0.9rem; }
        .hero-actions {
          display: flex; gap: 1rem; flex-wrap: wrap;
        }
        .btn-primary {
          background: linear-gradient(135deg, var(--gold) 0%, var(--gold-dim) 100%);
          color: var(--ink); border: none; cursor: pointer;
          padding: 0.9rem 2.2rem;
          font-family: 'DM Sans', sans-serif;
          font-size: 0.88rem; font-weight: 600;
          letter-spacing: 0.06em; text-transform: uppercase;
          border-radius: 4px; transition: all 0.25s;
          box-shadow: 0 4px 16px rgba(201,168,76,0.35);
          display: flex; align-items: center; gap: 0.5rem;
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
          padding: 0.9rem 2.2rem;
          font-family: 'DM Sans', sans-serif;
          font-size: 0.88rem; font-weight: 500;
          letter-spacing: 0.06em; text-transform: uppercase;
          border-radius: 4px; transition: all 0.25s;
          display: flex; align-items: center; gap: 0.5rem;
        }
        .btn-outline:hover {
          border-color: var(--gold);
          color: var(--gold-light);
        }
        .hero-stats {
          display: grid; grid-template-columns: repeat(2,1fr); gap: 1.25rem;
        }
        .stat-card {
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(201,168,76,0.15);
          border-radius: 10px; padding: 1.5rem;
          transition: all 0.3s;
          position: relative; overflow: hidden;
        }
        .stat-card::before {
          content: '';
          position: absolute; top: 0; left: 0; right: 0;
          height: 2px;
          background: linear-gradient(90deg, transparent, var(--gold), transparent);
          opacity: 0; transition: opacity 0.3s;
        }
        .stat-card:hover { border-color: rgba(201,168,76,0.4); background: rgba(255,255,255,0.06); }
        .stat-card:hover::before { opacity: 1; }
        .stat-value {
          font-family: 'Cormorant Garamond', serif;
          font-size: 2.6rem; font-weight: 700;
          color: var(--gold-light); line-height: 1;
        }
        .stat-label {
          font-size: 0.75rem; color: rgba(255,255,255,0.4);
          text-transform: uppercase; letter-spacing: 0.12em;
          margin-top: 0.5rem;
        }

        /* ── TICKER / MARQUEE ── */
        .ticker-wrap {
          background: var(--gold);
          overflow: hidden;
          padding: 0.7rem 0;
        }
        .ticker-inner {
          display: flex; align-items: center;
          animation: ticker 30s linear infinite;
          white-space: nowrap;
        }
        .ticker-item {
          display: inline-flex; align-items: center; gap: 1.5rem;
          padding: 0 2rem;
          font-size: 0.75rem; font-weight: 700;
          letter-spacing: 0.15em; text-transform: uppercase;
          color: var(--ink);
        }
        .ticker-dot { width: 4px; height: 4px; border-radius: 50%; background: var(--ink); opacity: 0.4; }
        @keyframes ticker { from { transform: translateX(0); } to { transform: translateX(-50%); } }

        /* ── CATEGORY SHOWCASE ── */
        .category-showcase {
          background: var(--white);
          padding: 5rem 2rem;
          border-bottom: 1px solid var(--border-soft);
        }
        .cs-inner { max-width: 1280px; margin: 0 auto; }
        .cs-header {
          display: flex; justify-content: space-between; align-items: flex-end;
          margin-bottom: 3rem; flex-wrap: wrap; gap: 1rem;
        }
        .section-eyebrow {
          font-size: 0.72rem; font-weight: 600; letter-spacing: 0.25em;
          text-transform: uppercase; color: var(--gold-dim);
          margin-bottom: 0.5rem;
          display: flex; align-items: center; gap: 0.5rem;
        }
        .section-eyebrow::before {
          content: ''; width: 20px; height: 1px; background: var(--gold);
        }
        .section-title-lg {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(1.8rem, 3vw, 2.6rem);
          font-weight: 600; color: var(--ink);
          line-height: 1.15;
        }
        .section-title-lg em { font-style: italic; color: var(--gold-dim); }
        .cs-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 1.25rem;
        }
        .cs-card {
          border-radius: 10px; overflow: hidden;
          position: relative;
          aspect-ratio: 3/4;
          background: linear-gradient(135deg, var(--ink) 0%, var(--slate) 100%);
          cursor: pointer;
          transition: transform 0.35s cubic-bezier(0.25,0.8,0.25,1), box-shadow 0.35s;
        }
        .cs-card:hover { transform: translateY(-6px); box-shadow: var(--shadow-hover); }
        .cs-card-bg {
          position: absolute; inset: 0;
          background: linear-gradient(to bottom, rgba(15,17,23,0.3) 0%, rgba(15,17,23,0.85) 100%);
          z-index: 1;
          transition: background 0.3s;
        }
        .cs-card:hover .cs-card-bg {
          background: linear-gradient(to bottom, rgba(15,17,23,0.2) 0%, rgba(15,17,23,0.9) 100%);
        }
        .cs-card-placeholder {
          position: absolute; inset: 0;
          display: flex; align-items: center; justify-content: center;
          font-size: 3rem; opacity: 0.2;
        }
        .cs-card-content {
          position: absolute; bottom: 0; left: 0; right: 0;
          padding: 1.5rem;
          z-index: 2;
        }
        .cs-card-icon {
          width: 40px; height: 40px;
          background: rgba(201,168,76,0.2);
          border: 1px solid rgba(201,168,76,0.4);
          border-radius: 8px;
          display: flex; align-items: center; justify-content: center;
          font-size: 1.1rem; margin-bottom: 0.75rem;
          transition: background 0.3s;
        }
        .cs-card:hover .cs-card-icon { background: rgba(201,168,76,0.35); }
        .cs-card-name {
          font-family: 'Cormorant Garamond', serif;
          font-size: 1.3rem; font-weight: 600;
          color: var(--white); margin-bottom: 0.25rem;
        }
        .cs-card-count {
          font-size: 0.75rem; color: var(--gold-light);
          text-transform: uppercase; letter-spacing: 0.12em;
        }
        .cs-card-arrow {
          position: absolute; top: 1.25rem; right: 1.25rem;
          z-index: 2;
          width: 32px; height: 32px;
          background: rgba(201,168,76,0.15);
          border: 1px solid rgba(201,168,76,0.3);
          border-radius: 50%;
          display: flex; align-items: center; justify-content: center;
          font-size: 0.8rem; color: var(--gold-light);
          opacity: 0; transform: translateY(4px);
          transition: all 0.3s;
        }
        .cs-card:hover .cs-card-arrow { opacity: 1; transform: translateY(0); }

        /* ── SEARCH & FILTER BAR ── */
        .filter-bar {
          background: var(--white);
          border-bottom: 1px solid var(--border-soft);
          position: sticky; top: 72px; z-index: 90;
          box-shadow: 0 2px 12px rgba(15,17,23,0.06);
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
          padding: 0.5rem 1.1rem;
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
          padding: 3rem 2rem 1.5rem;
          display: flex; justify-content: space-between; align-items: flex-end;
        }
        .section-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: 2rem; font-weight: 600;
          color: var(--ink);
        }
        .section-count {
          font-size: 0.82rem; color: var(--slate-light);
          font-weight: 500; letter-spacing: 0.05em;
          background: var(--surface-warm);
          padding: 0.3rem 0.75rem;
          border-radius: 100px;
          border: 1px solid var(--border-soft);
        }

        /* ── SERVICES GRID ── */
        .services-grid {
          max-width: 1280px; margin: 0 auto;
          padding: 0 2rem 5rem;
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(290px, 1fr));
          gap: 1.5rem;
        }

        /* ── SERVICE CARD ── */
        .service-card {
          background: var(--white);
          border-radius: 12px;
          overflow: hidden;
          border: 1px solid var(--border-soft);
          box-shadow: var(--shadow-card);
          transition: all 0.3s cubic-bezier(0.25,0.8,0.25,1);
          display: flex; flex-direction: column;
        }
        .service-card:hover {
          transform: translateY(-5px);
          box-shadow: var(--shadow-hover);
          border-color: rgba(201,168,76,0.3);
        }
        .card-image {
          aspect-ratio: 4/3;
          position: relative; overflow: hidden;
          background: linear-gradient(135deg, var(--surface-warm) 0%, #e2ddd5 100%);
        }
        .card-image-overlay {
          position: absolute; inset: 0;
          background: linear-gradient(to bottom, transparent 40%, rgba(15,17,23,0.55) 100%);
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
          padding: 0.3rem 0.7rem; border-radius: 100px;
          border: 1px solid rgba(201,168,76,0.25);
        }
        .card-wishlist {
          position: absolute; top: 12px; right: 12px;
          width: 30px; height: 30px;
          background: rgba(255,255,255,0.15);
          backdrop-filter: blur(6px);
          border-radius: 50%;
          display: flex; align-items: center; justify-content: center;
          font-size: 0.85rem;
          opacity: 0; transform: scale(0.8);
          transition: all 0.25s;
        }
        .service-card:hover .card-wishlist { opacity: 1; transform: scale(1); }
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
          padding: 1.3rem 1.3rem 1.5rem;
          display: flex; flex-direction: column; flex: 1;
        }
        .card-meta {
          font-size: 0.72rem; color: var(--slate-light);
          text-transform: uppercase; letter-spacing: 0.1em;
          margin-bottom: 0.35rem;
        }
        .card-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: 1.2rem; font-weight: 600;
          color: var(--ink); margin-bottom: 0.45rem;
          line-height: 1.25;
        }
        .card-desc {
          font-size: 0.83rem; color: var(--slate-mid);
          line-height: 1.65; flex: 1; margin-bottom: 1.1rem;
        }
        .card-footer {
          display: flex; align-items: center;
          justify-content: space-between; gap: 0.75rem;
          padding-top: 1rem;
          border-top: 1px solid var(--border-soft);
          margin-top: auto;
        }
        .card-price-wrap {}
        .card-price-from {
          font-size: 0.68rem; color: var(--slate-light);
          text-transform: uppercase; letter-spacing: 0.08em;
        }
        .card-price {
          font-family: 'Cormorant Garamond', serif;
          font-size: 1.3rem; font-weight: 700;
          color: var(--gold-dim); line-height: 1;
        }
        .card-actions {
          display: flex; gap: 0.5rem;
        }
        .btn-inquire {
          background: transparent;
          color: var(--ink);
          border: 1.5px solid var(--border-soft);
          cursor: pointer;
          padding: 0.5rem 0.9rem;
          border-radius: 5px;
          font-family: 'DM Sans', sans-serif;
          font-size: 0.75rem; font-weight: 600;
          letter-spacing: 0.04em; text-transform: uppercase;
          transition: all 0.2s;
          white-space: nowrap;
        }
        .btn-inquire:hover {
          border-color: var(--ink);
          background: var(--ink);
          color: var(--gold-light);
        }
        .btn-add-cart {
          background: var(--ink);
          color: var(--gold-light);
          border: 1.5px solid var(--ink);
          cursor: pointer;
          padding: 0.5rem 0.9rem;
          border-radius: 5px;
          font-family: 'DM Sans', sans-serif;
          font-size: 0.75rem; font-weight: 600;
          letter-spacing: 0.04em; text-transform: uppercase;
          transition: all 0.2s;
          white-space: nowrap;
        }
        .btn-add-cart:hover {
          background: var(--gold);
          border-color: var(--gold);
          color: var(--ink);
          transform: translateY(-1px);
        }

        /* ── PROCESS SECTION ── */
        .process-section {
          background: var(--surface-warm);
          padding: 6rem 2rem;
          border-top: 1px solid var(--border-soft);
          border-bottom: 1px solid var(--border-soft);
        }
        .process-inner { max-width: 1280px; margin: 0 auto; }
        .process-header { text-align: center; margin-bottom: 4rem; }
        .process-grid {
          display: grid; grid-template-columns: repeat(4,1fr);
          gap: 0;
          position: relative;
        }
        .process-connector {
          position: absolute;
          top: 36px; left: calc(12.5% + 20px);
          right: calc(12.5% + 20px);
          height: 1px;
          background: repeating-linear-gradient(90deg, var(--gold) 0, var(--gold) 8px, transparent 8px, transparent 16px);
          z-index: 0;
        }
        .process-step {
          position: relative; z-index: 1;
          display: flex; flex-direction: column;
          align-items: center; text-align: center;
          padding: 0 1.5rem;
        }
        .process-num-wrap {
          width: 72px; height: 72px;
          border-radius: 50%;
          background: var(--white);
          border: 2px solid var(--border-soft);
          display: flex; align-items: center; justify-content: center;
          margin-bottom: 1.5rem;
          transition: all 0.3s;
          position: relative;
        }
        .process-step:hover .process-num-wrap {
          border-color: var(--gold);
          background: var(--gold-pale);
          box-shadow: 0 0 0 6px rgba(201,168,76,0.08);
        }
        .process-num {
          font-family: 'Cormorant Garamond', serif;
          font-size: 1.5rem; font-weight: 700;
          color: var(--gold-dim);
        }
        .process-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: 1.15rem; font-weight: 600;
          color: var(--ink); margin-bottom: 0.6rem;
        }
        .process-desc {
          font-size: 0.83rem; color: var(--slate-mid);
          line-height: 1.65; max-width: 200px;
        }

        /* ── TESTIMONIALS ── */
        .testimonials-section {
          background: var(--ink);
          padding: 6rem 2rem;
          position: relative; overflow: hidden;
        }
        .testimonials-section::before {
          content: '"';
          position: absolute; top: -2rem; left: 50%;
          transform: translateX(-50%);
          font-family: 'Cormorant Garamond', serif;
          font-size: 20rem; font-weight: 700;
          color: rgba(201,168,76,0.04);
          line-height: 1; pointer-events: none;
          z-index: 0;
        }
        .testimonials-inner {
          max-width: 860px; margin: 0 auto;
          text-align: center; position: relative; z-index: 1;
        }
        .testimonials-label {
          font-size: 0.72rem; font-weight: 600; letter-spacing: 0.25em;
          text-transform: uppercase; color: var(--gold);
          margin-bottom: 3rem;
        }
        .testimonial-item {
          transition: opacity 0.5s, transform 0.5s;
        }
        .testimonial-text {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(1.3rem, 2.5vw, 1.85rem);
          font-weight: 400; font-style: italic;
          color: rgba(255,255,255,0.85); line-height: 1.6;
          margin-bottom: 2rem;
        }
        .testimonial-author {
          display: flex; flex-direction: column;
          align-items: center; gap: 0.3rem;
        }
        .testimonial-name {
          font-weight: 600; font-size: 0.9rem;
          color: var(--gold-light); letter-spacing: 0.05em;
        }
        .testimonial-role {
          font-size: 0.78rem; color: rgba(255,255,255,0.35);
        }
        .testimonial-dots {
          display: flex; justify-content: center; gap: 0.5rem;
          margin-top: 2.5rem;
        }
        .testimonial-dot {
          width: 6px; height: 6px; border-radius: 50%;
          background: rgba(255,255,255,0.15);
          cursor: pointer; transition: all 0.2s;
          border: none;
        }
        .testimonial-dot.active {
          background: var(--gold);
          width: 20px; border-radius: 3px;
        }

        /* ── WHY US STRIP ── */
        .why-strip {
          background: var(--white);
          padding: 4rem 2rem;
          border-top: 1px solid var(--border-soft);
          border-bottom: 1px solid var(--border-soft);
        }
        .why-inner {
          max-width: 1280px; margin: 0 auto;
          display: grid; grid-template-columns: repeat(auto-fit, minmax(220px,1fr));
          gap: 2.5rem;
        }
        .why-item {
          display: flex; align-items: flex-start; gap: 1rem;
          padding: 1.5rem;
          border-radius: 10px;
          transition: background 0.2s;
        }
        .why-item:hover { background: var(--surface-warm); }
        .why-icon {
          width: 48px; height: 48px; flex-shrink: 0;
          background: var(--surface-warm);
          border: 1px solid var(--border-soft);
          border-radius: 10px;
          display: flex; align-items: center; justify-content: center;
          font-size: 1.2rem;
          transition: all 0.2s;
        }
        .why-item:hover .why-icon {
          background: linear-gradient(135deg, var(--gold) 0%, var(--gold-dim) 100%);
          border-color: var(--gold);
        }
        .why-text-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: 1.1rem; font-weight: 600;
          color: var(--ink); margin-bottom: 0.3rem;
        }
        .why-text-desc {
          font-size: 0.82rem; color: var(--slate-mid);
          line-height: 1.6;
        }

        /* ── CTA BANNER ── */
        .cta-banner {
          background: linear-gradient(135deg, var(--gold-dim) 0%, var(--gold) 50%, #b8921f 100%);
          padding: 5rem 2rem;
          text-align: center;
          position: relative; overflow: hidden;
        }
        .cta-banner-inner {
          position: relative; z-index: 1;
          max-width: 680px; margin: 0 auto;
        }
        .cta-banner-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(2rem, 4vw, 3.2rem);
          font-weight: 600; color: var(--ink);
          margin-bottom: 1rem; line-height: 1.15;
        }
        .cta-banner-desc {
          font-size: 1rem; color: rgba(15,17,23,0.65);
          margin-bottom: 2.5rem; line-height: 1.7;
        }
        .cta-banner-actions {
          display: flex; gap: 1rem; justify-content: center; flex-wrap: wrap;
        }
        .btn-dark {
          background: var(--ink);
          color: var(--gold-light);
          border: none; cursor: pointer;
          padding: 0.95rem 2.5rem;
          font-family: 'DM Sans', sans-serif;
          font-size: 0.9rem; font-weight: 600;
          letter-spacing: 0.06em; text-transform: uppercase;
          border-radius: 4px; transition: all 0.25s;
          box-shadow: 0 4px 20px rgba(15,17,23,0.3);
        }
        .btn-dark:hover {
          background: var(--slate);
          transform: translateY(-2px);
          box-shadow: 0 8px 32px rgba(15,17,23,0.4);
        }
        .btn-dark-outline {
          background: transparent;
          color: var(--ink);
          border: 2px solid rgba(15,17,23,0.3);
          cursor: pointer;
          padding: 0.95rem 2.5rem;
          font-family: 'DM Sans', sans-serif;
          font-size: 0.9rem; font-weight: 600;
          letter-spacing: 0.06em; text-transform: uppercase;
          border-radius: 4px; transition: all 0.25s;
          text-decoration: none;
        }
        .btn-dark-outline:hover {
          border-color: var(--ink);
          background: rgba(15,17,23,0.08);
        }

        /* ── MODAL ── */
        .modal-backdrop {
          position: fixed; inset: 0;
          background: rgba(15,17,23,0.8);
          backdrop-filter: blur(6px);
          z-index: 200;
          display: flex; align-items: center; justify-content: center;
          padding: 1rem;
        }
        .modal {
          background: var(--white);
          border-radius: 14px;
          width: 100%; max-width: 500px;
          max-height: 92vh; overflow-y: auto;
          box-shadow: 0 32px 80px rgba(15,17,23,0.45);
          border: 1px solid rgba(201,168,76,0.2);
        }
        .modal-header {
          padding: 1.75rem 1.75rem 1.25rem;
          border-bottom: 1px solid var(--border-soft);
          display: flex; align-items: flex-start; justify-content: space-between;
        }
        .modal-header-text {}
        .modal-eyebrow {
          font-size: 0.68rem; font-weight: 600; letter-spacing: 0.2em;
          text-transform: uppercase; color: var(--gold-dim);
          margin-bottom: 0.25rem;
        }
        .modal-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: 1.6rem; font-weight: 600;
          color: var(--ink);
        }
        .modal-close {
          background: var(--surface-warm);
          border: none; cursor: pointer;
          width: 34px; height: 34px;
          border-radius: 50%;
          display: flex; align-items: center; justify-content: center;
          font-size: 1rem; color: var(--slate-mid);
          transition: all 0.2s; flex-shrink: 0; margin-top: 2px;
        }
        .modal-close:hover { background: #e2ddd5; color: var(--ink); }
        .modal-body { padding: 1.75rem; }
        .inquiry-service-tag {
          display: flex; align-items: center; gap: 0.75rem;
          background: linear-gradient(135deg, #fffbf0 0%, #fff8e6 100%);
          border: 1px solid rgba(201,168,76,0.25);
          border-radius: 8px; padding: 0.85rem 1rem;
          margin-bottom: 1.5rem;
        }
        .inquiry-service-dot {
          width: 8px; height: 8px; border-radius: 50%;
          background: var(--gold); flex-shrink: 0;
        }
        .inquiry-service-label {
          font-size: 0.72rem; color: var(--slate-light);
          text-transform: uppercase; letter-spacing: 0.1em;
        }
        .inquiry-service-name {
          font-weight: 600; font-size: 0.92rem; color: var(--ink);
        }
        .form-row {
          display: grid; grid-template-columns: 1fr 1fr; gap: 1rem;
        }
        .form-group { margin-bottom: 1rem; }
        .form-label {
          display: block; font-size: 0.77rem; font-weight: 600;
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
          padding: 0.95rem 2rem;
          font-family: 'DM Sans', sans-serif;
          font-size: 0.88rem; font-weight: 600;
          letter-spacing: 0.08em; text-transform: uppercase;
          border-radius: 6px; transition: all 0.25s;
          margin-top: 0.5rem;
          display: flex; align-items: center; justify-content: center; gap: 0.5rem;
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
          font-size: 0.72rem; color: var(--slate-light);
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
          padding: 0.85rem;
          background: var(--surface);
          border: 1px solid var(--border-soft);
          border-radius: 8px; text-decoration: none;
          transition: all 0.2s;
        }
        .contact-link:hover {
          border-color: var(--gold);
          background: var(--gold-pale);
          transform: translateY(-2px);
        }
        .contact-link-icon { font-size: 1.3rem; }
        .contact-link-label {
          font-size: 0.68rem; font-weight: 600;
          color: var(--slate); text-transform: uppercase;
          letter-spacing: 0.08em;
        }
        .contact-link-value {
          font-size: 0.76rem; color: var(--gold-dim); font-weight: 500;
        }

        /* ── FOOTER ── */
        .footer {
          background: var(--ink);
          color: var(--white);
          padding: 5rem 2rem 2.5rem;
        }
        .footer-inner {
          max-width: 1280px; margin: 0 auto;
        }
        .footer-top {
          display: grid; grid-template-columns: 2fr 1fr 1fr 1fr;
          gap: 3rem; padding-bottom: 3.5rem;
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
          text-transform: uppercase; margin-bottom: 1.25rem;
        }
        .footer-brand-desc {
          font-size: 0.85rem; color: rgba(255,255,255,0.35);
          line-height: 1.75; max-width: 300px;
          margin-bottom: 1.5rem;
        }
        .footer-social {
          display: flex; gap: 0.6rem;
        }
        .footer-social-link {
          width: 34px; height: 34px;
          background: rgba(255,255,255,0.05);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 6px;
          display: flex; align-items: center; justify-content: center;
          font-size: 0.9rem; text-decoration: none;
          color: rgba(255,255,255,0.4);
          transition: all 0.2s;
        }
        .footer-social-link:hover {
          background: rgba(201,168,76,0.15);
          border-color: rgba(201,168,76,0.3);
          color: var(--gold-light);
        }
        .footer-col-title {
          font-size: 0.7rem; font-weight: 600;
          color: var(--gold); text-transform: uppercase;
          letter-spacing: 0.2em; margin-bottom: 1.5rem;
        }
        .footer-col ul {
          list-style: none;
          display: flex; flex-direction: column; gap: 0.8rem;
        }
        .footer-col ul li {
          font-size: 0.85rem; color: rgba(255,255,255,0.4);
          display: flex; align-items: center; gap: 0.5rem;
          transition: color 0.2s;
        }
        .footer-col ul li a {
          color: inherit; text-decoration: none;
          transition: color 0.2s;
        }
        .footer-col ul li:hover, .footer-col ul li a:hover {
          color: rgba(255,255,255,0.75);
        }
        .footer-bottom {
          padding-top: 2rem;
          display: flex; align-items: center; justify-content: space-between;
          flex-wrap: wrap; gap: 1rem;
        }
        .footer-copy {
          font-size: 0.78rem; color: rgba(255,255,255,0.2);
        }
        .footer-legal {
          display: flex; gap: 1.5rem;
        }
        .footer-legal a {
          font-size: 0.75rem; color: rgba(255,255,255,0.2);
          text-decoration: none; transition: color 0.2s;
        }
        .footer-legal a:hover { color: rgba(255,255,255,0.5); }

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
        @media (max-width: 1024px) {
          .cs-grid { grid-template-columns: repeat(2, 1fr); }
          .process-grid { grid-template-columns: repeat(2, 1fr); gap: 2.5rem; }
          .process-connector { display: none; }
        }
        @media (max-width: 900px) {
          .hero-inner { grid-template-columns: 1fr; gap: 3rem; }
          .footer-top { grid-template-columns: 1fr 1fr; }
          .nav-links { display: none; }
        }
        @media (max-width: 600px) {
          .hero { min-height: auto; padding: 4rem 1.5rem 3rem; }
          .cs-grid { grid-template-columns: repeat(2, 1fr); }
          .process-grid { grid-template-columns: 1fr; }
          .footer-top { grid-template-columns: 1fr; gap: 2rem; }
          .contact-links { grid-template-columns: repeat(3,1fr); }
          .section-header { flex-direction: column; align-items: flex-start; gap: 0.5rem; }
          .form-row { grid-template-columns: 1fr; }
          .cta-banner-actions { flex-direction: column; align-items: center; }
        }
      `}</style>

      <div className="min-h-screen" style={{ background: 'var(--surface)' }}>

        {/* ANNOUNCEMENT BAR */}
        <div className="announcement-bar">
          🎉 Free site visit & consultation across Nairobi
          <a href="#" onClick={(e) => { e.preventDefault(); setSelectedService(''); setShowContact(true); }}>Book yours →</a>
        </div>

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
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <Link href="/cart">
                <button className="cart-icon-btn">
                  🛒
                  {cartCount > 0 && <span className="cart-count">{cartCount}</span>}
                </button>
              </Link>
              <button className="btn-cta" onClick={() => setShowContact(true)}>
                Get a Quote
              </button>
            </div>
          </div>
        </header>

        {/* MODAL */}
        {showContact && (
          <div className="modal-backdrop" onClick={(e) => { if (e.target === e.currentTarget) setShowContact(false); }}>
            <div className="modal">
              <div className="modal-header">
                <div className="modal-header-text">
                  <div className="modal-eyebrow">Contact Us</div>
                  <h2 className="modal-title">Send an Inquiry</h2>
                </div>
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
                  <div className="form-row">
                    <div className="form-group">
                      <label className="form-label">Your Name <span className="form-req">*</span></label>
                      <input type="text" required className="form-input"
                        placeholder="Full name"
                        value={inquiryForm.name}
                        onChange={(e) => setInquiryForm({ ...inquiryForm, name: e.target.value })} />
                    </div>
                    <div className="form-group">
                      <label className="form-label">Phone <span className="form-req">*</span></label>
                      <input type="tel" required className="form-input"
                        placeholder="07XX XXX XXX"
                        value={inquiryForm.phone}
                        onChange={(e) => setInquiryForm({ ...inquiryForm, phone: e.target.value })} />
                    </div>
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
                      placeholder="Tell us about your project — location, size, and timeline..."
                      value={inquiryForm.message}
                      onChange={(e) => setInquiryForm({ ...inquiryForm, message: e.target.value })} />
                  </div>
                  <button type="submit" className="btn-submit" disabled={submitting}>
                    {submitting ? 'Submitting…' : <>Submit Inquiry <span>→</span></>}
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
          <video autoPlay loop muted playsInline className="hero-video">
            <source src="/images/video1.mp4" type="video/mp4" />
          </video>
          <div className="hero-inner">
            <div>
              <div className="hero-eyebrow">Nairobi, Kenya </div>
              <h1 className="hero-title">
                <em>Outdoor Structures</em><br />
                Built to Last
              </h1>
              <p className="hero-desc">
                From elegant car shades and bespoke gazebos to architectural pagolas and automated security gates — we design, fabricate, and install with uncompromising quality across Kenya.
              </p>
           
              <div className="hero-actions">
                <button className="btn-primary" onClick={() => { setSelectedService(''); setShowContact(true); }}>
                  Request Free Quote <span></span>
                </button>
                <button className="btn-outline" onClick={() => document.querySelector('.filter-bar')?.scrollIntoView({ behavior: 'smooth' })}>
                  Browse Services
                </button>
              </div>
            </div>
            {/* <div className="hero-stats">
              {stats.map(s => (
                <div key={s.label} className="stat-card">
                  <div className="stat-value">{s.value}</div>
                  <div className="stat-label">{s.label}</div>
                </div>
              ))}
            </div> */}
          </div>
        </section>

        {/* TICKER */}
        <div className="ticker-wrap">
          <div className="ticker-inner">
            {[...Array(2)].map((_, i) => (
              <span key={i} style={{ display: 'inline-flex', alignItems: 'center' }}>
                {['Car Shades', 'Gazebos', 'Pagolas', 'Security Gates', 'Commercial Structures', 'Residential Projects', 'Automated Gates', 'Custom Designs', 'Nairobi · Mombasa · Kisumu'].map((item, j) => (
                  <span key={j} className="ticker-item">
                    {item}
                    <span className="ticker-dot" />
                  </span>
                ))}
              </span>
            ))}
          </div>
        </div>

        {/* CATEGORY SHOWCASE */}
        <section className="category-showcase">
          <div className="cs-inner">
            <div className="cs-header">
              <div>
                <div className="section-eyebrow">What We Offer</div>
                <h2 className="section-title-lg">
                  Structures for Every<br /><em>Space & Purpose</em>
                </h2>
              </div>
              <p style={{ maxWidth: '340px', fontSize: '0.9rem', color: 'var(--slate-mid)', lineHeight: 1.7, textAlign: 'right' }}>
                All structures are custom-fabricated in our workshop using premium grade steel, aluminium, and treated timber.
              </p>
            </div>
            <div className="cs-grid">
              {[
                { id: 'shades', label: 'Car Shades', count: '4 products', color: '#2d3448', image: '/images/image1.jpeg' },
                { id: 'gazebo', label: 'Gazebos', count: '3 products', color: '#3a4a3a', image: '/images/image2.jpeg' },
                { id: 'pagola', label: 'Pagolas', count: '3 products', color: '#4a3a2d', image: '/images/image3.jpeg' },
                { id: 'gates', label: 'Security Gates', count: '2 products', color: '#1c2030', image: '/images/image8.jpeg' },
              ].map(cat => (
                <div
                  key={cat.id}
                  className="cs-card"
                  style={{ 
                    background: `linear-gradient(160deg, ${cat.color} 0%, #0f1117 100%)`,
                    backgroundImage: `url(${cat.image})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center'
                  }}
                  onClick={() => { setSelectedCategory(cat.id); document.querySelector('.filter-bar')?.scrollIntoView({ behavior: 'smooth' }); }}
                >
                  <div className="cs-card-bg" />
                  <div className="cs-card-arrow">↗</div>
                  <div className="cs-card-content">
                    <div className="cs-card-name">{cat.label}</div>
                    <div className="cs-card-count">{cat.count}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* SEARCH & FILTER */}
        <div className="filter-bar">
          <div className="filter-inner">
            <div className="search-wrap">
              <span className="search-icon">🔍</span>
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
          <div>
            <div style={{ fontSize: '0.7rem', fontWeight: 600, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--gold-dim)', marginBottom: '0.3rem' }}>Our Products</div>
            <h2 className="section-title font-display">All Services</h2>
          </div>
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
            <div className="empty-icon">◈</div>
            <p className="empty-text">No services match your search</p>
          </div>
        ) : (
          <div className="services-grid">
            {filteredServices.map(service => (
              <div key={service._id} className="service-card">
                <div className="card-image">
                  {service.image && (service.image.startsWith('/images/') || service.image.startsWith('data:image')) ? (
                    <>
                      {service.image.startsWith('data:image') ? (
                        <img src={service.image} alt={service.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                      ) : (
                        <Image src={service.image} alt={service.name} fill
                          className="object-cover" sizes="(max-width:640px) 100vw, (max-width:1024px) 50vw, 25vw" />
                      )}
                      <div className="card-image-overlay" />
                    </>
                  ) : (
                    <div className="card-placeholder">
                      <span className="card-placeholder-icon">{categoryIcon(service.category)}</span>
                      <span className="card-placeholder-text">{service.category}</span>
                    </div>
                  )}
                  <span className="card-category-badge">{service.category}</span>
                  <div className="card-wishlist">♡</div>
                </div>
                <div className="card-body">
                  <div className="card-meta">{service.category}</div>
                  <h3 className="card-title">{service.name}</h3>
                  <p className="card-desc">{service.description}</p>
                  <div className="card-footer">
                    <div className="card-price-wrap">
                      <div className="card-price-from">Starting from</div>
                      <div className="card-price">{service.price}</div>
                    </div>
                    <div className="card-actions">
                      <button className="btn-inquire" onClick={() => handleInquiry(service.name)}>
                        Inquire
                      </button>
                      <button className="btn-add-cart" onClick={() => {
                        addToCart({
                          _id: service._id,
                          name: service.name,
                          price: service.price,
                          category: service.category,
                          image: service.image
                        });
                        alert(`${service.name} added to cart!`);
                      }}>
                        Add to Cart
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* PROCESS SECTION */}
        <section className="process-section">
          <div className="process-inner">
            <div className="process-header">
              <div className="section-eyebrow" style={{ justifyContent: 'center', marginBottom: '0.75rem' }}>How It Works</div>
              <h2 className="section-title-lg" style={{ textAlign: 'center' }}>
                From Idea to <em>Installation</em>
              </h2>
              <p style={{ textAlign: 'center', maxWidth: '500px', margin: '1rem auto 0', fontSize: '0.9rem', color: 'var(--slate-mid)', lineHeight: 1.7 }}>
                Our streamlined process ensures every project is delivered on time, within budget, and built to exceed your expectations.
              </p>
            </div>
            <div className="process-grid">
              <div className="process-connector" />
              {processSteps.map((step) => (
                <div key={step.num} className="process-step">
                  <div className="process-num-wrap">
                    <span className="process-num">{step.num}</span>
                  </div>
                  <div className="process-title">{step.title}</div>
                  <p className="process-desc">{step.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* WHY CHOOSE US */}
        <section className="why-strip">
          <div style={{ maxWidth: '1280px', margin: '0 auto 2.5rem', padding: '0 2rem' }}>
            <div className="section-eyebrow">Why Choose Us</div>
            <h2 className="section-title-lg">The Vincevic <em>Difference</em></h2>
          </div>
          <div className="why-inner">
            {[
              {  title: 'In-House Fabrication', desc: 'We design and fabricate every structure ourselves, giving full quality control and faster turnarounds.' },
              {  title: 'Weather-Resistant', desc: 'All our structures are treated and coated to withstand Kenya\'s varying weather conditions year-round.' },
              {  title: 'Custom to Your Space', desc: 'No two projects are the same. We tailor every dimension and material to your specific site requirements.' },
              {  title: 'After-Sales Support', desc: 'We provide maintenance services and structural checks long after installation to keep everything perfect.' },
              {  title: 'Nationwide Coverage', desc: 'Our installation teams cover all 47 counties in Kenya — no project is too far for our crew.' },
              {  title: 'Transparent Pricing', desc: 'No hidden costs. You receive a detailed quote upfront before any commitment is made.' },
            ].map(item => (
              <div key={item.title} className="why-item">
                <div>
                  <div className="why-text-title">{item.title}</div>
                  <p className="why-text-desc">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* TESTIMONIALS */}
        {/* <section className="testimonials-section">
          <div className="testimonials-inner">
            <div className="testimonials-label">Client Testimonials</div>
            <div className="testimonial-item">
              <p className="testimonial-text">"{testimonials[activeTestimonial].text}"</p>
              <div className="testimonial-author">
                <span className="testimonial-name">{testimonials[activeTestimonial].name}</span>
                <span className="testimonial-role">{testimonials[activeTestimonial].role}</span>
              </div>
            </div>
            <div className="testimonial-dots">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  className={`testimonial-dot ${i === activeTestimonial ? 'active' : ''}`}
                  onClick={() => setActiveTestimonial(i)}
                />
              ))}
            </div>
          </div>
        </section> */}

        {/* CTA BANNER */}
        <section className="cta-banner">
          <div className="cta-banner-inner">
            <h2 className="cta-banner-title">Ready to Transform Your Outdoor Space?</h2>
            <p className="cta-banner-desc">
              Get a free site visit and no-obligation quote from our team. We serve all locations across Kenya.
            </p>
            <div className="cta-banner-actions">
              <button className="btn-dark" onClick={() => { setSelectedService(''); setShowContact(true); }}>
                Get Your Free Quote 
              </button>
              <a href="tel:0720120616" className="btn-dark-outline">
                 Call 0720 120 616
              </a>
            </div>
          </div>
        </section>

        {/* FOOTER */}
        <footer className="footer">
          <div className="footer-inner">
            <div className="footer-top">
              <div>
                <div className="footer-brand-name">VINCEVIC SHADES</div>
                <div className="footer-brand-sub">Enterprises</div>
                <p className="footer-brand-desc">
                  Your trusted partner for quality outdoor structures across Kenya. Craftsmanship, durability, and design excellence in every project since 2012.
                </p>
                <div className="footer-social">
                  <a href="#" className="footer-social-link">f</a>
                  <a href="#" className="footer-social-link">in</a>
                  <a href="https://wa.me/254720120616" target="_blank" rel="noopener noreferrer" className="footer-social-link">w</a>
                </div>
              </div>
              <div className="footer-col">
                <div className="footer-col-title">Quick Links</div>
                <ul>
                  <li><Link href="/">Home</Link></li>
                  <li><Link href="/services">Services</Link></li>
                  <li><Link href="/portfolio">Portfolio</Link></li>
                  <li><Link href="/about">About Us</Link></li>
                  <li><Link href="/contact">Contact</Link></li>
                </ul>
              </div>
              <div className="footer-col">
                <div className="footer-col-title">Services</div>
                <ul>
                  <li>Car Shades & Covers</li>
                  <li>Garden Gazebos</li>
                  <li>Decorative Pagolas</li>
                  <li>Automated Gates</li>
                  <li>Commercial Structures</li>
                </ul>
              </div>
              <div className="footer-col">
                <div className="footer-col-title">Contact</div>
                <ul>
                  <li>📞 0720 120 616</li>
                  <li>📱 0716 632 889</li>
                  <li>💬 WhatsApp Available</li>
                  <li>🕒 Mon–Fri: 8AM–6PM</li>
                  <li>🕒 Sat: 9AM–5PM</li>
                </ul>
              </div>
            </div>
            <div className="footer-bottom">
              <span className="footer-copy">© 2026 Vincevic Shades Enterprises. All rights reserved.</span>
              <div className="footer-legal">
                <a href="#">Privacy Policy</a>
                <a href="#">Terms of Service</a>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}