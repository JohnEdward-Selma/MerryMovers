import React from 'react';

import Header from '../../../shared/components/Header';
import Footer from '../../../shared/components/Footer';
import { useNavigate } from 'react-router-dom';

function BookingCartPage() {
  const [quantities, setQuantities] = React.useState([1, 1, 1, 1]);
  const subtotal = 550;
  const serviceFee = subtotal * 0.15;
  const total = subtotal + serviceFee;
  const navigate = useNavigate();
  return (
    <>
      <Header />
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '32px 0 0 0', display: 'flex', gap: '40px', alignItems: 'flex-start' }}>
        <div style={{ flex: 2 }}>
          <h1 style={{ fontWeight: 700, fontSize: '2rem', marginBottom: '32px' }}>Booking Cart</h1>
          {[...Array(4)].map((_, idx) => (
            <div key={idx} style={{ background: '#ececec', borderRadius: '8px', marginBottom: '18px', display: 'flex', alignItems: 'center', padding: '24px', boxShadow: '0 2px 8px #0001', position: 'relative' }}>
              <div style={{ width: '80px', height: '80px', background: '#a3a3a3', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 600, fontSize: '1rem', color: '#fff', marginRight: '24px' }}>
                Prod Pic
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 700, fontSize: '1.1rem' }}>Packing Service</div>
                <div style={{ color: '#555', fontSize: '1rem' }}>Service</div>
                <div style={{ color: '#888', fontSize: '0.95rem', margin: '6px 0' }}>Complete packing service with materials included</div>
                <div style={{ display: 'flex', alignItems: 'center', marginTop: '12px' }}>
                  <button onClick={() => setQuantities(q => q.map((v, i) => i === idx ? Math.max(1, v - 1) : v))} style={{ background: '#a3a3a3', color: '#fff', border: 'none', borderRadius: '4px', width: '32px', height: '32px', fontSize: '1.1rem', fontWeight: 700, cursor: 'pointer' }}>-</button>
                  <span style={{ margin: '0 16px', fontWeight: 600, fontSize: '1.1rem' }}>{quantities[idx]}</span>
                  <button onClick={() => setQuantities(q => q.map((v, i) => i === idx ? v + 1 : v))} style={{ background: '#a3a3a3', color: '#fff', border: 'none', borderRadius: '4px', width: '32px', height: '32px', fontSize: '1.1rem', fontWeight: 700, cursor: 'pointer' }}>+</button>
                </div>
              </div>
              <div style={{ textAlign: 'right', minWidth: '120px' }}>
                <div style={{ background: '#bdbdbd', color: '#333', borderRadius: '4px', fontSize: '0.9rem', padding: '2px 8px', fontWeight: 500, marginBottom: '8px', float: 'right' }}>Trash</div>
                <div style={{ fontWeight: 700, fontSize: '1.2rem', color: '#0F766E' }}>$400</div>
                <div style={{ color: '#888', fontSize: '0.95rem' }}>$200 each</div>
              </div>
            </div>
          ))}
        </div>
        <div style={{ flex: 1 }}>
          <div style={{ background: '#ececec', borderRadius: '8px', padding: '32px', boxShadow: '0 2px 8px #0001', marginBottom: '24px' }}>
            <h2 style={{ fontWeight: 700, fontSize: '1.3rem', marginBottom: '18px' }}>Booking Summary</h2>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
              <span>Subtotal</span>
              <span style={{ fontWeight: 600 }}>${subtotal.toFixed(2)}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
              <span>Service Fees (15%)</span>
              <span style={{ fontWeight: 600 }}>${serviceFee.toFixed(2)}</span>
            </div>
            <hr style={{ border: 'none', borderTop: '2px solid #888', margin: '16px 0' }} />
            <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 700, fontSize: '1.2rem', marginBottom: '18px' }}>
              <span>Total</span>
              <span style={{ color: '#0F766E' }}>${total.toFixed(2)}</span>
            </div>
            <button style={{ width: '100%', background: '#a3a3a3', color: '#fff', border: 'none', borderRadius: '4px', padding: '12px 0', fontWeight: 700, fontSize: '1.1rem', marginBottom: '12px', cursor: 'pointer' }} onClick={() => navigate('/schedule')}>Proceed to Scheduling</button>
            <button style={{ width: '100%', background: '#a3a3a3', color: '#fff', border: 'none', borderRadius: '4px', padding: '12px 0', fontWeight: 700, fontSize: '1.1rem', cursor: 'pointer' }}>Continue Browsing</button>
            <div style={{ background: '#fff', color: '#888', borderRadius: '4px', padding: '12px', fontSize: '0.95rem', marginTop: '18px' }}>
              Note: Final pricing may vary based on your selected date and location. You can modify or cancel your booking up to 48 hours before the scheduled date.
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default BookingCartPage;
