import React from 'react';
import Header from '../../../shared/components/Header';
import Footer from '../../../shared/components/Footer';


function ScheduleAndCheckoutPage() {
  return (
    <>
      <Header />
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '32px 0 0 0', display: 'flex', gap: '40px', alignItems: 'flex-start' }}>
        <div style={{ flex: 2 }}>
          <h1 style={{ fontWeight: 700, fontSize: '2rem', marginBottom: '32px' }}>Schedule & Checkout</h1>
          {/* Select Date & Time */}
          <div style={{ background: '#ececec', borderRadius: '8px', marginBottom: '24px', padding: '24px', boxShadow: '0 2px 8px #0001' }}>
            <div style={{ fontWeight: 700, fontSize: '1.1rem', marginBottom: '12px', display: 'flex', alignItems: 'center' }}>
              <span style={{ background: '#a3a3a3', color: '#fff', borderRadius: '4px', fontSize: '0.95rem', padding: '4px 12px', fontWeight: 500, marginRight: '12px' }}>Icon</span>
              Select Date & Time
            </div>
            <div style={{ display: 'flex', gap: '24px', marginBottom: '12px' }}>
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 600, fontSize: '1rem', marginBottom: '4px' }}>Moving Date *</div>
                <div style={{ background: '#bdbdbd', color: '#222', borderRadius: '4px', fontSize: '1.1rem', padding: '8px 12px', fontWeight: 500 }}>10/20/2026</div>
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 600, fontSize: '1rem', marginBottom: '4px' }}>Time Slot *</div>
                <div style={{ background: '#bdbdbd', color: '#222', borderRadius: '4px', fontSize: '1.1rem', padding: '8px 12px', fontWeight: 500 }}>08:AM - 12:00 PM</div>
              </div>
            </div>
            <div style={{ background: '#fff', color: '#888', borderRadius: '4px', padding: '12px', fontSize: '0.95rem', marginTop: '8px' }}>
              Modification Deadline: You can modify or cancel this booking until 10/18/2026 at 11:59 PM
            </div>
          </div>
          {/* Location Details */}
          <div style={{ background: '#ececec', borderRadius: '8px', marginBottom: '24px', padding: '24px', boxShadow: '0 2px 8px #0001' }}>
            <div style={{ fontWeight: 700, fontSize: '1.1rem', marginBottom: '12px', display: 'flex', alignItems: 'center' }}>
              <span style={{ background: '#a3a3a3', color: '#fff', borderRadius: '4px', fontSize: '0.95rem', padding: '4px 12px', fontWeight: 500, marginRight: '12px' }}>Icon</span>
              Location Details
            </div>
            <div style={{ marginBottom: '12px' }}>
              <div style={{ fontWeight: 600, fontSize: '1rem', marginBottom: '4px' }}>Pickup Address *</div>
              <div style={{ background: '#bdbdbd', color: '#222', borderRadius: '4px', fontSize: '1.1rem', padding: '8px 12px', fontWeight: 500 }}>123 Minglanilla, Cebu</div>
            </div>
            <div>
              <div style={{ fontWeight: 600, fontSize: '1rem', marginBottom: '4px' }}>Destination Address *</div>
              <div style={{ background: '#bdbdbd', color: '#222', borderRadius: '4px', fontSize: '1.1rem', padding: '8px 12px', fontWeight: 500 }}>456 Talisay City, Cebu</div>
            </div>
          </div>
          {/* Terms and Conditions */}
          <div style={{ background: '#ececec', borderRadius: '8px', marginBottom: '24px', padding: '24px', boxShadow: '0 2px 8px #0001', display: 'flex', alignItems: 'center' }}>
            <input type="checkbox" style={{ marginRight: '12px', width: '20px', height: '20px' }} />
            <span style={{ color: '#222', fontSize: '1rem' }}>
              I agree to the Terms and Conditions and understand the cancellation policy. I acknowledge that modifications or cancellations must be made at least 48 hours before the scheduled date.
            </span>
          </div>
        </div>
        {/* Booking Review */}
        <div style={{ flex: 1 }}>
          <div style={{ background: '#ececec', borderRadius: '8px', padding: '32px', boxShadow: '0 2px 8px #0001', marginBottom: '24px' }}>
            <h2 style={{ fontWeight: 700, fontSize: '1.3rem', marginBottom: '18px' }}>Booking Review</h2>
            <div style={{ fontWeight: 600, marginBottom: '8px' }}>SELECTED ITEMS</div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
              <span>Professional Movers</span>
              <span style={{ fontWeight: 600 }}>$150</span>
            </div>
            <div style={{ color: '#888', fontSize: '0.95rem', marginBottom: '8px' }}>Qty: 1</div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
              <span>Packing Service</span>
              <span style={{ fontWeight: 600 }}>$200</span>
            </div>
            <div style={{ color: '#888', fontSize: '0.95rem', marginBottom: '8px' }}>Qty: 1</div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
              <span>Furniture Assembly</span>
              <span style={{ fontWeight: 600 }}>$100</span>
            </div>
            <div style={{ color: '#888', fontSize: '0.95rem', marginBottom: '8px' }}>Qty: 1</div>
            <div style={{ fontWeight: 600, marginBottom: '8px', marginTop: '18px' }}>SCHEDULE</div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
              <span>Date:</span>
              <span>10/20/2026</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
              <span>Time:</span>
              <span>08:AM - 12:00 PM</span>
            </div>
            <hr style={{ border: 'none', borderTop: '2px solid #888', margin: '16px 0' }} />
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
              <span>Subtotal</span>
              <span style={{ fontWeight: 600 }}>$450.00</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
              <span>Service Fees (15%)</span>
              <span style={{ fontWeight: 600 }}>$67.50</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 700, fontSize: '1.2rem', marginBottom: '18px' }}>
              <span>Total</span>
              <span style={{ color: '#0F766E' }}>$517.50</span>
            </div>
            <button style={{ width: '100%', background: '#a3a3a3', color: '#fff', border: 'none', borderRadius: '4px', padding: '12px 0', fontWeight: 700, fontSize: '1.1rem', marginBottom: '12px', cursor: 'pointer' }}>Confirm Booking</button>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default ScheduleAndCheckoutPage;
