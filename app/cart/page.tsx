'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useCart } from '@/lib/CartContext';

export default function CartPage() {
  const { cart, removeFromCart, updateQuantity, clearCart, cartTotal } = useCart();
  const [showCheckout, setShowCheckout] = useState(false);
  const [customerInfo, setCustomerInfo] = useState({
    name: '',
    phone: '',
    email: '',
    notes: '',
  });
  const [submitting, setSubmitting] = useState(false);

  const handleCheckout = async (method: 'whatsapp' | 'email' | 'call') => {
    if (!customerInfo.name || !customerInfo.phone) {
      alert('Please fill in your name and phone number');
      return;
    }

    if (cart.length === 0) {
      alert('Your cart is empty');
      return;
    }

    try {
      setSubmitting(true);

      // Create order
      const orderData = {
        customerName: customerInfo.name,
        customerPhone: customerInfo.phone,
        customerEmail: customerInfo.email,
        items: cart.map(item => ({
          serviceId: item._id,
          serviceName: item.name,
          price: item.price,
          quantity: item.quantity,
        })),
        totalAmount: cartTotal,
        notes: customerInfo.notes,
      };

      const response = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(orderData),
      });

      const data = await response.json();

      if (data.success) {
        const order = data.data;
        
        // Prepare order message
        const itemsList = cart.map(item => 
          `${item.quantity}x ${item.name} - ${item.price}`
        ).join('\n');
        
        const message = `
*New Order Request*
Order #: ${order.orderNumber}

*Customer Details:*
Name: ${customerInfo.name}
Phone: ${customerInfo.phone}
${customerInfo.email ? `Email: ${customerInfo.email}` : ''}

*Services Requested:*
${itemsList}

*Total: ${cartTotal}*

${customerInfo.notes ? `Notes: ${customerInfo.notes}` : ''}
        `.trim();

        if (method === 'whatsapp') {
          const whatsappUrl = `https://wa.me/254720120616?text=${encodeURIComponent(message)}`;
          window.open(whatsappUrl, '_blank');
        } else if (method === 'email') {
          const emailSubject = `Service Request - Order ${order.orderNumber}`;
          const emailBody = message.replace(/\*/g, '');
          window.location.href = `mailto:info@vincevicshades.co.ke?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBody)}`;
        } else if (method === 'call') {
          alert(`Please call us at 0720 120 616 with your order number: ${order.orderNumber}`);
          window.location.href = 'tel:0720120616';
        }

        // Clear cart after successful order
        clearCart();
        alert('Order placed successfully! We will contact you shortly.');
        setShowCheckout(false);
        setCustomerInfo({ name: '', phone: '', email: '', notes: '' });
      } else {
        alert('Failed to place order. Please try again.');
      }
    } catch (error) {
      console.error('Error placing order:', error);
      alert('An error occurred. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

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

        .page-hero {
          background: var(--ink);
          padding: 3rem 2rem 2rem;
          text-align: center;
          border-bottom: 1px solid rgba(201,168,76,0.15);
        }
        .page-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: 3rem; font-weight: 700;
          color: var(--white); margin-bottom: 0.5rem;
        }

        .cart-container {
          max-width: 1280px;
          margin: 3rem auto;
          padding: 0 2rem;
          display: grid;
          grid-template-columns: 2fr 1fr;
          gap: 2rem;
        }

        .cart-items {
          background: var(--white);
          padding: 2rem;
          border: 1px solid rgba(201,168,76,0.18);
          border-radius: 4px;
        }
        .cart-item {
          display: grid;
          grid-template-columns: 100px 1fr auto;
          gap: 1.5rem;
          padding: 1.5rem 0;
          border-bottom: 1px solid rgba(201,168,76,0.1);
        }
        .cart-item:last-child {
          border-bottom: none;
        }
        .item-image {
          width: 100px;
          height: 100px;
          background: linear-gradient(135deg, #f0ece4 0%, #e8e4d8 100%);
          border-radius: 4px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 2.5rem;
        }
        .item-details h3 {
          font-family: 'Cormorant Garamond', serif;
          font-size: 1.3rem;
          color: var(--ink);
          margin-bottom: 0.5rem;
        }
        .item-price {
          font-size: 1.1rem;
          font-weight: 600;
          color: var(--gold);
        }
        .quantity-controls {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          margin-top: 0.75rem;
        }
        .qty-btn {
          width: 32px;
          height: 32px;
          border: 1px solid rgba(201,168,76,0.3);
          background: var(--white);
          color: var(--ink);
          border-radius: 4px;
          cursor: pointer;
          font-weight: 600;
        }
        .qty-btn:hover {
          background: var(--gold);
          border-color: var(--gold);
        }
        .remove-btn {
          padding: 0.5rem 1rem;
          background: transparent;
          color: #dc2626;
          border: 1px solid #dc2626;
          border-radius: 4px;
          cursor: pointer;
          font-size: 0.85rem;
        }
        .remove-btn:hover {
          background: #dc2626;
          color: white;
        }

        .cart-summary {
          background: var(--white);
          padding: 2rem;
          border: 1px solid rgba(201,168,76,0.18);
          border-radius: 4px;
          height: fit-content;
          position: sticky;
          top: 90px;
        }
        .summary-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: 1.8rem;
          color: var(--ink);
          margin-bottom: 1.5rem;
        }
        .summary-row {
          display: flex;
          justify-content: space-between;
          padding: 0.75rem 0;
          border-bottom: 1px solid rgba(201,168,76,0.1);
        }
        .summary-total {
          font-size: 1.5rem;
          font-weight: 700;
          color: var(--gold);
          margin-top: 1rem;
        }
        .checkout-btn {
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
          margin-top: 1.5rem;
          transition: all 0.25s;
        }
        .checkout-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 28px rgba(201,168,76,0.5);
        }

        .checkout-modal {
          position: fixed;
          inset: 0;
          background: rgba(0,0,0,0.8);
          z-index: 1000;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 2rem;
        }
        .modal-content {
          background: var(--white);
          max-width: 600px;
          width: 100%;
          max-height: 90vh;
          overflow-y: auto;
          border-radius: 4px;
          padding: 2rem;
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
        }
        .form-input, .form-textarea {
          width: 100%;
          padding: 0.85rem;
          border: 1px solid rgba(201,168,76,0.3);
          border-radius: 4px;
          font-family: 'DM Sans', sans-serif;
          font-size: 0.95rem;
        }
        .form-textarea {
          resize: vertical;
          min-height: 80px;
        }
        .checkout-methods {
          display: grid;
          gap: 1rem;
          margin-top: 1.5rem;
        }
        .method-btn {
          padding: 1rem;
          border: 2px solid rgba(201,168,76,0.3);
          background: var(--white);
          border-radius: 4px;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 1rem;
          transition: all 0.2s;
        }
        .method-btn:hover {
          border-color: var(--gold);
          background: rgba(201,168,76,0.05);
        }
        .method-icon {
          font-size: 2rem;
        }

        @media (max-width: 768px) {
          .cart-container {
            grid-template-columns: 1fr;
          }
          .cart-item {
            grid-template-columns: 80px 1fr;
          }
          .item-actions {
            grid-column: 1 / -1;
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
        </div>
      </header>

      {/* Page Hero */}
      <div className="page-hero">
        <h1 className="page-title">Your Cart</h1>
      </div>

      {/* Cart Container */}
      <div className="cart-container">
        {/* Cart Items */}
        <div className="cart-items">
          {cart.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '3rem' }}>
              <p style={{ fontSize: '1.1rem', color: 'var(--slate-light)', marginBottom: '1.5rem' }}>
                Your cart is empty
              </p>
              <Link href="/services">
                <button className="checkout-btn" style={{ maxWidth: '300px', margin: '0 auto' }}>
                  Browse Services
                </button>
              </Link>
            </div>
          ) : (
            <>
              {cart.map(item => (
                <div key={item._id} className="cart-item">
                  <div className="item-image">
                    {item.image && item.image.startsWith('/images/') ? (
                      <Image src={item.image} alt={item.name} width={100} height={100} style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '4px' }} />
                    ) : (
                      <span>{item.image || categoryIcon(item.category)}</span>
                    )}
                  </div>
                  <div className="item-details">
                    <h3>{item.name}</h3>
                    <p className="item-price">{item.price}</p>
                    <div className="quantity-controls">
                      <button className="qty-btn" onClick={() => updateQuantity(item._id, item.quantity - 1)}>−</button>
                      <span style={{ minWidth: '30px', textAlign: 'center', fontWeight: 600 }}>{item.quantity}</span>
                      <button className="qty-btn" onClick={() => updateQuantity(item._id, item.quantity + 1)}>+</button>
                    </div>
                  </div>
                  <div className="item-actions">
                    <button className="remove-btn" onClick={() => removeFromCart(item._id)}>Remove</button>
                  </div>
                </div>
              ))}
              <button 
                onClick={clearCart}
                style={{ marginTop: '1rem', padding: '0.75rem 1.5rem', background: 'transparent', color: '#dc2626', border: '1px solid #dc2626', borderRadius: '4px', cursor: 'pointer' }}
              >
                Clear Cart
              </button>
            </>
          )}
        </div>

        {/* Cart Summary */}
        {cart.length > 0 && (
          <div className="cart-summary">
            <h2 className="summary-title">Order Summary</h2>
            <div className="summary-row">
              <span>Items ({cart.reduce((sum, item) => sum + item.quantity, 0)})</span>
              <span>{cartTotal}</span>
            </div>
            <div className="summary-row summary-total">
              <span>Total</span>
              <span>{cartTotal}</span>
            </div>
            <button className="checkout-btn" onClick={() => setShowCheckout(true)}>
              Proceed to Checkout
            </button>
            <Link href="/services">
              <button style={{ width: '100%', padding: '0.75rem', background: 'transparent', color: 'var(--gold)', border: '1px solid var(--gold)', borderRadius: '4px', marginTop: '1rem', cursor: 'pointer' }}>
                Continue Shopping
              </button>
            </Link>
          </div>
        )}
      </div>

      {/* Checkout Modal */}
      {showCheckout && (
        <div className="checkout-modal" onClick={() => setShowCheckout(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '2rem', marginBottom: '1.5rem' }}>
              Complete Your Order
            </h2>

            <div className="form-group">
              <label className="form-label">Your Name *</label>
              <input
                type="text"
                className="form-input"
                required
                value={customerInfo.name}
                onChange={(e) => setCustomerInfo({ ...customerInfo, name: e.target.value })}
                placeholder="Enter your full name"
              />
            </div>

            <div className="form-group">
              <label className="form-label">Phone Number *</label>
              <input
                type="tel"
                className="form-input"
                required
                value={customerInfo.phone}
                onChange={(e) => setCustomerInfo({ ...customerInfo, phone: e.target.value })}
                placeholder="07XX XXX XXX"
              />
            </div>

            <div className="form-group">
              <label className="form-label">Email (Optional)</label>
              <input
                type="email"
                className="form-input"
                value={customerInfo.email}
                onChange={(e) => setCustomerInfo({ ...customerInfo, email: e.target.value })}
                placeholder="your@email.com"
              />
            </div>

            <div className="form-group">
              <label className="form-label">Additional Notes</label>
              <textarea
                className="form-textarea"
                value={customerInfo.notes}
                onChange={(e) => setCustomerInfo({ ...customerInfo, notes: e.target.value })}
                placeholder="Any special requirements or questions..."
              />
            </div>

            <h3 style={{ fontSize: '1.2rem', marginBottom: '1rem', color: 'var(--ink)' }}>
              Choose how to send your order:
            </h3>

            <div className="checkout-methods">
              <button className="method-btn" onClick={() => handleCheckout('whatsapp')} disabled={submitting}>
                <span className="method-icon">💬</span>
                <div style={{ textAlign: 'left' }}>
                  <div style={{ fontWeight: 600 }}>WhatsApp</div>
                  <div style={{ fontSize: '0.85rem', color: 'var(--slate-light)' }}>Send order via WhatsApp</div>
                </div>
              </button>

              <button className="method-btn" onClick={() => handleCheckout('email')} disabled={submitting}>
                <span className="method-icon">📧</span>
                <div style={{ textAlign: 'left' }}>
                  <div style={{ fontWeight: 600 }}>Email</div>
                  <div style={{ fontSize: '0.85rem', color: 'var(--slate-light)' }}>Send order via Email</div>
                </div>
              </button>

              <button className="method-btn" onClick={() => handleCheckout('call')} disabled={submitting}>
                <span className="method-icon">📞</span>
                <div style={{ textAlign: 'left' }}>
                  <div style={{ fontWeight: 600 }}>Call Us</div>
                  <div style={{ fontSize: '0.85rem', color: 'var(--slate-light)' }}>Place order via phone call</div>
                </div>
              </button>
            </div>

            <button
              onClick={() => setShowCheckout(false)}
              style={{ width: '100%', padding: '0.75rem', background: 'transparent', color: 'var(--slate)', border: '1px solid var(--slate-light)', borderRadius: '4px', marginTop: '1rem', cursor: 'pointer' }}
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
