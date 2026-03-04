'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useCart } from '@/lib/CartContext';

const categories = [
  { id: 'all', name: 'All Services', icon: '◈' },
  { id: 'shades', name: 'Car Shades', icon: '⬡' },
  { id: 'gazebo', name: 'Gazebos', icon: '◎' },
  { id: 'pagola', name: 'Pagolas', icon: '▲' },
  { id: 'gates', name: 'Gates', icon: '◫' },
];

const SORT_OPTIONS = [
  { id: 'default', label: 'Default' },
  { id: 'price_asc', label: 'Price: Low → High' },
  { id: 'price_desc', label: 'Price: High → Low' },
  { id: 'popular', label: 'Most Popular' },
];

const TRUST_ITEMS = [
  { icon: '✓', text: 'Verified Provider', color: '#16a34a' },
  { icon: '🔒', text: 'Secure Platform', color: '#1d4ed8' },
  { icon: '🚚', text: 'Nationwide Install', color: '#d97706' },
  { icon: '⭐', text: 'Rated 4.8/5', color: '#7c3aed' },
];

const defaultServices = [
  { _id: '1', name: 'Premium Car Shade', category: 'shades', price: 'KSh 45,000', priceNum: 45000, image: '/images/image1.jpeg', description: 'Durable UV-protected parking shade with modern curved design. Galvanized steel posts with powder-coated finish.', rating: 4.8, reviews: 24, views: 342, badge: 'BESTSELLER', negotiable: false },
  { _id: '2', name: 'Luxury Stone Pillar Gazebo', category: 'gazebo', price: 'KSh 150,000', priceNum: 150000, image: '/images/image2.jpeg', description: 'Premium gazebo with stone pillars, perfect for outdoor entertainment and events.', rating: 5.0, reviews: 18, views: 289, badge: 'TOP RATED', negotiable: true },
  { _id: '3', name: 'Modern Wooden Pagola', category: 'pagola', price: 'KSh 75,000', priceNum: 75000, image: '/images/image3.jpeg', description: 'Contemporary wooden pagola with sleek design for entrance or patio coverage.', rating: 4.7, reviews: 12, views: 156, badge: null, negotiable: true },
  { _id: '4', name: 'Industrial Cantilever Shade', category: 'shades', price: 'KSh 95,000', priceNum: 95000, image: '/images/image4.jpeg', description: 'Heavy-duty cantilever shade structure ideal for commercial and residential spaces. No center post.', rating: 4.9, reviews: 31, views: 421, badge: 'POPULAR', negotiable: false },
  { _id: '5', name: 'Residential Patio Shade', category: 'shades', price: 'KSh 55,000', priceNum: 55000, image: '/images/image5.jpeg', description: 'Weather-resistant patio shade cover with elegant design for home gardens and terraces.', rating: 4.6, reviews: 9, views: 98, badge: null, negotiable: true },
  { _id: '6', name: 'Garden Gazebo Deluxe', category: 'gazebo', price: 'KSh 120,000', priceNum: 120000, image: '/images/image6.jpeg', description: 'Spacious garden gazebo perfect for relaxation and outdoor gatherings. Includes built-in seating frame.', rating: 4.8, reviews: 15, views: 203, badge: null, negotiable: true },
  { _id: '7', name: 'Entrance Pagola Arch', category: 'pagola', price: 'KSh 65,000', priceNum: 65000, image: '/images/image7.jpeg', description: 'Elegant entrance pagola with modern architectural design. Creates a stunning first impression.', rating: 4.5, reviews: 7, views: 87, badge: null, negotiable: false },
  { _id: '8', name: 'Automated Sliding Gate', category: 'gates', price: 'KSh 120,000', priceNum: 120000, image: '/images/image8.jpeg', description: 'Full automation with remote control, GSM module and security features. Works with solar backup.', rating: 4.9, reviews: 27, views: 512, badge: 'FEATURED', negotiable: false },
  { _id: '9', name: 'Commercial Shade Structure', category: 'shades', price: 'KSh 85,000', priceNum: 85000, image: '/images/image9.jpeg', description: 'Large commercial-grade shade structure for parking or outdoor dining. Can cover 8+ vehicles.', rating: 4.7, reviews: 19, views: 267, badge: null, negotiable: true },
  { _id: '10', name: 'Premium Event Gazebo', category: 'gazebo', price: 'KSh 180,000', priceNum: 180000, image: '/images/image10.jpeg', description: 'Premium event gazebo with luxury finishes and spacious design. Perfect for wedding venues and hotels.', rating: 5.0, reviews: 11, views: 445, badge: 'LUXURY', negotiable: true },
  { _id: '11', name: 'Decorative Garden Pagola', category: 'pagola', price: 'KSh 70,000', priceNum: 70000, image: '/images/image11.jpeg', description: 'Decorative pagola perfect for garden pathways and entrances. Climbing plant friendly design.', rating: 4.4, reviews: 6, views: 73, badge: null, negotiable: true },
  { _id: '12', name: 'Security Gate System', category: 'gates', price: 'KSh 150,000', priceNum: 150000, image: '/images/image12.jpeg', description: 'Complete security gate system with automation, access control, intercom and CCTV integration.', rating: 4.8, reviews: 22, views: 334, badge: 'SECURE', negotiable: false },
];

const Stars = ({ rating }: { rating: number }) => (
  <span style={{ color: '#f59e0b', fontSize: '0.78rem', letterSpacing: '-1px' }}>
    {'★'.repeat(Math.floor(rating))}{'☆'.repeat(5 - Math.floor(rating))}
  </span>
);

const categoryIcon = (cat: string) => ({ shades: '⬡', gazebo: '◎', pagola: '▲', gates: '◫' } as Record<string, string>)[cat] || '◈';

export default function ServicesPage() {
  const { addToCart, cartCount } = useCart();
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [services, setServices] = useState(defaultServices);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState('');
  const [sort, setSort] = useState('default');
  const [viewMode, setViewMode] = useState('grid');
  const [priceMax, setPriceMax] = useState('');
  const [savedItems, setSavedItems] = useState<Set<string>>(new Set());
  const [selectedService, setSelectedService] = useState<any>(null);
  const [showInquiry, setShowInquiry] = useState(false);
  const [inquiryStep, setInquiryStep] = useState(1);
  const [form, setForm] = useState({ name: '', phone: '', email: '', message: '' });
  const [submitting, setSubmitting] = useState(false);
  const [toast, setToast] = useState<string | null>(null);
  const [filterOpen, setFilterOpen] = useState(false);

  useEffect(() => { fetchServices(); }, []);

  const fetchServices = async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/services');
      const data = await res.json();
      if (data.success && data.data.length > 0) setServices(data.data);
    } catch (e) { console.error(e); }
    finally { setLoading(false); }
  };

  const showToast = (msg: string) => { setToast(msg); setTimeout(() => setToast(null), 3000); };

  const toggleSave = (id: string) => {
    setSavedItems(prev => {
      const next = new Set(prev);
      if (next.has(id)) { next.delete(id); showToast('Removed from saved'); }
      else { next.add(id); showToast('❤️ Saved to wishlist'); }
      return next;
    });
  };

  const openInquiry = (service: any) => {
    setSelectedService(service);
    setShowInquiry(true);
    setInquiryStep(1);
    setForm({ name: '', phone: '', email: '', message: '' });
  };

  const submitInquiry = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const res = await fetch('/api/inquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, serviceName: selectedService?.name }),
      });
      const data = await res.json();
      if (data.success) setInquiryStep(3);
      else showToast('Failed to submit. Please try again.');
    } catch {
      setInquiryStep(3); // optimistic
    } finally { setSubmitting(false); }
  };

  const filtered = services
    .filter(s => {
      if (selectedCategory !== 'all' && s.category !== selectedCategory) return false;
      if (search && !s.name.toLowerCase().includes(search.toLowerCase()) && !s.description.toLowerCase().includes(search.toLowerCase())) return false;
      if (priceMax && s.priceNum && s.priceNum > parseInt(priceMax)) return false;
      return true;
    })
    .sort((a, b) => {
      if (sort === 'price_asc') return (a.priceNum || 0) - (b.priceNum || 0);
      if (sort === 'price_desc') return (b.priceNum || 0) - (a.priceNum || 0);
      if (sort === 'popular') return (b.views || 0) - (a.views || 0);
      return 0;
    });

  const getBadgeStyle = (badge: string) => {
    const styles: Record<string, { background: string; color: string }> = {
      'BESTSELLER': { background: '#ef4444', color: '#fff' },
      'TOP RATED': { background: '#16a34a', color: '#fff' },
      'POPULAR': { background: '#3b82f6', color: '#fff' },
      'FEATURED': { background: '#c9a84c', color: '#0f1117' },
      'LUXURY': { background: '#7c3aed', color: '#fff' },
      'SECURE': { background: '#1d4ed8', color: '#fff' },
    };
    return styles[badge] || { background: '#c9a84c', color: '#0f1117' };
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&family=Instrument+Serif:ital@0;1&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; }
        body { font-family: 'Plus Jakarta Sans', sans-serif; background: #f5f4f0; color: #1a1a1a; -webkit-font-smoothing: antialiased; }

        :root {
          --brand: #0f1117; --gold: #c9a84c; --gold-light: #e4c97a;
          --gold-pale: #fdf8ee; --green: #16a34a;
          --surface: #f5f4f0; --white: #fff;
          --border: #e5e3de; --muted: #78716c;
          --shadow-sm: 0 1px 3px rgba(0,0,0,.07), 0 1px 2px rgba(0,0,0,.05);
          --shadow-md: 0 4px 16px rgba(0,0,0,.1), 0 2px 6px rgba(0,0,0,.06);
          --shadow-lg: 0 16px 48px rgba(0,0,0,.15);
          --radius: 12px;
        }
        ::-webkit-scrollbar { width: 5px; height: 5px; }
        ::-webkit-scrollbar-track { background: var(--surface); }
        ::-webkit-scrollbar-thumb { background: #d4c9b8; border-radius: 3px; }

        /* ── HEADER ── */
        .sv-header {
          position: sticky; top: 0; z-index: 100;
          background: rgba(15,17,23,0.97);
          backdrop-filter: blur(14px);
          border-bottom: 1px solid rgba(201,168,76,0.13);
        }
        .sv-header-inner {
          max-width: 1400px; margin: 0 auto;
          padding: 0 1.5rem; height: 64px;
          display: flex; align-items: center; gap: 1.5rem;
        }
        .sv-logo { display: flex; flex-direction: column; gap: 1px; text-decoration: none; flex-shrink: 0; }
        .sv-logo-name {
          font-family: 'Instrument Serif', serif;
          font-size: 1.25rem; color: #fff; line-height: 1;
        }
        .sv-logo-sub {
          font-size: .55rem; font-weight: 700; color: var(--gold);
          letter-spacing: .25em; text-transform: uppercase;
        }
        .sv-nav { display: flex; align-items: center; gap: 0; margin-left: 1rem; }
        .sv-nav a {
          font-size: .8rem; font-weight: 600; color: rgba(255,255,255,.55);
          text-decoration: none; padding: .35rem .75rem; border-radius: 5px;
          letter-spacing: .04em; text-transform: uppercase; transition: color .2s;
        }
        .sv-nav a:hover, .sv-nav a.active { color: var(--gold-light); }
        .sv-header-right { margin-left: auto; display: flex; align-items: center; gap: .65rem; }
        .sv-cart-btn {
          position: relative;
          background: rgba(255,255,255,.07);
          border: 1px solid rgba(255,255,255,.12);
          color: rgba(255,255,255,.8);
          cursor: pointer; padding: .45rem .9rem;
          border-radius: 7px;
          font-family: 'Plus Jakarta Sans', sans-serif;
          font-size: .8rem; font-weight: 700;
          transition: all .2s;
          display: flex; align-items: center; gap: .4rem;
          text-decoration: none;
        }
        .sv-cart-btn:hover { background: rgba(255,255,255,.13); color: var(--gold-light); }
        .cart-badge {
          background: var(--gold); color: var(--brand, #0f1117);
          font-size: .62rem; font-weight: 800;
          min-width: 17px; height: 17px; border-radius: 100px;
          display: flex; align-items: center; justify-content: center; padding: 0 3px;
        }
        .sv-quote-btn {
          background: linear-gradient(135deg, var(--gold) 0%, #8a6f34 100%);
          color: #0f1117; border: none; cursor: pointer;
          padding: .5rem 1.25rem; border-radius: 7px;
          font-family: 'Plus Jakarta Sans', sans-serif;
          font-size: .8rem; font-weight: 800;
          transition: all .2s; white-space: nowrap;
        }
        .sv-quote-btn:hover { transform: translateY(-1px); box-shadow: 0 4px 16px rgba(201,168,76,.4); }

        /* ── PAGE HERO ── */
        .sv-hero {
          background: linear-gradient(135deg, #0f1117 0%, #1c2030 60%, #2d3448 100%);
          padding: 3.5rem 1.5rem 4rem;
          position: relative; overflow: hidden;
          text-align: center;
        }
        .sv-hero::before {
          content: '';
          position: absolute; inset: 0;
          background-image: radial-gradient(rgba(201,168,76,.05) 1px, transparent 1px);
          background-size: 28px 28px;
        }
        .sv-hero-inner { position: relative; z-index: 1; max-width: 760px; margin: 0 auto; }
        .sv-hero-eyebrow {
          display: inline-flex; align-items: center; gap: .5rem;
          font-size: .72rem; font-weight: 700; letter-spacing: .22em;
          text-transform: uppercase; color: var(--gold);
          margin-bottom: 1rem;
        }
        .sv-hero-eyebrow::before, .sv-hero-eyebrow::after {
          content: ''; width: 22px; height: 1px; background: var(--gold); opacity: .6;
        }
        .sv-hero-title {
          font-family: 'Instrument Serif', serif;
          font-size: clamp(2rem, 5vw, 3rem);
          color: #fff; margin-bottom: .65rem; line-height: 1.12;
        }
        .sv-hero-title em { color: var(--gold-light); font-style: italic; }
        .sv-hero-sub {
          font-size: .95rem; color: rgba(255,255,255,.5);
          max-width: 560px; margin: 0 auto 1.75rem; line-height: 1.7;
        }

        /* Search */
        .sv-search-box {
          display: flex; gap: .5rem;
          background: var(--white);
          border-radius: 12px; padding: .4rem .4rem .4rem .4rem;
          box-shadow: 0 8px 32px rgba(0,0,0,.25);
          max-width: 620px; margin: 0 auto 1.5rem;
        }
        .sv-search-input {
          flex: 1; border: none; outline: none; padding: .6rem .85rem;
          font-family: 'Plus Jakarta Sans', sans-serif;
          font-size: .9rem; color: #1a1a1a; background: transparent;
        }
        .sv-search-input::placeholder { color: #a8a29e; }
        .sv-search-btn {
          background: var(--gold); color: #0f1117;
          border: none; cursor: pointer; padding: .65rem 1.5rem;
          border-radius: 9px; font-family: 'Plus Jakarta Sans', sans-serif;
          font-size: .85rem; font-weight: 800; transition: all .2s;
          display: flex; align-items: center; gap: .35rem;
        }
        .sv-search-btn:hover { background: var(--gold-light); transform: translateY(-1px); }

        /* Trust */
        .sv-trust-row { display: flex; gap: .6rem; justify-content: center; flex-wrap: wrap; }
        .sv-trust-badge {
          display: flex; align-items: center; gap: .35rem;
          background: rgba(255,255,255,.07);
          border: 1px solid rgba(255,255,255,.1);
          border-radius: 100px; padding: .3rem .85rem;
          font-size: .73rem; font-weight: 600; color: rgba(255,255,255,.65);
        }

        /* ── CATEGORY PILLS ── */
        .sv-cat-bar {
          background: var(--white);
          border-bottom: 1px solid var(--border);
          overflow-x: auto; -webkit-overflow-scrolling: touch;
          position: sticky; top: 64px; z-index: 90;
        }
        .sv-cat-bar::-webkit-scrollbar { height: 0; }
        .sv-cat-inner {
          max-width: 1400px; margin: 0 auto;
          padding: .7rem 1.5rem;
          display: flex; gap: .45rem; min-width: max-content;
        }
        .sv-cat-pill {
          display: flex; align-items: center; gap: .4rem;
          padding: .5rem 1.05rem; border-radius: 100px;
          font-family: 'Plus Jakarta Sans', sans-serif;
          font-size: .8rem; font-weight: 700;
          cursor: pointer; border: 1.5px solid var(--border);
          background: transparent; color: var(--muted);
          transition: all .2s; white-space: nowrap;
        }
        .sv-cat-pill:hover { border-color: #0f1117; color: #0f1117; }
        .sv-cat-pill.active { background: #0f1117; color: #fff; border-color: #0f1117; }
        .sv-cat-pill .sv-count {
          font-size: .68rem; padding: .1rem .38rem;
          border-radius: 100px; background: rgba(0,0,0,.08);
        }
        .sv-cat-pill.active .sv-count { background: rgba(255,255,255,.2); }

        /* ── TOOLBAR ── */
        .sv-toolbar {
          max-width: 1400px; margin: 0 auto;
          padding: .9rem 1.5rem;
          display: flex; align-items: center; justify-content: space-between; gap: .75rem;
          flex-wrap: wrap;
        }
        .sv-results-label { font-size: .85rem; color: var(--muted); }
        .sv-results-label strong { color: #0f1117; font-weight: 800; }
        .sv-toolbar-right { display: flex; gap: .5rem; align-items: center; }
        .sv-sort {
          padding: .5rem .85rem; border: 1.5px solid var(--border);
          border-radius: 8px; font-family: 'Plus Jakarta Sans', sans-serif;
          font-size: .8rem; font-weight: 700; color: #0f1117;
          background: var(--white); cursor: pointer; outline: none;
          transition: border-color .2s;
        }
        .sv-sort:focus { border-color: var(--gold); }
        .sv-view-btn {
          padding: .5rem .6rem; border: 1.5px solid var(--border);
          border-radius: 8px; background: transparent; cursor: pointer;
          font-size: .88rem; color: var(--muted); transition: all .2s;
        }
        .sv-view-btn.active { background: #0f1117; color: #fff; border-color: #0f1117; }
        .sv-filter-btn {
          display: flex; align-items: center; gap: .35rem;
          padding: .5rem .95rem; border: 1.5px solid var(--border);
          border-radius: 8px; background: var(--white);
          font-family: 'Plus Jakarta Sans', sans-serif;
          font-size: .8rem; font-weight: 700; color: #0f1117;
          cursor: pointer; transition: all .2s;
        }
        .sv-filter-btn.open { background: #0f1117; color: #fff; border-color: #0f1117; }

        /* ── FILTER PANEL ── */
        .sv-filter-panel {
          background: var(--white); border-bottom: 1px solid var(--border);
          overflow: hidden; max-height: 0;
          transition: max-height .32s ease;
        }
        .sv-filter-panel.open { max-height: 200px; }
        .sv-filter-inner {
          max-width: 1400px; margin: 0 auto;
          padding: 1.1rem 1.5rem 1.4rem;
          display: flex; gap: 1.25rem; flex-wrap: wrap; align-items: flex-end;
        }
        .sv-fgroup { display: flex; flex-direction: column; gap: .35rem; }
        .sv-flabel {
          font-size: .72rem; font-weight: 800; text-transform: uppercase;
          letter-spacing: .07em; color: var(--muted);
        }
        .sv-finput {
          padding: .55rem .85rem; border: 1.5px solid var(--border);
          border-radius: 8px; font-family: 'Plus Jakarta Sans', sans-serif;
          font-size: .85rem; color: #0f1117;
          background: var(--surface); outline: none;
          transition: border-color .2s; min-width: 150px;
        }
        .sv-finput:focus { border-color: var(--gold); background: var(--white); }
        .sv-clear-btn {
          padding: .55rem 1.1rem; border: 1.5px solid #fca5a5;
          border-radius: 8px; background: #fff5f5;
          font-family: 'Plus Jakarta Sans', sans-serif;
          font-size: .8rem; font-weight: 700; color: #dc2626;
          cursor: pointer; transition: all .2s;
        }
        .sv-clear-btn:hover { background: #fee2e2; }

        /* ── MAIN ── */
        .sv-main { max-width: 1400px; margin: 0 auto; padding: 1.5rem 1.5rem 5rem; }

        /* ── GRID ── */
        .sv-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(285px, 1fr));
          gap: 1.25rem;
        }
        .sv-grid.list-mode { grid-template-columns: 1fr; }

        /* ── SERVICE CARD ── */
        .sv-card {
          background: var(--white);
          border-radius: var(--radius);
          border: 1px solid var(--border);
          box-shadow: var(--shadow-sm);
          overflow: hidden;
          transition: transform .25s cubic-bezier(.25,.8,.25,1), box-shadow .25s, border-color .25s;
          cursor: pointer;
          position: relative;
          display: flex; flex-direction: column;
        }
        .sv-card:hover {
          transform: translateY(-5px);
          box-shadow: var(--shadow-md);
          border-color: rgba(201,168,76,.35);
        }
        .sv-card.list-mode {
          flex-direction: row; min-height: 170px;
        }

        /* badge */
        .sv-badge {
          position: absolute; top: 10px; left: 10px; z-index: 2;
          font-size: .63rem; font-weight: 800; letter-spacing: .07em;
          padding: .22rem .6rem; border-radius: 5px; text-transform: uppercase;
        }
        /* save */
        .sv-save {
          position: absolute; top: 10px; right: 10px; z-index: 3;
          width: 31px; height: 31px;
          background: rgba(255,255,255,.9); border: none; border-radius: 50%;
          display: flex; align-items: center; justify-content: center;
          cursor: pointer; font-size: .95rem;
          box-shadow: 0 2px 8px rgba(0,0,0,.12);
          transition: transform .2s, background .2s;
        }
        .sv-save:hover { transform: scale(1.12); background: #fff; }

        /* img */
        .sv-card-img {
          aspect-ratio: 16/11; position: relative; overflow: hidden;
          background: linear-gradient(135deg, #e8e5df, #d4d0c8);
          flex-shrink: 0;
        }
        .sv-card.list-mode .sv-card-img {
          aspect-ratio: auto; width: 220px; min-width: 220px;
        }
        .sv-card-img img { width: 100%; height: 100%; object-fit: cover; transition: transform .4s; }
        .sv-card:hover .sv-card-img img { transform: scale(1.04); }
        .sv-card-img-ph {
          width: 100%; height: 100%;
          display: flex; flex-direction: column;
          align-items: center; justify-content: center; gap: .3rem;
        }
        .sv-card-img-ph span { font-size: 2.5rem; opacity: .2; }
        .sv-card-img-ph small { font-size: .68rem; color: var(--muted); text-transform: uppercase; letter-spacing: .1em; }
        .sv-verified-badge {
          position: absolute; bottom: 8px; left: 8px;
          background: rgba(22,163,74,.88); color: #fff;
          font-size: .63rem; font-weight: 800; padding: .2rem .55rem;
          border-radius: 4px; letter-spacing: .05em;
        }

        /* body */
        .sv-card-body {
          padding: 1rem; display: flex; flex-direction: column; flex: 1;
        }
        .sv-card-loc {
          font-size: .7rem; color: var(--muted); font-weight: 600;
          display: flex; align-items: center; gap: .25rem; margin-bottom: .3rem;
        }
        .sv-card-cat {
          font-size: .67rem; font-weight: 800; text-transform: uppercase;
          letter-spacing: .1em; color: #8a6f34;
          background: var(--gold-pale); border: 1px solid rgba(201,168,76,.22);
          border-radius: 4px; padding: .15rem .45rem;
          display: inline-block; margin-bottom: .4rem;
        }
        .sv-card-title {
          font-family: 'Plus Jakarta Sans', sans-serif;
          font-size: .94rem; font-weight: 800; color: #0f1117;
          margin-bottom: .35rem; line-height: 1.3;
        }
        .sv-card-desc {
          font-size: .79rem; color: var(--muted); line-height: 1.55;
          margin-bottom: .65rem; flex: 1;
          display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden;
        }
        .sv-card.list-mode .sv-card-desc { -webkit-line-clamp: 3; }

        /* rating */
        .sv-card-rating {
          display: flex; align-items: center; gap: .4rem; margin-bottom: .55rem; flex-wrap: wrap;
        }
        .sv-rnum { font-weight: 800; font-size: .8rem; color: #0f1117; }
        .sv-rcnt { font-size: .73rem; color: var(--muted); }
        .sv-views { margin-left: auto; font-size: .7rem; color: var(--muted); }

        /* price */
        .sv-card-price-row {
          display: flex; align-items: flex-end; gap: .5rem; margin-bottom: .75rem;
        }
        .sv-price {
          font-family: 'Instrument Serif', serif;
          font-size: 1.25rem; color: #15803d; line-height: 1;
        }
        .sv-nego {
          font-size: .68rem; font-weight: 700; background: #f0fdf4;
          border: 1px solid #bbf7d0; padding: .15rem .42rem;
          border-radius: 4px; color: #16a34a;
        }

        /* actions */
        .sv-card-actions { display: flex; gap: .45rem; margin-top: auto; }
        .sv-btn-inquire {
          flex: 1; background: #0f1117; color: var(--gold-light);
          border: none; cursor: pointer; padding: .58rem .75rem;
          border-radius: 8px; font-family: 'Plus Jakarta Sans', sans-serif;
          font-size: .75rem; font-weight: 800;
          transition: all .2s; display: flex; align-items: center; justify-content: center; gap: .3rem;
        }
        .sv-btn-inquire:hover { background: #2d3448; }
        .sv-btn-wa {
          background: #25d366; color: #fff; border: none; cursor: pointer;
          padding: .58rem .85rem; border-radius: 8px; font-size: .95rem;
          transition: all .2s; flex-shrink: 0;
        }
        .sv-btn-wa:hover { background: #1db954; transform: translateY(-1px); }
        .sv-btn-cart {
          background: var(--gold-pale); color: #0f1117;
          border: 1.5px solid rgba(201,168,76,.35);
          cursor: pointer; padding: .58rem .75rem; border-radius: 8px;
          font-family: 'Plus Jakarta Sans', sans-serif;
          font-size: .75rem; font-weight: 800;
          transition: all .2s; flex-shrink: 0;
        }
        .sv-btn-cart:hover { background: var(--gold); border-color: var(--gold); }

        /* ── MODAL ── */
        .sv-modal-overlay {
          position: fixed; inset: 0; z-index: 200;
          background: rgba(0,0,0,.65); backdrop-filter: blur(4px);
          display: flex; align-items: flex-start; justify-content: center;
          overflow-y: auto; padding: 1rem;
        }
        .sv-modal {
          background: var(--white); border-radius: 16px;
          width: 100%; max-width: 860px; margin: auto;
          overflow: hidden; box-shadow: var(--shadow-lg);
          border: 1px solid rgba(201,168,76,.15);
        }
        .sv-modal-img {
          width: 100%; aspect-ratio: 16/7;
          position: relative; overflow: hidden;
          background: linear-gradient(135deg, #e8e5df, #d4d0c8);
        }
        .sv-modal-img img { width: 100%; height: 100%; object-fit: cover; }
        .sv-modal-img-ph {
          width: 100%; height: 100%;
          display: flex; align-items: center; justify-content: center; font-size: 5rem; opacity: .1;
        }
        .sv-modal-close {
          position: absolute; top: 12px; right: 12px; z-index: 2;
          width: 34px; height: 34px; background: rgba(255,255,255,.9);
          border: none; border-radius: 50%; display: flex; align-items: center; justify-content: center;
          font-size: .95rem; cursor: pointer; box-shadow: 0 2px 8px rgba(0,0,0,.15); transition: all .2s;
        }
        .sv-modal-close:hover { background: #fff; transform: scale(1.08); }
        .sv-modal-body { display: grid; grid-template-columns: 1fr 320px; }
        .sv-modal-left { padding: 1.6rem; border-right: 1px solid var(--border); }
        .sv-modal-right { padding: 1.6rem; }
        .sv-modal-cat {
          font-size: .68rem; font-weight: 800; text-transform: uppercase;
          letter-spacing: .1em; color: #8a6f34;
          background: var(--gold-pale); border: 1px solid rgba(201,168,76,.22);
          padding: .22rem .6rem; border-radius: 5px; display: inline-block; margin-bottom: .55rem;
        }
        .sv-modal-title {
          font-family: 'Instrument Serif', serif; font-size: 1.7rem;
          color: #0f1117; margin-bottom: .45rem; line-height: 1.15;
        }
        .sv-modal-price { font-family: 'Instrument Serif', serif; font-size: 1.9rem; color: #15803d; margin-bottom: .2rem; }
        .sv-modal-desc { font-size: .88rem; color: #57534e; line-height: 1.7; margin-bottom: 1.1rem; }
        .sv-specs-grid { display: grid; grid-template-columns: 1fr 1fr; gap: .45rem; margin-bottom: 1.1rem; }
        .sv-spec {
          display: flex; align-items: center; gap: .45rem;
          font-size: .8rem; color: #44403c;
          background: var(--surface); border: 1px solid var(--border);
          border-radius: 7px; padding: .45rem .7rem;
        }
        .sv-spec::before { content: '✓'; color: var(--green); font-weight: 900; font-size: .85rem; }
        .sv-free-visit {
          background: #fffbf0; border: 1px solid rgba(201,168,76,.22);
          border-radius: 9px; padding: .8rem .95rem; margin-top: .5rem;
        }
        .sv-free-visit-title { font-size: .72rem; font-weight: 800; color: #8a6f34; text-transform: uppercase; letter-spacing: .07em; margin-bottom: .25rem; }
        .sv-free-visit-desc { font-size: .8rem; color: var(--muted); }

        /* seller */
        .sv-seller-card {
          background: var(--surface); border: 1px solid var(--border);
          border-radius: 11px; padding: 1rem; margin-bottom: .9rem;
        }
        .sv-seller-row { display: flex; align-items: center; gap: .7rem; margin-bottom: .7rem; }
        .sv-seller-avatar {
          width: 44px; height: 44px;
          background: linear-gradient(135deg, #0f1117 0%, #2d3448 100%);
          border-radius: 50%; display: flex; align-items: center; justify-content: center;
          font-family: 'Instrument Serif', serif; font-size: 1.2rem; color: var(--gold-light); flex-shrink: 0;
        }
        .sv-seller-name { font-weight: 800; font-size: .88rem; display: flex; align-items: center; gap: .4rem; }
        .sv-verified { background: #dcfce7; color: #16a34a; font-size: .62rem; font-weight: 800; padding: .12rem .42rem; border-radius: 4px; letter-spacing: .04em; }
        .sv-seller-since { font-size: .73rem; color: var(--muted); margin-top: .1rem; }
        .sv-seller-stats { display: flex; gap: .75rem; padding-top: .7rem; border-top: 1px solid var(--border); }
        .sv-stat { text-align: center; flex: 1; }
        .sv-stat-val { font-weight: 800; font-size: .85rem; color: #0f1117; }
        .sv-stat-lbl { font-size: .62rem; color: var(--muted); text-transform: uppercase; letter-spacing: .06em; margin-top: .1rem; }

        /* inquiry steps */
        .sv-steps { display: flex; gap: .3rem; margin-bottom: .9rem; }
        .sv-step { flex: 1; height: 3px; border-radius: 2px; background: var(--border); transition: background .3s; }
        .sv-step.done { background: var(--green); }
        .sv-step.active { background: var(--gold); }

        .sv-form-label {
          display: block; font-size: .72rem; font-weight: 800;
          text-transform: uppercase; letter-spacing: .06em; color: var(--muted); margin-bottom: .32rem;
        }
        .sv-form-input, .sv-form-textarea {
          width: 100%; padding: .6rem .85rem;
          border: 1.5px solid var(--border); border-radius: 8px;
          font-family: 'Plus Jakarta Sans', sans-serif;
          font-size: .86rem; color: #0f1117; background: var(--surface); outline: none;
          transition: border-color .2s, box-shadow .2s; margin-bottom: .7rem;
        }
        .sv-form-input:focus, .sv-form-textarea:focus {
          border-color: var(--gold); box-shadow: 0 0 0 3px rgba(201,168,76,.1); background: var(--white);
        }
        .sv-form-textarea { resize: vertical; min-height: 80px; }
        .sv-form-row { display: grid; grid-template-columns: 1fr 1fr; gap: .65rem; }

        .sv-btn-full {
          width: 100%; background: #0f1117; color: var(--gold-light);
          border: none; cursor: pointer; padding: .78rem 1.5rem;
          border-radius: 9px; font-family: 'Plus Jakarta Sans', sans-serif;
          font-size: .85rem; font-weight: 800; transition: all .25s;
          display: flex; align-items: center; justify-content: center; gap: .4rem;
        }
        .sv-btn-full:hover:not(:disabled) { background: #2d3448; transform: translateY(-1px); }
        .sv-btn-full:disabled { opacity: .5; cursor: not-allowed; }
        .sv-btn-wa-full {
          width: 100%; background: #25d366; color: #fff;
          border: none; cursor: pointer; padding: .72rem 1.5rem;
          border-radius: 9px; font-family: 'Plus Jakarta Sans', sans-serif;
          font-size: .85rem; font-weight: 800; transition: all .25s;
          display: flex; align-items: center; justify-content: center; gap: .4rem;
          text-decoration: none; margin-top: .45rem;
        }
        .sv-btn-wa-full:hover { background: #1db954; transform: translateY(-1px); }
        .sv-btn-call {
          width: 100%; background: transparent;
          border: 1.5px solid var(--border); color: #0f1117;
          cursor: pointer; padding: .65rem;
          border-radius: 9px; font-family: 'Plus Jakarta Sans', sans-serif;
          font-size: .82rem; font-weight: 700; transition: all .2s;
          display: flex; align-items: center; justify-content: center; gap: .35rem;
          text-decoration: none; margin-top: .45rem;
        }
        .sv-btn-call:hover { border-color: #0f1117; background: #f5f4f0; }
        .sv-divider {
          display: flex; align-items: center; gap: .65rem; margin: .8rem 0;
          font-size: .7rem; color: var(--muted); text-transform: uppercase; letter-spacing: .08em;
        }
        .sv-divider::before, .sv-divider::after { content: ''; flex: 1; height: 1px; background: var(--border); }

        /* ── TOAST ── */
        .sv-toast {
          position: fixed; bottom: 1.5rem; left: 50%; z-index: 999;
          transform: translateX(-50%) translateY(16px);
          background: #1a1a1a; color: #fff;
          padding: .65rem 1.4rem; border-radius: 100px;
          font-size: .83rem; font-weight: 600;
          box-shadow: 0 8px 28px rgba(0,0,0,.22);
          opacity: 0; transition: all .3s; pointer-events: none; white-space: nowrap;
        }
        .sv-toast.show { opacity: 1; transform: translateX(-50%) translateY(0); }

        /* ── STICKY MOBILE ── */
        .sv-mobile-cta {
          position: fixed; bottom: 0; left: 0; right: 0; z-index: 90;
          background: #0f1117; border-top: 1px solid rgba(255,255,255,.08);
          padding: .65rem 1.25rem; display: flex; gap: .45rem;
        }
        .sv-mobile-cta a, .sv-mobile-cta button {
          flex: 1; background: var(--gold); color: #0f1117;
          border: none; cursor: pointer; padding: .65rem;
          border-radius: 8px; font-family: 'Plus Jakarta Sans', sans-serif;
          font-size: .82rem; font-weight: 800;
          text-align: center; text-decoration: none;
          display: flex; align-items: center; justify-content: center; gap: .3rem;
        }

        /* ── EMPTY ── */
        .sv-empty { padding: 5rem 2rem; text-align: center; }
        .sv-empty-icon { font-size: 3rem; opacity: .15; margin-bottom: .75rem; }
        .sv-empty-text { font-family: 'Instrument Serif', serif; font-size: 1.4rem; color: var(--muted); }

        /* ── FOOTER ── */
        .sv-footer { background: #0f1117; color: #fff; padding: 4rem 1.5rem 2rem; }
        .sv-footer-inner { max-width: 1400px; margin: 0 auto; }
        .sv-footer-grid {
          display: grid; grid-template-columns: 2fr 1fr 1fr 1fr;
          gap: 2.5rem; padding-bottom: 3rem;
          border-bottom: 1px solid rgba(255,255,255,.07);
        }
        .sv-footer-brand { font-family: 'Instrument Serif', serif; font-size: 1.35rem; color: #fff; margin-bottom: .2rem; }
        .sv-footer-brand-sub { font-size: .58rem; font-weight: 800; color: var(--gold); letter-spacing: .25em; text-transform: uppercase; margin-bottom: 1rem; }
        .sv-footer-desc { font-size: .82rem; color: rgba(255,255,255,.35); line-height: 1.7; max-width: 280px; margin-bottom: 1.25rem; }
        .sv-footer-socials { display: flex; gap: .5rem; }
        .sv-social-link {
          width: 32px; height: 32px; background: rgba(255,255,255,.05);
          border: 1px solid rgba(255,255,255,.08); border-radius: 6px;
          display: flex; align-items: center; justify-content: center;
          font-size: .85rem; text-decoration: none; color: rgba(255,255,255,.35);
          transition: all .2s;
        }
        .sv-social-link:hover { background: rgba(201,168,76,.15); border-color: rgba(201,168,76,.3); color: var(--gold-light); }
        .sv-fcol-title { font-size: .67rem; font-weight: 800; color: var(--gold); text-transform: uppercase; letter-spacing: .2em; margin-bottom: 1.25rem; }
        .sv-fcol ul { list-style: none; display: flex; flex-direction: column; gap: .65rem; }
        .sv-fcol ul li { font-size: .82rem; color: rgba(255,255,255,.38); }
        .sv-fcol ul li a { color: inherit; text-decoration: none; transition: color .2s; }
        .sv-fcol ul li:hover, .sv-fcol ul li a:hover { color: rgba(255,255,255,.7); }
        .sv-footer-bottom {
          padding-top: 1.75rem; display: flex; align-items: center;
          justify-content: space-between; flex-wrap: wrap; gap: 1rem;
        }
        .sv-footer-copy { font-size: .75rem; color: rgba(255,255,255,.18); }
        .sv-footer-legal { display: flex; gap: 1.25rem; }
        .sv-footer-legal a { font-size: .73rem; color: rgba(255,255,255,.18); text-decoration: none; transition: color .2s; }
        .sv-footer-legal a:hover { color: rgba(255,255,255,.5); }

        /* ── RESPONSIVE ── */
        @media (max-width: 900px) {
          .sv-nav { display: none; }
          .sv-modal-body { grid-template-columns: 1fr; }
          .sv-modal-right { border-top: 1px solid var(--border); }
          .sv-footer-grid { grid-template-columns: 1fr 1fr; }
        }
        @media (max-width: 640px) {
          .sv-grid { grid-template-columns: repeat(2, 1fr); gap: .75rem; }
          .sv-card-body { padding: .75rem; }
          .sv-card-title { font-size: .85rem; }
          .sv-price { font-size: 1.05rem; }
          .sv-card-actions { flex-direction: column; }
          .sv-btn-wa { display: none; }
          .sv-footer-grid { grid-template-columns: 1fr; gap: 1.75rem; }
          .sv-form-row { grid-template-columns: 1fr; }
          .sv-specs-grid { grid-template-columns: 1fr; }
          .sv-toolbar-right { display: none; }
        }
        @media (min-width: 769px) { .sv-mobile-cta { display: none; } }
      `}</style>

      {/* TOAST */}
      <div className={`sv-toast ${toast ? 'show' : ''}`}>{toast}</div>

      {/* ── HEADER ── */}
      <header className="sv-header">
        <div className="sv-header-inner">
          <Link href="/" className="sv-logo">
            <span className="sv-logo-name">Vincevic</span>
            <span className="sv-logo-sub">Shades · Kenya</span>
          </Link>
          <nav className="sv-nav">
            <Link href="/">Home</Link>
            <Link href="/services" className="active">Services</Link>
            <Link href="/portfolio">Portfolio</Link>
            <Link href="/about">About Us</Link>
            <Link href="/contact">Contact</Link>
          </nav>
          <div className="sv-header-right">
            <Link href="/cart" className="sv-cart-btn">
              🛒 Quote List
              {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
            </Link>
            <button className="sv-quote-btn" onClick={() => { setSelectedService(defaultServices[0]); setShowInquiry(true); }}>
              Get Free Quote
            </button>
          </div>
        </div>
      </header>

      {/* ── HERO ── */}
      <section className="sv-hero">
        <div className="sv-hero-inner">
          <div className="sv-hero-eyebrow">Our Services</div>
          <h1 className="sv-hero-title">
            Premium Outdoor Structures<br /><em>Built for Kenya</em>
          </h1>
          <p className="sv-hero-sub">
            Browse our full range of custom-fabricated structures — installed nationwide with a free site visit included.
          </p>
          <div className="sv-search-box">
            <input
              className="sv-search-input"
              type="text"
              placeholder="Search shades, gazebos, gates…"
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
            <button className="sv-search-btn">🔍 Search</button>
          </div>
          <div className="sv-trust-row">
            {TRUST_ITEMS.map(t => (
              <div key={t.text} className="sv-trust-badge">
                <span>{t.icon}</span> {t.text}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CATEGORIES ── */}
      <div className="sv-cat-bar">
        <div className="sv-cat-inner">
          {categories.map(cat => {
            const count = cat.id === 'all' ? services.length : services.filter(s => s.category === cat.id).length;
            return (
              <button
                key={cat.id}
                className={`sv-cat-pill ${selectedCategory === cat.id ? 'active' : ''}`}
                onClick={() => setSelectedCategory(cat.id)}
              >
                <span>{cat.icon}</span> {cat.name}
                <span className="sv-count">{count}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* ── FILTER PANEL ── */}
      <div style={{ background: '#fff', borderBottom: '1px solid var(--border)' }}>
        <div style={{ maxWidth: 1400, margin: '0 auto', padding: '0 1.5rem' }}>
          <div style={{ display: 'flex', gap: '.5rem', paddingTop: '.7rem' }}>
            <button className={`sv-filter-btn ${filterOpen ? 'open' : ''}`} onClick={() => setFilterOpen(!filterOpen)}>
              ⚡ Filters {filterOpen ? '▲' : '▼'}
            </button>
            {priceMax && (
              <button className="sv-clear-btn" onClick={() => setPriceMax('')}>Clear ✕</button>
            )}
          </div>
          <div className={`sv-filter-panel ${filterOpen ? 'open' : ''}`} style={{ background: 'transparent' }}>
            <div className="sv-filter-inner">
              <div className="sv-fgroup">
                <label className="sv-flabel">Max Price (KSh)</label>
                <input className="sv-finput" type="number" placeholder="e.g. 100000" value={priceMax} onChange={e => setPriceMax(e.target.value)} />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── TOOLBAR ── */}
      <div className="sv-toolbar">
        <span className="sv-results-label">
          Showing <strong>{filtered.length}</strong> {filtered.length === 1 ? 'service' : 'services'}
          {selectedCategory !== 'all' && <> in <strong>{categories.find(c => c.id === selectedCategory)?.name}</strong></>}
        </span>
        <div className="sv-toolbar-right">
          <select className="sv-sort" value={sort} onChange={e => setSort(e.target.value)}>
            {SORT_OPTIONS.map(o => <option key={o.id} value={o.id}>{o.label}</option>)}
          </select>
          <button className={`sv-view-btn ${viewMode === 'grid' ? 'active' : ''}`} onClick={() => setViewMode('grid')}>⊞</button>
          <button className={`sv-view-btn ${viewMode === 'list' ? 'active' : ''}`} onClick={() => setViewMode('list')}>☰</button>
        </div>
      </div>

      {/* ── LISTINGS ── */}
      <div className="sv-main">
        {loading ? (
          <div className="sv-empty">
            <div style={{ width: 36, height: 36, border: '2px solid var(--border)', borderTopColor: 'var(--gold)', borderRadius: '50%', animation: 'spin .8s linear infinite', margin: '0 auto 1rem' }} />
            <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
            <p style={{ color: 'var(--muted)', fontSize: '.9rem' }}>Loading services…</p>
          </div>
        ) : filtered.length === 0 ? (
          <div className="sv-empty">
            <div className="sv-empty-icon">◈</div>
            <p className="sv-empty-text">No services match your filters</p>
            <p style={{ fontSize: '.85rem', color: '#a8a29e', marginTop: '.35rem' }}>Try adjusting your search or category</p>
          </div>
        ) : (
          <div className={`sv-grid ${viewMode === 'list' ? 'list-mode' : ''}`}>
            {filtered.map(service => (
              <ServiceCard
                key={service._id}
                service={service}
                viewMode={viewMode}
                saved={savedItems.has(service._id)}
                onSave={() => toggleSave(service._id)}
                onOpen={() => { setSelectedService(service); setShowInquiry(true); setInquiryStep(1); }}
                onCart={() => {
                  addToCart({ _id: service._id, name: service.name, price: service.price, category: service.category, image: service.image });
                  showToast(`🛒 ${service.name} added to quote list`);
                }}
                getBadgeStyle={getBadgeStyle}
              />
            ))}
          </div>
        )}
      </div>

      {/* ── DETAIL / INQUIRY MODAL ── */}
      {showInquiry && selectedService && (
        <div className="sv-modal-overlay" onClick={e => { if (e.target === e.currentTarget) setShowInquiry(false); }}>
          <div className="sv-modal" onClick={e => e.stopPropagation()}>
            <div className="sv-modal-img">
              {selectedService.image && (selectedService.image.startsWith('/images/') || selectedService.image.startsWith('data:image')) ? (
                selectedService.image.startsWith('data:image')
                  ? <img src={selectedService.image} alt={selectedService.name} />
                  : <Image src={selectedService.image} alt={selectedService.name} fill style={{ objectFit: 'cover' }} />
              ) : (
                <div className="sv-modal-img-ph"><span>{categoryIcon(selectedService.category)}</span></div>
              )}
              <button className="sv-modal-close" onClick={() => setShowInquiry(false)}>✕</button>
              {selectedService.badge && (
                <span style={{ ...getBadgeStyle(selectedService.badge), position: 'absolute', top: 12, left: 12, fontSize: '.68rem', fontWeight: 800, padding: '.2rem .6rem', borderRadius: 5, letterSpacing: '.07em', textTransform: 'uppercase' }}>
                  {selectedService.badge}
                </span>
              )}
            </div>

            <div className="sv-modal-body">
              {/* LEFT */}
              <div className="sv-modal-left">
                <span className="sv-modal-cat">{categoryIcon(selectedService.category)} {selectedService.category}</span>
                <h2 className="sv-modal-title">{selectedService.name}</h2>

                <div style={{ display: 'flex', alignItems: 'center', gap: '.75rem', marginBottom: '.65rem', flexWrap: 'wrap' }}>
                  <Stars rating={selectedService.rating || 4.8} />
                  <span style={{ fontWeight: 800, fontSize: '.82rem' }}>{selectedService.rating || 4.8}</span>
                  <span style={{ color: 'var(--muted)', fontSize: '.78rem' }}>({selectedService.reviews || 0} reviews)</span>
                  {selectedService.views && <span style={{ color: 'var(--muted)', fontSize: '.75rem' }}>👁 {selectedService.views}</span>}
                </div>

                <div className="sv-modal-price">
                  {selectedService.price}
                  {selectedService.negotiable && (
                    <span style={{ fontSize: '.75rem', color: '#16a34a', background: '#f0fdf4', padding: '.15rem .5rem', borderRadius: 5, marginLeft: '.5rem', fontFamily: 'Plus Jakarta Sans, sans-serif', fontWeight: 700 }}>Negotiable</span>
                  )}
                </div>

                <p className="sv-modal-desc" style={{ marginTop: '.65rem' }}>{selectedService.description}</p>

                <div style={{ fontWeight: 800, fontSize: '.75rem', textTransform: 'uppercase', letterSpacing: '.07em', color: 'var(--muted)', marginBottom: '.45rem' }}>Key Features</div>
                <div className="sv-specs-grid">
                  {['Custom fabrication', 'Weather-resistant', 'Professional install', 'Free site visit', '5yr warranty', 'Nationwide coverage'].map(s => (
                    <div key={s} className="sv-spec">{s}</div>
                  ))}
                </div>
                <div className="sv-free-visit">
                  <div className="sv-free-visit-title">🎯 Free Site Visit Included</div>
                  <div className="sv-free-visit-desc">We assess your site, take measurements, and provide a detailed custom quote — at no cost.</div>
                </div>
              </div>

              {/* RIGHT */}
              <div className="sv-modal-right">
                <div className="sv-seller-card">
                  <div className="sv-seller-row">
                    <div className="sv-seller-avatar">V</div>
                    <div>
                      <div className="sv-seller-name">Vincevic Shades <span className="sv-verified">✓ VERIFIED</span></div>
                      <div className="sv-seller-since">Serving Kenya since 2012</div>
                    </div>
                  </div>
                  <div className="sv-seller-stats">
                    {[['📦', '500+', 'Projects'], ['⭐', '4.8', 'Rating'], ['⚡', '<2hr', 'Response']].map(([icon, val, lbl]) => (
                      <div key={lbl} className="sv-stat">
                        <div>{icon}</div>
                        <div className="sv-stat-val">{val}</div>
                        <div className="sv-stat-lbl">{lbl}</div>
                      </div>
                    ))}
                  </div>
                </div>

                <div style={{ fontWeight: 800, fontSize: '.8rem', color: '#0f1117', marginBottom: '.65rem' }}>Send Inquiry</div>
                <div className="sv-steps">
                  {[1,2,3].map(n => (
                    <div key={n} className={`sv-step ${inquiryStep > n ? 'done' : inquiryStep === n ? 'active' : ''}`} />
                  ))}
                </div>

                {inquiryStep === 1 && (
                  <div>
                    <div className="sv-form-row">
                      <div>
                        <label className="sv-form-label">Name *</label>
                        <input className="sv-form-input" placeholder="Full name" value={form.name} onChange={e => setForm({...form, name: e.target.value})} />
                      </div>
                      <div>
                        <label className="sv-form-label">Phone *</label>
                        <input className="sv-form-input" placeholder="07XX XXX XXX" value={form.phone} onChange={e => setForm({...form, phone: e.target.value})} />
                      </div>
                    </div>
                    <button className="sv-btn-full" onClick={() => { if(form.name && form.phone) setInquiryStep(2); }}>
                      Continue → <span style={{ opacity: .6 }}>Add message</span>
                    </button>
                  </div>
                )}
                {inquiryStep === 2 && (
                  <div>
                    <label className="sv-form-label">Your Message *</label>
                    <textarea className="sv-form-textarea" placeholder={`Tell us about your project for ${selectedService.name}…`} value={form.message} onChange={e => setForm({...form, message: e.target.value})} />
                    <button className="sv-btn-full" disabled={submitting} onClick={submitInquiry}>
                      {submitting ? 'Sending…' : 'Submit Inquiry →'}
                    </button>
                    <button onClick={() => setInquiryStep(1)} style={{ width:'100%', background:'none', border:'none', color:'var(--muted)', fontSize:'.78rem', cursor:'pointer', marginTop:'.4rem', padding:'.4rem' }}>← Back</button>
                  </div>
                )}
                {inquiryStep === 3 && (
                  <div style={{ textAlign: 'center', padding: '.75rem 0' }}>
                    <div style={{ fontSize: '2.2rem', marginBottom: '.4rem' }}>✅</div>
                    <div style={{ fontWeight: 800, color: '#0f1117', marginBottom: '.25rem' }}>Inquiry Sent!</div>
                    <div style={{ fontSize: '.82rem', color: 'var(--muted)', marginBottom: '.9rem' }}>We'll call you within 2 hours</div>
                    <button className="sv-btn-full" onClick={() => { setInquiryStep(1); setForm({name:'',phone:'',email:'',message:''}); }}>Send Another</button>
                  </div>
                )}

                <div className="sv-divider">Or contact directly</div>
                <a href="https://wa.me/254720120616" target="_blank" rel="noopener noreferrer" className="sv-btn-wa-full">
                  💬 WhatsApp — 0720 120 616
                </a>
                <a href="tel:0720120616" className="sv-btn-call">📞 Call 0720 120 616</a>
                <button style={{ width:'100%', marginTop:'.45rem', padding:'.62rem', background:'var(--gold-pale)', border:'1.5px solid rgba(201,168,76,.28)', borderRadius:9, fontFamily:'Plus Jakarta Sans,sans-serif', fontSize:'.8rem', fontWeight:800, cursor:'pointer', color:'#0f1117', transition:'all .2s' }}
                  onClick={() => { addToCart({ _id: selectedService._id, name: selectedService.name, price: selectedService.price, category: selectedService.category, image: selectedService.image }); showToast('🛒 Added to quote list'); setShowInquiry(false); }}>
                  🛒 Add to Quote List
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ── STICKY MOBILE CTA ── */}
      <div className="sv-mobile-cta">
        <Link href="/cart">🛒 Cart ({cartCount})</Link>
        <a href="https://wa.me/254720120616" target="_blank" rel="noopener noreferrer">💬 WhatsApp</a>
        <a href="tel:0720120616">📞 Call</a>
      </div>

      {/* ── FOOTER ── */}
      <footer className="sv-footer">
        <div className="sv-footer-inner">
          <div className="sv-footer-grid">
            <div>
              <div className="sv-footer-brand">Vincevic Shades</div>
              <div className="sv-footer-brand-sub">Enterprises</div>
              <p className="sv-footer-desc">Your trusted partner for quality outdoor structures across Kenya. Craftsmanship, durability, and design excellence in every project since 2012.</p>
              <div className="sv-footer-socials">
                <a href="#" className="sv-social-link">f</a>
                <a href="#" className="sv-social-link">in</a>
                <a href="https://wa.me/254720120616" className="sv-social-link">w</a>
              </div>
            </div>
            <div className="sv-fcol">
              <div className="sv-fcol-title">Quick Links</div>
              <ul>
                <li><Link href="/">Home</Link></li>
                <li><Link href="/services">Services</Link></li>
                <li><Link href="/portfolio">Portfolio</Link></li>
                <li><Link href="/about">About Us</Link></li>
                <li><Link href="/contact">Contact</Link></li>
              </ul>
            </div>
            <div className="sv-fcol">
              <div className="sv-fcol-title">Services</div>
              <ul>
                <li>Car Shades & Covers</li>
                <li>Garden Gazebos</li>
                <li>Decorative Pagolas</li>
                <li>Automated Gates</li>
                <li>Commercial Structures</li>
              </ul>
            </div>
            <div className="sv-fcol">
              <div className="sv-fcol-title">Contact</div>
              <ul>
                <li>📞 0720 120 616</li>
                <li>📱 0716 632 889</li>
                <li>💬 WhatsApp Available</li>
                <li>🕒 Mon–Fri: 8AM–6PM</li>
                <li>🕒 Sat: 9AM–5PM</li>
              </ul>
            </div>
          </div>
          <div className="sv-footer-bottom">
            <span className="sv-footer-copy">© 2026 Vincevic Shades Enterprises. All rights reserved.</span>
            <div className="sv-footer-legal">
              <a href="#">Privacy Policy</a>
              <a href="#">Terms of Service</a>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}

// ── SERVICE CARD ──────────────────────────────────────────────────────────────
function ServiceCard({ service, viewMode, saved, onSave, onOpen, onCart, getBadgeStyle }: {
  service: any;
  viewMode: string;
  saved: boolean;
  onSave: () => void;
  onOpen: () => void;
  onCart: () => void;
  getBadgeStyle: (badge: string) => { background: string; color: string };
}) {
  return (
    <div className={`sv-card ${viewMode === 'list' ? 'list-mode' : ''}`} onClick={onOpen}>
      {service.badge && (
        <span className="sv-badge" style={getBadgeStyle(service.badge)}>{service.badge}</span>
      )}
      <button className="sv-save" onClick={e => { e.stopPropagation(); onSave(); }}>
        {saved ? '❤️' : '🤍'}
      </button>

      <div className="sv-card-img">
        {service.image && (service.image.startsWith('/images/') || service.image.startsWith('data:image')) ? (
          service.image.startsWith('data:image')
            ? <img src={service.image} alt={service.name} />
            : <Image src={service.image} alt={service.name} fill style={{ objectFit: 'cover' }} sizes="(max-width:640px) 50vw, (max-width:1024px) 33vw, 25vw" />
        ) : (
          <div className="sv-card-img-ph">
            <span>{categoryIcon(service.category)}</span>
            <small>{service.category}</small>
          </div>
        )}
        <div className="sv-verified-badge">✓ Verified</div>
      </div>

      <div className="sv-card-body">
        <span className="sv-card-cat">{service.category}</span>
        <h3 className="sv-card-title">{service.name}</h3>
        <p className="sv-card-desc">{service.description}</p>

        {service.rating && (
          <div className="sv-card-rating">
            <Stars rating={service.rating} />
            <span className="sv-rnum">{service.rating}</span>
            <span className="sv-rcnt">({service.reviews || 0})</span>
            {service.views && <span className="sv-views">👁 {service.views}</span>}
          </div>
        )}

        <div className="sv-card-price-row">
          <span className="sv-price">{service.price}</span>
          {service.negotiable && <span className="sv-nego">Negotiable</span>}
        </div>

        <div className="sv-card-actions" onClick={e => e.stopPropagation()}>
          <button className="sv-btn-inquire" onClick={onOpen}>📩 Inquire</button>
          <a href="https://wa.me/254720120616" target="_blank" rel="noopener noreferrer" className="sv-btn-wa" onClick={e => e.stopPropagation()}>💬</a>
          <button className="sv-btn-cart" onClick={e => { e.stopPropagation(); onCart(); }}>🛒</button>
        </div>
      </div>
    </div>
  );
}