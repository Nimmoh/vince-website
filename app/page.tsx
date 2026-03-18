'use client';

import { useState, useEffect, useRef } from "react";
import Link from "next/link";

// ─── DATA ───────────────────────────────────────────────────────────────────
const CATEGORIES = [
  { id: "all", label: "All", icon: "◈", count: 12 },
  { id: "shades", label: "Car Shades", icon: "⬡", count: 4 },
  { id: "gazebo", label: "Gazebos", icon: "◎", count: 3 },
  { id: "pagola", label: "Pagolas", icon: "▲", count: 3 },
  { id: "gates", label: "Gates", icon: "◫", count: 2 },
];

const LOCATIONS = [
  "Nairobi CBD", "Westlands", "Karen", "Kilimani", "Lavington",
  "Mombasa", "Kisumu", "Nakuru", "Eldoret", "Thika",
  "Ruaka", "Kikuyu", "Machakos", "Limuru"
];

const SORT_OPTIONS = [
  { id: "newest", label: "Newest First" },
  { id: "price_asc", label: "Price: Low to High" },
  { id: "price_desc", label: "Price: High to Low" },
  { id: "popular", label: "Most Popular" },
];

const LISTINGS = [
  {
    id: 1, category: "shades", title: "Premium Curved Car Shade",
    price: 45000, priceDisplay: "KSh 45,000", negotiable: false,
    location: "Nairobi CBD", county: "Nairobi",
    image: "/images/image1.jpeg", placeholder: "⬡",
    desc: "Durable UV-protected parking shade with modern curved design. Galvanized steel posts with powder-coated finish.",
    rating: 4.8, reviews: 24, verified: true, featured: true,
    badge: "BESTSELLER", views: 342, postedDays: 2,
    seller: { name: "Vincevic Shades", verified: true, since: "2012" },
    specs: ["Galvanized steel", "UV canopy", "10yr warranty", "Customizable size"]
  },
  {
    id: 2, category: "gazebo", title: "Luxury Stone Pillar Gazebo",
    price: 150000, priceDisplay: "KSh 150,000", negotiable: true,
    location: "Karen", county: "Nairobi",
    image: "/images/image2.jpeg", placeholder: "◎",
    desc: "Premium gazebo with stone pillars, perfect for outdoor entertainment and events. Comes with weather-resistant roofing.",
    rating: 5.0, reviews: 18, verified: true, featured: true,
    badge: "TOP RATED", views: 289, postedDays: 5,
    seller: { name: "Vincevic Shades", verified: true, since: "2012" },
    specs: ["Stone pillars", "Hardwood beams", "Waterproof roof", "Bespoke finish"]
  },
  {
    id: 3, category: "pagola", title: "Modern Wooden Pagola",
    price: 75000, priceDisplay: "KSh 75,000", negotiable: true,
    location: "Westlands", county: "Nairobi",
    image: "/images/image3.jpeg", placeholder: "▲",
    desc: "Contemporary wooden pagola with sleek design. Perfect for entrance coverage or patio aesthetics.",
    rating: 4.7, reviews: 12, verified: true, featured: false,
    badge: null, views: 156, postedDays: 7,
    seller: { name: "Vincevic Shades", verified: true, since: "2012" },
    specs: ["Treated timber", "Custom design", "Anti-rot treatment", "5yr warranty"]
  },
  {
    id: 4, category: "shades", title: "Industrial Cantilever Shade",
    price: 95000, priceDisplay: "KSh 95,000", negotiable: false,
    location: "Thika", county: "Kiambu",
    image: "/images/image4.jpeg", placeholder: "⬡",
    desc: "Heavy-duty cantilever shade structure ideal for commercial and residential spaces. No center post.",
    rating: 4.9, reviews: 31, verified: true, featured: false,
    badge: "POPULAR", views: 421, postedDays: 3,
    seller: { name: "Vincevic Shades", verified: true, since: "2012" },
    specs: ["No center post", "Heavy-duty steel", "Commercial grade", "Custom colors"]
  },
  {
    id: 5, category: "shades", title: "Residential Patio Shade",
    price: 55000, priceDisplay: "KSh 55,000", negotiable: true,
    location: "Kilimani", county: "Nairobi",
    image: "/images/image5.jpeg", placeholder: "⬡",
    desc: "Weather-resistant patio shade cover with elegant design. Perfect for home gardens and terraces.",
    rating: 4.6, reviews: 9, verified: true, featured: false,
    badge: null, views: 98, postedDays: 10,
    seller: { name: "Vincevic Shades", verified: true, since: "2012" },
    specs: ["Weather-resistant", "Elegant design", "Easy install", "2yr warranty"]
  },
  {
    id: 6, category: "gazebo", title: "Garden Gazebo Deluxe",
    price: 120000, priceDisplay: "KSh 120,000", negotiable: true,
    location: "Lavington", county: "Nairobi",
    image: "/images/image6.jpeg", placeholder: "◎",
    desc: "Spacious garden gazebo perfect for relaxation and outdoor gatherings. Includes built-in seating frame.",
    rating: 4.8, reviews: 15, verified: true, featured: false,
    badge: null, views: 203, postedDays: 6,
    seller: { name: "Vincevic Shades", verified: true, since: "2012" },
    specs: ["Spacious design", "Built-in frame", "Weatherproof", "Seating ready"]
  },
  {
    id: 7, category: "pagola", title: "Entrance Pagola Arch",
    price: 65000, priceDisplay: "KSh 65,000", negotiable: false,
    location: "Ruaka", county: "Kiambu",
    image: "/images/image7.jpeg", placeholder: "▲",
    desc: "Elegant entrance pagola with modern architectural design. Creates a stunning first impression.",
    rating: 4.5, reviews: 7, verified: true, featured: false,
    badge: null, views: 87, postedDays: 14,
    seller: { name: "Vincevic Shades", verified: true, since: "2012" },
    specs: ["Arch design", "Steel frame", "Custom paint", "Low maintenance"]
  },
  {
    id: 8, category: "gates", title: "Automated Sliding Gate",
    price: 120000, priceDisplay: "KSh 120,000", negotiable: false,
    location: "Nairobi CBD", county: "Nairobi",
    image: "/images/image8.jpeg", placeholder: "◫",
    desc: "Full automation with remote control, GSM module and security features. Works with solar backup.",
    rating: 4.9, reviews: 27, verified: true, featured: true,
    badge: "FEATURED", views: 512, postedDays: 1,
    seller: { name: "Vincevic Shades", verified: true, since: "2012" },
    specs: ["Remote control", "GSM module", "Solar backup", "CCTV ready"]
  },
  {
    id: 9, category: "shades", title: "Commercial Shade Structure",
    price: 85000, priceDisplay: "KSh 85,000", negotiable: true,
    location: "Mombasa", county: "Mombasa",
    image: "/images/image9.jpeg", placeholder: "⬡",
    desc: "Large commercial-grade shade structure for parking or outdoor dining areas. Can cover 8+ vehicles.",
    rating: 4.7, reviews: 19, verified: true, featured: false,
    badge: null, views: 267, postedDays: 8,
    seller: { name: "Vincevic Shades", verified: true, since: "2012" },
    specs: ["8+ vehicle capacity", "Commercial grade", "Custom branding", "Fast install"]
  },
  {
    id: 10, category: "gazebo", title: "Premium Event Gazebo",
    price: 180000, priceDisplay: "KSh 180,000", negotiable: true,
    location: "Karen", county: "Nairobi",
    image: "/images/image10.jpeg", placeholder: "◎",
    desc: "Premium event gazebo with luxury finishes and spacious design. Perfect for wedding venues and hotels.",
    rating: 5.0, reviews: 11, verified: true, featured: true,
    badge: "LUXURY", views: 445, postedDays: 4,
    seller: { name: "Vincevic Shades", verified: true, since: "2012" },
    specs: ["Luxury finish", "Event ready", "500+ sqft", "Custom lighting"]
  },
  {
    id: 11, category: "pagola", title: "Decorative Garden Pagola",
    price: 70000, priceDisplay: "KSh 70,000", negotiable: true,
    location: "Kisumu", county: "Kisumu",
    image: "/images/image11.jpeg", placeholder: "▲",
    desc: "Decorative pagola perfect for garden pathways and entrances. Climbing plant friendly design.",
    rating: 4.4, reviews: 6, verified: true, featured: false,
    badge: null, views: 73, postedDays: 18,
    seller: { name: "Vincevic Shades", verified: true, since: "2012" },
    specs: ["Plant friendly", "Decorative design", "Powder coated", "Easy assembly"]
  },
  {
    id: 12, category: "gates", title: "Security Gate System",
    price: 150000, priceDisplay: "KSh 150,000", negotiable: false,
    location: "Nakuru", county: "Nakuru",
    image: "/images/image12.jpeg", placeholder: "◫",
    desc: "Complete security gate system with automation, access control, intercom and CCTV integration.",
    rating: 4.8, reviews: 22, verified: true, featured: false,
    badge: "SECURE", views: 334, postedDays: 9,
    seller: { name: "Vincevic Shades", verified: true, since: "2012" },
    specs: ["Access control", "Intercom", "CCTV ready", "24/7 support"]
  },
];

const TRUST_BADGES = [
  { icon: "✓", label: "Verified Provider", color: "#16a34a" },
  { icon: "🔒", label: "Secure Platform", color: "#1d4ed8" },
  { icon: "⚡", label: "Fast Response", color: "#d97706" },
  { icon: "⭐", label: "Rated 4.8/5", color: "#7c3aed" },
];

// ─── HELPERS ─────────────────────────────────────────────────────────────────
const formatPrice = (n: number) => `KSh ${n.toLocaleString()}`;
const WA_NUMBER = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "254720120616";
const Stars = ({ rating }: { rating: number }) => {
  const full = Math.floor(rating);
  return (
    <span style={{ color: "#f59e0b", fontSize: "0.78rem", letterSpacing: "-1px" }}>
      {"★".repeat(full)}{"☆".repeat(5 - full)}
    </span>
  );
};

// ─── MAIN COMPONENT ──────────────────────────────────────────────────────────
export default function VincevicMarketplace() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [location, setLocation] = useState("All Kenya");
  const [sort, setSort] = useState("newest");
  const [priceMin, setPriceMin] = useState("");
  const [priceMax, setPriceMax] = useState("");
  const [viewMode, setViewMode] = useState("grid"); // grid | list
  const [selectedListing, setSelectedListing] = useState<any>(null);
  const [showInquiry, setShowInquiry] = useState(false);
  const [savedItems, setSavedItems] = useState<Set<number>>(new Set());
  const [cartItems, setCartItems] = useState<any[]>([]);
  const [showCart, setShowCart] = useState(false);
  const [filterOpen, setFilterOpen] = useState(false);
  const [locationDetecting, setLocationDetecting] = useState(false);
  const [toast, setToast] = useState<{ msg: string; type: string } | null>(null);
  const [form, setForm] = useState({ name: "", phone: "", message: "" });
  const [step, setStep] = useState(1); // inquiry steps
  const searchRef = useRef<HTMLInputElement>(null);

  const showToast = (msg: string, type: string = "success") => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3000);
  };

  const buildWhatsAppQuote = () => {
    const lines = cartItems.map(i => `• ${i.title} — ${i.priceDisplay}`).join("\n");
    const total = formatPrice(cartItems.reduce((s, i) => s + i.price, 0));
    const msg = `Hello Vincevic Shades! I'd like a quote for the following:\n\n${lines}\n\nEstimated Total: ${total}\n\nPlease get back to me. Thank you!`;
    return `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(msg)}`;
  };

  const detectLocation = () => {
    setLocationDetecting(true);
    setTimeout(() => {
      setLocation("Nairobi CBD");
      setLocationDetecting(false);
      showToast(" Location detected: Nairobi CBD");
    }, 1400);
  };

  const toggleSave = (id: number) => {
    setSavedItems(prev => {
      const next = new Set(prev);
      if (next.has(id)) { next.delete(id); showToast("Removed from saved"); }
      else { next.add(id); showToast("❤️ Saved to wishlist"); }
      return next;
    });
  };

  const addToCart = (item: any) => {
    setCartItems(prev => prev.find(i => i.id === item.id) ? prev : [...prev, item]);
    showToast(`🛒 ${item.title} added to quote list`);
  };

  // Filter + sort
  const filtered = LISTINGS
    .filter(l => {
      const q = search.toLowerCase();
      if (q && !l.title.toLowerCase().includes(q) && !l.desc.toLowerCase().includes(q) && !l.location.toLowerCase().includes(q)) return false;
      if (category !== "all" && l.category !== category) return false;
      if (location !== "All Kenya" && l.location !== location && l.county !== location) return false;
      if (priceMin && l.price < parseInt(priceMin)) return false;
      if (priceMax && l.price > parseInt(priceMax)) return false;
      return true;
    })
    .sort((a, b) => {
      if (sort === "price_asc") return a.price - b.price;
      if (sort === "price_desc") return b.price - a.price;
      if (sort === "popular") return b.views - a.views;
      return a.postedDays - b.postedDays;
    });

  const featured = filtered.filter(l => l.featured);
  const regular = filtered.filter(l => !l.featured);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&family=Instrument+Serif:ital@0;1&display=swap');

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; }
        body { font-family: 'Plus Jakarta Sans', sans-serif; background: #f5f4f0; color: #1a1a1a; -webkit-font-smoothing: antialiased; }

        :root {
          --brand: #0f1117;
          --gold: #c9a84c;
          --gold-light: #e4c97a;
          --gold-pale: #fdf8ee;
          --green: #16a34a;
          --surface: #f5f4f0;
          --white: #fff;
          --border: #e5e3de;
          --muted: #78716c;
          --shadow-sm: 0 1px 3px rgba(0,0,0,.08), 0 1px 2px rgba(0,0,0,.06);
          --shadow-md: 0 4px 16px rgba(0,0,0,.1), 0 2px 6px rgba(0,0,0,.06);
          --shadow-lg: 0 16px 40px rgba(0,0,0,.14);
          --radius: 12px;
        }

        /* ── SCROLLBAR ── */
        ::-webkit-scrollbar { width: 6px; height: 6px; }
        ::-webkit-scrollbar-track { background: var(--surface); }
        ::-webkit-scrollbar-thumb { background: #d4c9b8; border-radius: 3px; }

        /* ── HEADER ── */
        .jiji-header {
          position: sticky; top: 0; z-index: 100;
          background: var(--brand);
          border-bottom: 1px solid rgba(255,255,255,.06);
        }
        .jiji-header-top {
          max-width: 1400px; margin: 0 auto;
          padding: 0 1.25rem;
          height: 60px;
          display: flex; align-items: center; gap: 1rem;
        }
        .logo {
          display: flex; flex-direction: column; gap: 0; flex-shrink: 0; cursor: pointer;
        }
        .logo-name {
          font-family: 'Instrument Serif', serif;
          font-size: 1.2rem; font-weight: 400;
          color: #fff; line-height: 1; letter-spacing: .02em;
        }
        .logo-sub {
          font-size: .55rem; font-weight: 700;
          color: var(--gold); letter-spacing: .22em;
          text-transform: uppercase;
        }

        /* ── HERO SEARCH ── */
        .hero-search-section {
          background: linear-gradient(160deg, #0a0d14 0%, #111827 45%, #1a2235 100%);
          padding: 3.5rem 1.25rem 4rem;
          position: relative; overflow: hidden;
          min-height: 480px;
          display: flex; align-items: center;
        }
        .hero-search-section::before {
          content: '';
          position: absolute; inset: 0;
          background-image: url('/images/car-shade.jpeg');
          background-size: cover; background-position: center;
          opacity: .13;
        }
        .hero-search-section::after {
          content: '';
          position: absolute; inset: 0;
          background: radial-gradient(ellipse 80% 60% at 50% 100%, rgba(201,168,76,.12) 0%, transparent 70%);
        }
        .hero-search-inner { max-width: 860px; margin: 0 auto; position: relative; z-index: 1; width: 100%; }

        .hero-eyebrow {
          display: inline-flex; align-items: center; gap: .5rem;
          background: rgba(201,168,76,.15);
          border: 1px solid rgba(201,168,76,.3);
          border-radius: 100px;
          padding: .3rem .9rem;
          font-size: .72rem; font-weight: 700;
          color: var(--gold-light); letter-spacing: .12em;
          text-transform: uppercase;
          margin-bottom: 1.1rem;
        }
        .hero-eyebrow-dot { width: 6px; height: 6px; border-radius: 50%; background: var(--gold); animation: pulse-dot 2s infinite; }
        @keyframes pulse-dot { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:.5;transform:scale(.7)} }

        .hero-title {
          font-family: 'Instrument Serif', serif;
          font-size: clamp(2.2rem, 5vw, 3.6rem);
          color: #fff; text-align: center; margin-bottom: .75rem; line-height: 1.1;
          letter-spacing: -.01em;
        }
        .hero-title em { color: var(--gold-light); font-style: italic; }
        .hero-title .hero-title-line2 { display: block; font-size: clamp(1.5rem, 3.5vw, 2.4rem); color: rgba(255,255,255,.75); }

        .hero-sub {
          text-align: center; color: rgba(255,255,255,.55);
          font-size: .95rem; margin-bottom: 2rem; line-height: 1.6;
          max-width: 560px; margin-left: auto; margin-right: auto;
        }

        .hero-stats-row {
          display: flex; justify-content: center; gap: 2rem;
          margin-bottom: 2rem; flex-wrap: wrap;
        }
        .hero-stat {
          text-align: center;
        }
        .hero-stat-num {
          font-family: 'Instrument Serif', serif;
          font-size: 1.6rem; color: var(--gold-light); line-height: 1;
        }
        .hero-stat-label {
          font-size: .7rem; color: rgba(255,255,255,.45);
          text-transform: uppercase; letter-spacing: .1em; margin-top: .2rem;
        }
        .hero-stat-divider { width: 1px; background: rgba(255,255,255,.1); align-self: stretch; }

        /* ── MAIN SEARCH BOX ── */
        .search-box {
          background: var(--white);
          border-radius: 16px;
          padding: .5rem .5rem .5rem .5rem;
          display: flex; gap: .5rem; align-items: stretch;
          box-shadow: 0 20px 60px rgba(0,0,0,.4), 0 0 0 1px rgba(201,168,76,.15);
        }
        .search-location-btn {
          display: flex; align-items: center; gap: .4rem;
          padding: .65rem 1rem;
          background: var(--surface);
          border: 1.5px solid var(--border);
          border-radius: 10px;
          font-family: 'Plus Jakarta Sans', sans-serif;
          font-size: .82rem; font-weight: 600;
          color: var(--brand); cursor: pointer;
          white-space: nowrap; flex-shrink: 0;
          transition: all .2s;
        }
        .search-location-btn:hover { border-color: var(--gold); background: var(--gold-pale); }
        .search-location-btn .loc-pin { color: #ef4444; font-size: 1rem; }
        .search-divider { width: 1px; background: var(--border); flex-shrink: 0; margin: .3rem 0; }
        .search-input-wrap { flex: 1; position: relative; display: flex; align-items: center; }
        .search-input-wrap input {
          width: 100%; height: 100%;
          border: none; outline: none;
          font-family: 'Plus Jakarta Sans', sans-serif;
          font-size: .95rem; color: var(--brand);
          padding: .65rem .75rem;
          background: transparent;
        }
        .search-input-wrap input::placeholder { color: #a8a29e; }
        .search-submit {
          background: linear-gradient(135deg, var(--gold) 0%, #b8922e 100%);
          color: var(--brand);
          border: none; cursor: pointer;
          padding: .75rem 2rem;
          border-radius: 12px;
          font-family: 'Plus Jakarta Sans', sans-serif;
          font-size: .9rem; font-weight: 800;
          letter-spacing: .03em;
          transition: all .25s;
          flex-shrink: 0;
          display: flex; align-items: center; gap: .4rem;
          box-shadow: 0 4px 12px rgba(201,168,76,.4);
        }
        .search-submit:hover { transform: translateY(-2px); box-shadow: 0 8px 20px rgba(201,168,76,.5); }

        .hero-quick-cats {
          display: flex; gap: .5rem; justify-content: center;
          margin-top: 1.5rem; flex-wrap: wrap;
        }
        .hero-quick-cat {
          display: flex; align-items: center; gap: .4rem;
          background: rgba(255,255,255,.07);
          border: 1px solid rgba(255,255,255,.12);
          border-radius: 100px; padding: .4rem 1rem;
          font-size: .78rem; font-weight: 600;
          color: rgba(255,255,255,.75);
          cursor: pointer; transition: all .2s;
        }
        .hero-quick-cat:hover { background: rgba(201,168,76,.2); border-color: rgba(201,168,76,.4); color: var(--gold-light); }

        /* ── TRUST BADGES ── */
        .trust-row {
          display: flex; gap: .75rem; justify-content: center;
          margin-top: 1.25rem; flex-wrap: wrap;
        }
        .trust-badge {
          display: flex; align-items: center; gap: .4rem;
          background: rgba(255,255,255,.08);
          border: 1px solid rgba(255,255,255,.12);
          border-radius: 100px; padding: .35rem .9rem;
          font-size: .75rem; font-weight: 600;
          color: rgba(255,255,255,.7);
        }

        /* ── CATEGORY SCROLL ── */
        .cat-scroll-wrap {
          background: var(--white);
          border-bottom: 1px solid var(--border);
          overflow-x: auto; -webkit-overflow-scrolling: touch;
        }
        .cat-scroll-wrap::-webkit-scrollbar { height: 0; }
        .cat-scroll-inner {
          max-width: 1400px; margin: 0 auto;
          padding: .75rem 1.25rem;
          display: flex; gap: .5rem; align-items: center;
          min-width: max-content;
        }
        .cat-pill {
          display: flex; align-items: center; gap: .45rem;
          padding: .55rem 1.1rem;
          border-radius: 100px;
          font-family: 'Plus Jakarta Sans', sans-serif;
          font-size: .82rem; font-weight: 600;
          cursor: pointer;
          border: 1.5px solid var(--border);
          background: transparent;
          color: var(--muted);
          transition: all .2s; white-space: nowrap;
        }
        .cat-pill:hover { border-color: var(--brand); color: var(--brand); }
        .cat-pill.active { background: var(--brand); color: #fff; border-color: var(--brand); }
        .cat-pill .cat-icon { font-size: 1rem; }
        .cat-pill .cat-count {
          font-size: .7rem; background: rgba(255,255,255,.2);
          padding: .1rem .4rem; border-radius: 100px;
        }
        .cat-pill.active .cat-count { background: rgba(255,255,255,.25); }

        /* ── TOOLBAR ── */
        .toolbar {
          max-width: 1400px; margin: 0 auto;
          padding: 1rem 1.25rem;
          display: flex; align-items: center; justify-content: space-between; gap: .75rem;
          flex-wrap: wrap;
        }
        .results-label { font-size: .88rem; color: var(--muted); }
        .results-label strong { color: var(--brand); font-weight: 700; }
        .toolbar-right { display: flex; gap: .5rem; align-items: center; flex-wrap: wrap; }
        .sort-select {
          padding: .5rem .85rem;
          border: 1.5px solid var(--border);
          border-radius: 8px;
          font-family: 'Plus Jakarta Sans', sans-serif;
          font-size: .82rem; font-weight: 600;
          color: var(--brand); background: var(--white);
          cursor: pointer; outline: none;
          transition: border-color .2s;
        }
        .sort-select:focus { border-color: var(--gold); }
        .view-btn {
          padding: .5rem .65rem;
          border: 1.5px solid var(--border);
          border-radius: 8px;
          background: transparent; cursor: pointer;
          font-size: .9rem; color: var(--muted);
          transition: all .2s;
        }
        .view-btn.active { background: var(--brand); color: var(--white); border-color: var(--brand); }
        .filter-btn {
          display: flex; align-items: center; gap: .4rem;
          padding: .5rem 1rem;
          border: 1.5px solid var(--border);
          border-radius: 8px;
          font-family: 'Plus Jakarta Sans', sans-serif;
          font-size: .82rem; font-weight: 600;
          color: var(--brand); background: var(--white);
          cursor: pointer; transition: all .2s;
        }
        .filter-btn:hover, .filter-btn.open { border-color: var(--brand); background: var(--brand); color: #fff; }

        /* ── FILTER PANEL ── */
        .filter-panel {
          background: var(--white);
          border-bottom: 1px solid var(--border);
          overflow: hidden;
          max-height: 0;
          transition: max-height .35s ease;
        }
        .filter-panel.open { max-height: 300px; }
        .filter-panel-inner {
          max-width: 1400px; margin: 0 auto;
          padding: 1.25rem 1.25rem 1.5rem;
          display: flex; gap: 1.5rem; flex-wrap: wrap; align-items: flex-end;
        }
        .filter-group { display: flex; flex-direction: column; gap: .4rem; }
        .filter-label { font-size: .75rem; font-weight: 700; text-transform: uppercase; letter-spacing: .06em; color: var(--muted); }
        .filter-input {
          padding: .55rem .85rem;
          border: 1.5px solid var(--border);
          border-radius: 8px;
          font-family: 'Plus Jakarta Sans', sans-serif;
          font-size: .85rem; color: var(--brand);
          background: var(--surface); outline: none;
          transition: border-color .2s;
          min-width: 140px;
        }
        .filter-input:focus { border-color: var(--gold); background: var(--white); }
        .btn-reset {
          padding: .55rem 1.2rem;
          border: 1.5px solid #fca5a5;
          border-radius: 8px;
          font-family: 'Plus Jakarta Sans', sans-serif;
          font-size: .82rem; font-weight: 600;
          color: #dc2626; background: #fff5f5;
          cursor: pointer; transition: all .2s;
        }
        .btn-reset:hover { background: #fee2e2; }

        /* ── LAYOUT ── */
        .main-layout {
          max-width: 1400px; margin: 0 auto;
          padding: 0 1.25rem 4rem;
        }

        /* ── FEATURED BANNER ── */
        .featured-label {
          display: flex; align-items: center; gap: .6rem;
          font-size: .8rem; font-weight: 700; color: var(--gold);
          text-transform: uppercase; letter-spacing: .1em;
          margin: 1.5rem 0 .75rem;
        }
        .featured-label::after { content: ''; flex: 1; height: 1px; background: var(--border); }

        /* ── GRID ── */
        .listings-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(290px, 1fr));
          gap: 1.25rem;
        }
        .listings-grid.list-mode {
          grid-template-columns: 1fr;
        }

        /* ── LISTING CARD ── */
        .listing-card {
          background: var(--white);
          border-radius: var(--radius);
          overflow: hidden;
          border: 1px solid var(--border);
          box-shadow: var(--shadow-sm);
          transition: transform .25s cubic-bezier(.25,.8,.25,1), box-shadow .25s, border-color .25s;
          cursor: pointer;
          position: relative;
        }
        .listing-card:hover {
          transform: translateY(-4px);
          box-shadow: var(--shadow-md);
          border-color: rgba(201,168,76,.35);
        }
        .listing-card.list-mode {
          display: flex; flex-direction: row;
          min-height: 160px;
        }

        /* Badge */
        .listing-badge {
          position: absolute; top: 10px; left: 10px; z-index: 2;
          font-size: .65rem; font-weight: 800; letter-spacing: .08em;
          padding: .25rem .6rem; border-radius: 5px;
          text-transform: uppercase;
        }
        .badge-featured { background: var(--gold); color: var(--brand); }
        .badge-popular { background: #3b82f6; color: #fff; }
        .badge-top { background: #16a34a; color: #fff; }
        .badge-luxury { background: #7c3aed; color: #fff; }
        .badge-secure { background: #1d4ed8; color: #fff; }
        .badge-bestseller { background: #ef4444; color: #fff; }

        /* Save */
        .save-btn {
          position: absolute; top: 10px; right: 10px; z-index: 3;
          width: 32px; height: 32px;
          background: rgba(255,255,255,.92);
          border: none; border-radius: 50%;
          display: flex; align-items: center; justify-content: center;
          cursor: pointer; font-size: 1rem;
          box-shadow: 0 2px 8px rgba(0,0,0,.12);
          transition: transform .2s, background .2s;
        }
        .save-btn:hover { transform: scale(1.12); background: #fff; }
        .save-btn.saved { background: #fff0f0; }

        /* Image */
        .card-img {
          aspect-ratio: 16/11;
          position: relative; overflow: hidden;
          background: linear-gradient(135deg, #e8e5df 0%, #d4d0c8 100%);
        }
        .list-mode .card-img {
          aspect-ratio: auto;
          width: 220px; min-width: 220px; flex-shrink: 0;
          border-radius: 0;
        }
        .card-img img {
          width: 100%; height: 100%;
          object-fit: cover;
          transition: transform .4s;
        }
        .listing-card:hover .card-img img { transform: scale(1.04); }
        .card-img-placeholder {
          width: 100%; height: 100%;
          display: flex; flex-direction: column;
          align-items: center; justify-content: center;
          gap: .35rem; background: linear-gradient(135deg, #eee9e1, #ddd8cf);
        }
        .card-img-placeholder span { font-size: 2.5rem; opacity: .25; }
        .card-img-placeholder small { font-size: .7rem; color: var(--muted); text-transform: uppercase; letter-spacing: .1em; }

        /* Verified overlay */
        .verified-overlay {
          position: absolute; bottom: 8px; left: 8px;
          background: rgba(22,163,74,.9);
          color: #fff; font-size: .65rem; font-weight: 700;
          padding: .2rem .55rem; border-radius: 4px;
          display: flex; align-items: center; gap: .3rem;
          letter-spacing: .05em;
        }

        /* Card body */
        .card-body {
          padding: 1rem;
          display: flex; flex-direction: column; flex: 1;
        }
        .card-location {
          font-size: .72rem; color: var(--muted); font-weight: 500;
          display: flex; align-items: center; gap: .25rem;
          margin-bottom: .35rem;
        }
        .card-title {
          font-family: 'Plus Jakarta Sans', sans-serif;
          font-size: .95rem; font-weight: 700;
          color: var(--brand); margin-bottom: .35rem;
          line-height: 1.3;
        }
        .card-desc {
          font-size: .8rem; color: var(--muted);
          line-height: 1.55; margin-bottom: .65rem;
          display: -webkit-box; -webkit-line-clamp: 2;
          -webkit-box-orient: vertical; overflow: hidden;
        }
        .list-mode .card-desc { -webkit-line-clamp: 3; }

        /* Specs */
        .card-specs {
          display: flex; flex-wrap: wrap; gap: .35rem;
          margin-bottom: .75rem;
        }
        .spec-chip {
          font-size: .68rem; font-weight: 600;
          background: var(--surface);
          border: 1px solid var(--border);
          border-radius: 4px; padding: .2rem .5rem;
          color: var(--muted);
        }

        /* Rating row */
        .card-rating-row {
          display: flex; align-items: center; gap: .5rem;
          margin-bottom: .5rem; flex-wrap: wrap;
        }
        .rating-num { font-weight: 700; font-size: .82rem; color: var(--brand); }
        .rating-count { font-size: .75rem; color: var(--muted); }
        .views-badge {
          margin-left: auto;
          font-size: .7rem; color: var(--muted);
          display: flex; align-items: center; gap: .2rem;
        }

        /* Price row */
        .card-price-row {
          display: flex; align-items: flex-end; gap: .5rem;
          margin-bottom: .75rem;
        }
        .card-price {
          font-family: 'Instrument Serif', serif;
          font-size: 1.3rem; font-weight: 400;
          color: #15803d; line-height: 1;
        }
        .card-nego {
          font-size: .7rem; color: var(--muted); font-weight: 600;
          background: #f0fdf4; border: 1px solid #bbf7d0;
          padding: .15rem .45rem; border-radius: 4px; color: #16a34a;
        }

        /* Card actions */
        .card-actions {
          display: flex; gap: .5rem; margin-top: auto;
        }
        .btn-contact {
          flex: 1;
          background: var(--brand); color: var(--gold-light);
          border: none; cursor: pointer;
          padding: .6rem .75rem;
          border-radius: 8px;
          font-family: 'Plus Jakarta Sans', sans-serif;
          font-size: .78rem; font-weight: 700;
          letter-spacing: .02em;
          transition: all .2s;
          display: flex; align-items: center; justify-content: center; gap: .35rem;
        }
        .btn-contact:hover { background: #2d3448; }
        .btn-whatsapp {
          background: #25d366; color: #fff;
          border: none; cursor: pointer;
          padding: .6rem .9rem;
          border-radius: 8px;
          font-size: 1rem;
          transition: all .2s; flex-shrink: 0;
        }
        .btn-whatsapp:hover { background: #1db954; transform: translateY(-1px); }
        .btn-cart {
          background: var(--gold-pale);
          color: var(--brand);
          border: 1.5px solid rgba(201,168,76,.35);
          cursor: pointer;
          padding: .6rem .75rem;
          border-radius: 8px;
          font-size: .8rem; font-weight: 700;
          transition: all .2s; flex-shrink: 0;
        }
        .btn-cart:hover { background: var(--gold); border-color: var(--gold); }

        /* ── DETAIL MODAL ── */
        .modal-overlay {
          position: fixed; inset: 0; z-index: 200;
          background: rgba(0,0,0,.65);
          backdrop-filter: blur(4px);
          display: flex; align-items: flex-start; justify-content: center;
          overflow-y: auto; padding: 1rem;
        }
        .detail-modal {
          background: var(--white);
          border-radius: 16px;
          width: 100%; max-width: 900px;
          margin: auto;
          overflow: hidden;
          box-shadow: var(--shadow-lg);
          border: 1px solid rgba(201,168,76,.15);
        }
        .detail-img {
          width: 100%; aspect-ratio: 16/7;
          position: relative; overflow: hidden;
          background: linear-gradient(135deg, #e8e5df, #d4d0c8);
        }
        .detail-img img { width: 100%; height: 100%; object-fit: cover; }
        .detail-img-placeholder {
          width: 100%; height: 100%;
          display: flex; align-items: center; justify-content: center;
          font-size: 5rem; opacity: .12;
        }
        .detail-close {
          position: absolute; top: 14px; right: 14px; z-index: 2;
          width: 36px; height: 36px;
          background: rgba(255,255,255,.9);
          border: none; border-radius: 50%;
          display: flex; align-items: center; justify-content: center;
          font-size: 1rem; cursor: pointer;
          box-shadow: 0 2px 8px rgba(0,0,0,.15);
          transition: all .2s;
        }
        .detail-close:hover { background: #fff; transform: scale(1.08); }
        .detail-body {
          display: grid; grid-template-columns: 1fr 340px;
          gap: 0;
        }
        .detail-left { padding: 1.75rem; border-right: 1px solid var(--border); }
        .detail-right { padding: 1.75rem; }
        .detail-cat-badge {
          font-size: .72rem; font-weight: 700; text-transform: uppercase;
          letter-spacing: .1em; color: var(--gold-dim, #8a6f34);
          background: var(--gold-pale); border: 1px solid rgba(201,168,76,.25);
          padding: .25rem .65rem; border-radius: 5px;
          display: inline-block; margin-bottom: .65rem;
        }
        .detail-title {
          font-family: 'Instrument Serif', serif;
          font-size: 1.75rem; font-weight: 400;
          color: var(--brand); margin-bottom: .5rem;
          line-height: 1.2;
        }
        .detail-price {
          font-family: 'Instrument Serif', serif;
          font-size: 2rem; color: #15803d; margin-bottom: .25rem;
        }
        .detail-desc { font-size: .9rem; color: #57534e; line-height: 1.7; margin-bottom: 1.25rem; }
        .detail-specs-grid {
          display: grid; grid-template-columns: repeat(2,1fr); gap: .5rem;
          margin-bottom: 1.25rem;
        }
        .detail-spec {
          display: flex; align-items: center; gap: .5rem;
          font-size: .82rem; color: #44403c;
          background: var(--surface); border: 1px solid var(--border);
          border-radius: 7px; padding: .5rem .75rem;
        }
        .detail-spec::before { content: '✓'; color: var(--green); font-weight: 800; }

        /* Seller card */
        .seller-card {
          background: var(--surface);
          border: 1px solid var(--border);
          border-radius: 12px; padding: 1.1rem;
          margin-bottom: 1rem;
        }
        .seller-header { display: flex; align-items: center; gap: .75rem; margin-bottom: .75rem; }
        .seller-avatar {
          width: 46px; height: 46px;
          background: linear-gradient(135deg, var(--brand) 0%, #2d3448 100%);
          border-radius: 50%;
          display: flex; align-items: center; justify-content: center;
          font-family: 'Instrument Serif', serif;
          font-size: 1.2rem; color: var(--gold-light);
          flex-shrink: 0;
        }
        .seller-info {}
        .seller-name { font-weight: 700; font-size: .92rem; color: var(--brand); display: flex; align-items: center; gap: .4rem; }
        .verified-chip {
          background: #dcfce7; color: #16a34a;
          font-size: .65rem; font-weight: 700; padding: .15rem .45rem;
          border-radius: 4px; letter-spacing: .05em;
        }
        .seller-since { font-size: .75rem; color: var(--muted); }

        /* Inquiry steps */
        .inquiry-steps {
          display: flex; gap: .35rem; margin-bottom: 1rem;
        }
        .inq-step {
          flex: 1; height: 3px; border-radius: 2px;
          background: var(--border); transition: background .3s;
        }
        .inq-step.done { background: var(--green); }
        .inq-step.active { background: var(--gold); }

        .form-field { margin-bottom: .85rem; }
        .form-label {
          display: block; font-size: .75rem; font-weight: 700;
          text-transform: uppercase; letter-spacing: .06em;
          color: var(--muted); margin-bottom: .35rem;
        }
        .form-input, .form-textarea {
          width: 100%; padding: .65rem .9rem;
          border: 1.5px solid var(--border);
          border-radius: 8px;
          font-family: 'Plus Jakarta Sans', sans-serif;
          font-size: .88rem; color: var(--brand);
          background: var(--surface); outline: none;
          transition: border-color .2s, box-shadow .2s;
        }
        .form-input:focus, .form-textarea:focus {
          border-color: var(--gold);
          box-shadow: 0 0 0 3px rgba(201,168,76,.12);
          background: var(--white);
        }
        .form-textarea { resize: vertical; min-height: 80px; }

        .btn-submit-full {
          width: 100%;
          background: var(--brand); color: var(--gold-light);
          border: none; cursor: pointer;
          padding: .8rem 1.5rem;
          border-radius: 9px;
          font-family: 'Plus Jakarta Sans', sans-serif;
          font-size: .88rem; font-weight: 700;
          letter-spacing: .03em;
          transition: all .25s;
          display: flex; align-items: center; justify-content: center; gap: .4rem;
        }
        .btn-submit-full:hover { background: #2d3448; transform: translateY(-1px); }
        .btn-wa-full {
          width: 100%;
          background: #25d366; color: #fff;
          border: none; cursor: pointer;
          padding: .75rem 1.5rem;
          border-radius: 9px;
          font-family: 'Plus Jakarta Sans', sans-serif;
          font-size: .88rem; font-weight: 700;
          transition: all .25s; margin-top: .5rem;
          display: flex; align-items: center; justify-content: center; gap: .4rem;
          text-decoration: none;
        }
        .btn-wa-full:hover { background: #1db954; transform: translateY(-1px); }

        /* ── CART DRAWER ── */
        .cart-backdrop {
          position: fixed; inset: 0; z-index: 300;
          background: rgba(0,0,0,.5); backdrop-filter: blur(2px);
        }
        .cart-drawer {
          position: fixed; top: 0; right: 0; bottom: 0; z-index: 301;
          width: 100%; max-width: 400px;
          background: var(--white);
          box-shadow: -8px 0 40px rgba(0,0,0,.15);
          display: flex; flex-direction: column;
          transform: translateX(100%);
          transition: transform .3s cubic-bezier(.25,.8,.25,1);
        }
        .cart-drawer.open { transform: translateX(0); }
        .cart-header {
          padding: 1.25rem 1.5rem;
          border-bottom: 1px solid var(--border);
          display: flex; align-items: center; justify-content: space-between;
        }
        .cart-title { font-family: 'Instrument Serif', serif; font-size: 1.3rem; }
        .cart-close { background: var(--surface); border: none; cursor: pointer; width: 32px; height: 32px; border-radius: 50%; font-size: .9rem; }
        .cart-body { flex: 1; overflow-y: auto; padding: 1.25rem 1.5rem; }
        .cart-item {
          display: flex; gap: .75rem; padding: .9rem 0;
          border-bottom: 1px solid var(--border);
        }
        .cart-item-img {
          width: 60px; height: 50px; flex-shrink: 0;
          background: var(--surface); border-radius: 7px; overflow: hidden;
        }
        .cart-item-img img { width: 100%; height: 100%; object-fit: cover; }
        .cart-item-info { flex: 1; }
        .cart-item-name { font-weight: 700; font-size: .85rem; margin-bottom: .2rem; }
        .cart-item-price { font-size: .8rem; color: #15803d; font-weight: 600; }
        .cart-item-remove { background: none; border: none; cursor: pointer; color: #ef4444; font-size: .85rem; padding: .2rem; }
        .cart-footer { padding: 1.25rem 1.5rem; border-top: 1px solid var(--border); }
        .cart-total { display: flex; justify-content: space-between; margin-bottom: 1rem; }
        .cart-total-label { font-size: .85rem; color: var(--muted); }
        .cart-total-val { font-family: 'Instrument Serif', serif; font-size: 1.2rem; color: #15803d; }
        .btn-checkout {
          width: 100%;
          background: var(--gold); color: var(--brand);
          border: none; cursor: pointer;
          padding: .85rem;
          border-radius: 9px;
          font-family: 'Plus Jakarta Sans', sans-serif;
          font-size: .9rem; font-weight: 800;
          transition: all .2s;
        }
        .btn-checkout:hover { background: var(--gold-light); }

        /* ── TOAST ── */
        .toast {
          position: fixed; bottom: 1.5rem; left: 50%; z-index: 999;
          transform: translateX(-50%) translateY(20px);
          background: #1a1a1a; color: #fff;
          padding: .7rem 1.5rem;
          border-radius: 100px;
          font-size: .85rem; font-weight: 600;
          box-shadow: 0 8px 32px rgba(0,0,0,.25);
          opacity: 0;
          transition: all .3s;
          white-space: nowrap;
          pointer-events: none;
        }
        .toast.show { opacity: 1; transform: translateX(-50%) translateY(0); }

        /* ── FOOTER HEADER NAV ── */
        .header-nav-right {
          display: flex; align-items: center; gap: .75rem; margin-left: auto;
        }
        .header-link {
          font-size: .8rem; font-weight: 600; color: rgba(255,255,255,.6);
          text-decoration: none; padding: .3rem .5rem;
          border-radius: 5px; transition: color .2s;
          white-space: nowrap;
        }
        .header-link:hover { color: var(--gold-light); }
        .header-cart-btn {
          position: relative;
          background: rgba(255,255,255,.07);
          border: 1px solid rgba(255,255,255,.12);
          color: rgba(255,255,255,.8);
          cursor: pointer;
          padding: .45rem .9rem;
          border-radius: 7px;
          font-family: 'Plus Jakarta Sans', sans-serif;
          font-size: .82rem; font-weight: 600;
          transition: all .2s;
          display: flex; align-items: center; gap: .4rem;
        }
        .header-cart-btn:hover { background: rgba(255,255,255,.13); border-color: rgba(201,168,76,.4); color: var(--gold-light); }
        .cart-badge {
          background: var(--gold); color: var(--brand);
          font-size: .65rem; font-weight: 800;
          min-width: 17px; height: 17px;
          border-radius: 100px;
          display: flex; align-items: center; justify-content: center;
          padding: 0 4px;
        }

        /* ── EMPTY ── */
        .empty-wrap {
          padding: 5rem 2rem; text-align: center;
        }
        .empty-icon { font-size: 3.5rem; opacity: .15; margin-bottom: .75rem; }
        .empty-text { font-family: 'Instrument Serif', serif; font-size: 1.4rem; color: var(--muted); margin-bottom: .5rem; }
        .empty-sub { font-size: .85rem; color: #a8a29e; }

        /* ── STICKY BOTTOM CTA (mobile) ── */
        .sticky-cta {
          position: fixed; bottom: 0; left: 0; right: 0; z-index: 90;
          background: var(--brand); border-top: 1px solid rgba(255,255,255,.08);
          padding: .75rem 1.25rem;
          display: flex; gap: .5rem;
        }
        .sticky-cta button, .sticky-cta a {
          flex: 1;
          background: var(--gold); color: var(--brand);
          border: none; cursor: pointer;
          padding: .7rem;
          border-radius: 8px;
          font-family: 'Plus Jakarta Sans', sans-serif;
          font-size: .85rem; font-weight: 800;
          text-align: center; text-decoration: none;
          display: flex; align-items: center; justify-content: center; gap: .3rem;
          transition: all .2s;
        }

        /* ── RESPONSIVE ── */
        @media (max-width: 768px) {
          .detail-body { grid-template-columns: 1fr; }
          .detail-right { border-top: 1px solid var(--border); }
          .search-box { flex-wrap: wrap; }
          .search-location-btn { display: none; }
          .header-link { display: none; }
          .listings-grid { grid-template-columns: repeat(auto-fill, minmax(165px,1fr)); gap: .75rem; }
          .list-mode .card-img { width: 130px; min-width: 130px; }
          .toolbar-right { display: none; }
          .hero-stats-row { gap: 1rem; }
          .hero-stat-divider { display: none; }
          .hero-search-section { padding: 2.5rem 1rem 3rem; min-height: auto; }
          .hero-quick-cats { gap: .4rem; }
        }
        @media (max-width: 480px) {
          .listings-grid { grid-template-columns: repeat(2, 1fr); gap: .65rem; }
          .card-body { padding: .75rem; }
          .card-title { font-size: .85rem; }
          .card-price { font-size: 1.1rem; }
          .card-actions { flex-direction: column; }
          .btn-whatsapp { display: none; }
        }
        @media (min-width: 769px) {
          .sticky-cta { display: none; }
        }
      `}</style>

      {/* ── TOAST ── */}
      <div className={`toast ${toast ? "show" : ""}`}>{toast?.msg}</div>

      {/* ── HEADER ── */}
      <header className="jiji-header">
        <div className="jiji-header-top">
          <div className="logo">
            <span className="logo-name">Vincevic</span>
            <span className="logo-sub">Shades · Kenya</span>
          </div>
          <div className="header-nav-right">
            <Link href="/services" className="header-link">Services</Link>
            <Link href="/portfolio" className="header-link">Portfolio</Link>
            <Link href="/about" className="header-link">About</Link>
            <Link href="/contact" className="header-link">Contact</Link>
            <button className="header-cart-btn" onClick={() => setShowCart(true)}>
              🛒 Quote List
              {cartItems.length > 0 && <span className="cart-badge">{cartItems.length}</span>}
            </button>
          </div>
        </div>
      </header>

      {/* ── HERO SEARCH ── */}
      <section className="hero-search-section">
        <div className="hero-search-inner">

          <div style={{ textAlign: "center", marginBottom: "1.1rem" }}>
            <span className="hero-eyebrow">
              <span className="hero-eyebrow-dot" />
              Vincevic shades
            </span>
          </div>

          <h1 className="hero-title">
            <em>Custom Fabricated</em>
            <span className="hero-title-line2">Shades, Gazebos & Security Gates</span>
          </h1>
          <p className="hero-sub">
            Get premium outdoor structures designed, fabricated and installed across Kenya.
          </p>

         

          {/* Search box */}
          <div className="search-box">
            <button className="search-location-btn" onClick={detectLocation}>
               {locationDetecting ? "Detecting…" : location}
              <span style={{ opacity: .4, fontSize: ".75rem" }}>▾</span>
            </button>
            <div className="search-divider" />
            <div className="search-input-wrap">
              <input
                ref={searchRef}
                type="text"
                placeholder="Search car shades, gazebos, gates…"
                value={search}
                onChange={e => setSearch(e.target.value)}
                onKeyDown={e => e.key === "Enter" && searchRef.current?.blur()}
              />
            </div>
            <button className="search-submit" onClick={() => {}}>
              🔍 Search
            </button>
          </div>

         

        </div>
      </section>

      {/* ── CATEGORIES ── */}
      <div className="cat-scroll-wrap">
        <div className="cat-scroll-inner">
          {CATEGORIES.map(c => (
            <button
              key={c.id}
              className={`cat-pill ${category === c.id ? "active" : ""}`}
              onClick={() => setCategory(c.id)}
            >
              {c.label}
              <span className="cat-count">{c.count}</span>
            </button>
          ))}
        </div>
      </div>

      {/* ── FILTER PANEL ── */}
      <div style={{ background: "#fff", borderBottom: "1px solid var(--border)" }}>
        <div style={{ maxWidth: 1400, margin: "0 auto", padding: "0 1.25rem" }}>
          <div style={{ display: "flex", gap: ".5rem", paddingTop: ".75rem" }}>
            <button className={`filter-btn ${filterOpen ? "open" : ""}`} onClick={() => setFilterOpen(!filterOpen)}>
               Filters {filterOpen ? "▲" : "▼"}
            </button>
            {(priceMin || priceMax || location !== "All Kenya") && (
              <button className="btn-reset" onClick={() => { setPriceMin(""); setPriceMax(""); setLocation("All Kenya"); }}>
                Clear filters 
              </button>
            )}
          </div>
          <div className={`filter-panel ${filterOpen ? "open" : ""}`} style={{ background: "transparent" }}>
            <div className="filter-panel-inner">
              <div className="filter-group">
                <label className="filter-label">Location</label>
                <select className="filter-input" value={location} onChange={e => setLocation(e.target.value)}>
                  <option>All Kenya</option>
                  {LOCATIONS.map(l => <option key={l}>{l}</option>)}
                </select>
              </div>
              <div className="filter-group">
                <label className="filter-label">Min Price (KSh)</label>
                <input className="filter-input" type="number" placeholder="e.g. 40000" value={priceMin} onChange={e => setPriceMin(e.target.value)} />
              </div>
              <div className="filter-group">
                <label className="filter-label">Max Price (KSh)</label>
                <input className="filter-input" type="number" placeholder="e.g. 200000" value={priceMax} onChange={e => setPriceMax(e.target.value)} />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── TOOLBAR ── */}
      <div className="toolbar">
        <span className="results-label">
          Showing <strong>{filtered.length}</strong> {filtered.length === 1 ? "listing" : "listings"}
          {category !== "all" && <> in <strong>{CATEGORIES.find(c => c.id === category)?.label}</strong></>}
        </span>
        <div className="toolbar-right">
          <select className="sort-select" value={sort} onChange={e => setSort(e.target.value)}>
            {SORT_OPTIONS.map(o => <option key={o.id} value={o.id}>{o.label}</option>)}
          </select>
          <button className={`view-btn ${viewMode === "grid" ? "active" : ""}`} onClick={() => setViewMode("grid")}>⊞</button>
          <button className={`view-btn ${viewMode === "list" ? "active" : ""}`} onClick={() => setViewMode("list")}>☰</button>
        </div>
      </div>

      {/* ── LISTINGS ── */}
      <div className="main-layout">
        {filtered.length === 0 ? (
          <div className="empty-wrap">
            <div className="empty-icon"></div>
            <p className="empty-text">No listings found</p>
            <p className="empty-sub">Try adjusting your filters or search query</p>
          </div>
        ) : (
          <>
            {/* Featured */}
            {featured.length > 0 && (
              <>
                <div className="featured-label"> Featured Listings</div>
                <div className={`listings-grid ${viewMode === "list" ? "list-mode" : ""}`}>
                  {featured.map(l => <ListingCard key={l.id} item={l} viewMode={viewMode} saved={savedItems.has(l.id)} onSave={() => toggleSave(l.id)} onOpen={() => { setSelectedListing(l); setStep(1); }} onCart={() => addToCart(l)} />)}
                </div>
              </>
            )}

            {/* Regular */}
            {regular.length > 0 && (
              <>
                {featured.length > 0 && (
                  <div className="featured-label" style={{ color: "var(--muted)", marginTop: "1.5rem" }}>All Listings</div>
                )}
                <div className={`listings-grid ${viewMode === "list" ? "list-mode" : ""}`}>
                  {regular.map(l => <ListingCard key={l.id} item={l} viewMode={viewMode} saved={savedItems.has(l.id)} onSave={() => toggleSave(l.id)} onOpen={() => { setSelectedListing(l); setStep(1); }} onCart={() => addToCart(l)} />)}
                </div>
              </>
            )}
          </>
        )}
      </div>

      {/* ── DETAIL MODAL ── */}
      {selectedListing && (
        <div className="modal-overlay" onClick={e => { if (e.target === e.currentTarget) setSelectedListing(null); }}>
          <div className="detail-modal" onClick={e => e.stopPropagation()}>
            <div className="detail-img">
              {selectedListing.image ? (
                <img src={selectedListing.image} alt={selectedListing.title} onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }} />
              ) : (
                <div className="detail-img-placeholder"><span>{selectedListing.placeholder}</span></div>
              )}
              <button className="detail-close" onClick={() => setSelectedListing(null)}>✕</button>
              {selectedListing.badge && (
                <span className={`listing-badge badge-${selectedListing.badge.toLowerCase().replace(" ", "")}`}
                  style={{ position: "absolute", top: 14, left: 14, fontSize: ".72rem" }}>
                  {selectedListing.badge}
                </span>
              )}
            </div>

            <div className="detail-body">
              <div className="detail-left">
                <span className="detail-cat-badge">{selectedListing.category}</span>
                <h2 className="detail-title">{selectedListing.title}</h2>

                <div style={{ display: "flex", alignItems: "center", gap: ".75rem", marginBottom: ".75rem", flexWrap: "wrap" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: ".4rem" }}>
                    <Stars rating={selectedListing.rating} />
                    <span style={{ fontWeight: 700, fontSize: ".85rem" }}>{selectedListing.rating}</span>
                    <span style={{ color: "var(--muted)", fontSize: ".8rem" }}>({selectedListing.reviews} reviews)</span>
                  </div>
                  <span style={{ color: "var(--muted)", fontSize: ".78rem" }}> {selectedListing.views} views</span>
                  <span style={{ color: "var(--muted)", fontSize: ".78rem" }}> {selectedListing.location}</span>
                </div>

                <div className="detail-price">
                  {selectedListing.priceDisplay}
                  {selectedListing.negotiable && <span style={{ fontSize: ".8rem", color: "#16a34a", background: "#f0fdf4", padding: ".15rem .5rem", borderRadius: "5px", marginLeft: ".5rem", fontFamily: "Plus Jakarta Sans, sans-serif", fontWeight: 700 }}>Negotiable</span>}
                </div>

                <p className="detail-desc" style={{ marginTop: ".75rem" }}>{selectedListing.desc}</p>

                <div style={{ fontWeight: 700, fontSize: ".8rem", textTransform: "uppercase", letterSpacing: ".06em", color: "var(--muted)", marginBottom: ".5rem" }}>Key Features</div>
                <div className="detail-specs-grid">
                  {selectedListing.specs.map((s: string) => <div key={s} className="detail-spec">{s}</div>)}
                </div>

                <div style={{ background: "#fffbf0", border: "1px solid rgba(201,168,76,.2)", borderRadius: "9px", padding: ".85rem 1rem", marginTop: ".75rem" }}>
                  <div style={{ fontSize: ".75rem", fontWeight: 700, color: "#8a6f34", textTransform: "uppercase", letterSpacing: ".06em", marginBottom: ".3rem" }}>Free Site Visit Included</div>
                  <div style={{ fontSize: ".83rem", color: "#78716c" }}>We visit your site, assess requirements, and provide a detailed custom quote at no cost.</div>
                </div>
              </div>

              <div className="detail-right">
                <div className="seller-card">
                  <div className="seller-header">
                    <div className="seller-avatar">V</div>
                    <div className="seller-info">
                      <div className="seller-name">
                        {selectedListing.seller.name}
                        <span className="verified-chip"> VERIFIED</span>
                      </div>
                      <div className="seller-since">Serving Kenya since {selectedListing.seller.since}</div>
                    </div>
                  </div>
                  <div style={{ display: "flex", gap: "1rem", paddingTop: ".75rem", borderTop: "1px solid var(--border)" }}>
                    {[[ "500+", "Projects"], [ "4.8", "Rating"], [ "< 2hr", "Response"]].map(([icon, val, lbl]) => (
                      <div key={lbl} style={{ textAlign: "center", flex: 1 }}>
                        <div style={{ fontSize: "1rem" }}>{icon}</div>
                        <div style={{ fontWeight: 800, fontSize: ".88rem", color: "var(--brand)" }}>{val}</div>
                        <div style={{ fontSize: ".68rem", color: "var(--muted)", textTransform: "uppercase", letterSpacing: ".06em" }}>{lbl}</div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Inquiry form */}
                <div style={{ fontWeight: 700, fontSize: ".82rem", color: "var(--brand)", marginBottom: ".75rem" }}>
                  Send Quick Inquiry
                </div>
                <div className="inquiry-steps">
                  {[1,2,3].map(n => (
                    <div key={n} className={`inq-step ${step > n ? "done" : step === n ? "active" : ""}`} />
                  ))}
                </div>

                {step === 1 && (
                  <div>
                    <div className="form-field">
                      <label className="form-label">Your Name *</label>
                      <input className="form-input" placeholder="Full name" value={form.name} onChange={e => setForm({...form, name: e.target.value})} />
                    </div>
                    <div className="form-field">
                      <label className="form-label">Phone Number *</label>
                      <input className="form-input" placeholder="07XX XXX XXX" value={form.phone} onChange={e => setForm({...form, phone: e.target.value})} />
                    </div>
                    <button className="btn-submit-full" onClick={() => { if(form.name && form.phone) setStep(2); }}>
                      Next → Details
                    </button>
                  </div>
                )}
                {step === 2 && (
                  <div>
                    <div className="form-field">
                      <label className="form-label">Your Message *</label>
                      <textarea className="form-textarea" placeholder={`Tell us about your project for ${selectedListing.title}…`} value={form.message} onChange={e => setForm({...form, message: e.target.value})} />
                    </div>
                    <button className="btn-submit-full" onClick={() => { if(form.message) setStep(3); }}>
                      Submit Inquiry →
                    </button>
                    <button style={{ width: "100%", background: "none", border: "none", color: "var(--muted)", fontSize: ".8rem", cursor: "pointer", marginTop: ".5rem", padding: ".5rem" }} onClick={() => setStep(1)}>← Back</button>
                  </div>
                )}
                {step === 3 && (
                  <div style={{ textAlign: "center", padding: "1rem 0" }}>
                    <div style={{ fontSize: "2.5rem", marginBottom: ".5rem" }}>✅</div>
                    <div style={{ fontWeight: 800, fontSize: "1rem", color: "var(--brand)", marginBottom: ".3rem" }}>Inquiry Sent!</div>
                    <div style={{ fontSize: ".83rem", color: "var(--muted)", marginBottom: "1rem" }}>We'll call you within 2 hours</div>
                    <button className="btn-submit-full" onClick={() => { setStep(1); setForm({name:"",phone:"",message:""}); }}>Send Another</button>
                  </div>
                )}

                <div style={{ display: "flex", alignItems: "center", gap: ".75rem", margin: ".85rem 0", color: "var(--muted)", fontSize: ".72rem", textTransform: "uppercase", letterSpacing: ".08em" }}>
                  <div style={{ flex: 1, height: 1, background: "var(--border)" }} />
                  Or
                  <div style={{ flex: 1, height: 1, background: "var(--border)" }} />
                </div>

                <a href="https://wa.me/254720120616" target="_blank" rel="noopener noreferrer" className="btn-wa-full">
                  💬 WhatsApp Now — 0720 120 616
                </a>
                <a href="tel:0720120616" style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: ".4rem", marginTop: ".5rem", padding: ".65rem", borderRadius: "9px", border: "1.5px solid var(--border)", color: "var(--brand)", textDecoration: "none", fontSize: ".85rem", fontWeight: 700, transition: "all .2s" }}>
                  📞 Call 0720 120 616
                </a>

                <button style={{ width: "100%", marginTop: ".75rem", padding: ".65rem", background: "var(--gold-pale)", border: "1.5px solid rgba(201,168,76,.3)", borderRadius: "9px", fontFamily: "Plus Jakarta Sans, sans-serif", fontSize: ".82rem", fontWeight: 700, cursor: "pointer", color: "var(--brand)" }}
                  onClick={() => { addToCart(selectedListing); setSelectedListing(null); }}>
                  🛒 Add to Quote List
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ── CART DRAWER ── */}
      {showCart && <div className="cart-backdrop" onClick={() => setShowCart(false)} />}
      <div className={`cart-drawer ${showCart ? "open" : ""}`}>
        <div className="cart-header">
          <span className="cart-title">Quote List ({cartItems.length})</span>
          <button className="cart-close" onClick={() => setShowCart(false)}>✕</button>
        </div>
        <div className="cart-body">
          {cartItems.length === 0 ? (
            <div style={{ textAlign: "center", padding: "3rem 1rem", color: "var(--muted)" }}>
              <div style={{ fontSize: "2.5rem", marginBottom: ".5rem" }}>🛒</div>
              <div style={{ fontWeight: 600 }}>No items yet</div>
              <div style={{ fontSize: ".82rem", marginTop: ".25rem" }}>Add services to request a combined quote</div>
            </div>
          ) : (
            cartItems.map(item => (
              <div key={item.id} className="cart-item">
                <div className="cart-item-img">
                  {item.image ? <img src={item.image} alt={item.title} /> : <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.2rem", opacity: .3 }}>{item.placeholder}</div>}
                </div>
                <div className="cart-item-info">
                  <div className="cart-item-name">{item.title}</div>
                  <div className="cart-item-price">{item.priceDisplay}</div>
                </div>
                <button className="cart-item-remove" onClick={() => setCartItems(prev => prev.filter(i => i.id !== item.id))}>✕</button>
              </div>
            ))
          )}
        </div>
        {cartItems.length > 0 && (
          <div className="cart-footer">
            <div className="cart-total">
              <span className="cart-total-label">Estimated Total</span>
              <span className="cart-total-val">{formatPrice(cartItems.reduce((s, i) => s + i.price, 0))}</span>
            </div>
            <a
              href={buildWhatsAppQuote()}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-checkout"
              style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: ".5rem", textDecoration: "none", background: "#25d366", color: "#fff", marginBottom: ".5rem" }}
              onClick={() => { showToast("Opening WhatsApp…"); }}
            >
              💬 Send Quote via WhatsApp
            </a>
            <button className="btn-checkout" onClick={() => { showToast("📋 Quote request submitted! We'll call you shortly."); setCartItems([]); setShowCart(false); }}>
              Request Callback Instead →
            </button>
          </div>
        )}
      </div>

      {/* ── STICKY MOBILE CTA ── */}
      <div className="sticky-cta">
        <button onClick={() => setShowCart(true)}>
          🛒 Quote ({cartItems.length})
        </button>
        <a href="https://wa.me/254720120616" target="_blank" rel="noopener noreferrer">
          💬 WhatsApp
        </a>
        <a href="tel:0720120616">
          📞 Call Now
        </a>
      </div>
    </>
  );
}

// ─── LISTING CARD COMPONENT ──────────────────────────────────────────────────
function ListingCard({ item, viewMode, saved, onSave, onOpen, onCart }: { 
  item: any; 
  viewMode: string; 
  saved: boolean; 
  onSave: () => void; 
  onOpen: () => void; 
  onCart: () => void;
}) {
  const badgeClass: Record<string, string> = {
    BESTSELLER: "badge-bestseller", "TOP RATED": "badge-top",
    POPULAR: "badge-popular", FEATURED: "badge-featured",
    LUXURY: "badge-luxury", SECURE: "badge-secure"
  };
  const badgeClassName = badgeClass[item.badge] || "badge-featured";

  return (
    <div className={`listing-card ${viewMode === "list" ? "list-mode" : ""}`} onClick={onOpen}>
      {item.badge && <span className={`listing-badge ${badgeClassName}`}>{item.badge}</span>}
      <button className={`save-btn ${saved ? "saved" : ""}`} onClick={e => { e.stopPropagation(); onSave(); }}>
        {saved ? "❤️" : "🤍"}
      </button>

      <div className="card-img">
        {item.image ? (
          <img src={item.image} alt={item.title} onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }} />
        ) : (
          <div className="card-img-placeholder">
            <span>{item.placeholder}</span>
            <small>{item.category}</small>
          </div>
        )}
        {/* {item.verified && (
          <div className="verified-overlay">Verified Provider</div>
        )} */}
      </div>

      <div className="card-body">
        <div className="card-location"> {item.location}</div>
        <h3 className="card-title">{item.title}</h3>
        <p className="card-desc">{item.desc}</p>

        <div className="card-specs">
          {item.specs.slice(0, 3).map((s: string) => <span key={s} className="spec-chip">{s}</span>)}
        </div>

        <div className="card-rating-row">
          <Stars rating={item.rating} />
          <span className="rating-num">{item.rating}</span>
          <span className="rating-count">({item.reviews})</span>
        </div>

        <div className="card-price-row">
          <span className="card-price">{item.priceDisplay}</span>
          {item.negotiable && <span className="card-nego">Negotiable</span>}
        </div>

        <div className="card-actions" onClick={e => e.stopPropagation()}>
          <button className="btn-contact" onClick={onOpen}>
             Inquire
          </button>
          <a href="https://wa.me/254720120616" target="_blank" rel="noopener noreferrer" className="btn-whatsapp" onClick={e => e.stopPropagation()}>
            💬
          </a>
          <button className="btn-cart" onClick={e => { e.stopPropagation(); onCart(); }}>
            🛒
          </button>
        </div>
      </div>
    </div>
  );
}