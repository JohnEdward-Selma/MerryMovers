import React from 'react';

import Header from '../components/Header';
import Footer from '../components/Footer';
import { Link } from 'react-router-dom';


function ProductPage() {
  const [quantity, setQuantity] = React.useState(1);
  return (
    <>
      <Header />
      <div style={{ padding: '32px 0 0 0', maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ marginBottom: '18px', fontSize: '1rem', color: '#222', cursor: 'pointer', textAlign: 'left' }}>
          <Link to="/" style={{ color: '#222', textDecoration: 'none', fontWeight: 500 }}>&lt; Back to listings</Link>
        </div>
        <div style={{ display: 'flex', gap: '40px', alignItems: 'flex-start', justifyContent: 'center' }}>
          {/* Image Section */}
          <div style={{ width: '420px', height: '420px', background: '#d4d4d4', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: '2rem', color: '#222', marginBottom: '16px' }}>
            Service/Vehicle Image
            <div style={{ width: '100%', height: '60px', background: '#a3a3a3', position: 'absolute', bottom: 0, left: 0, borderRadius: '0 0 8px 8px' }}></div>
          </div>
          {/* Details Section */}
          <div style={{ background: '#ececec', borderRadius: '8px', padding: '32px', minWidth: '420px', maxWidth: '480px', boxShadow: '0 2px 8px #0001' }}>
            <div style={{ marginBottom: '12px' }}>
              <span style={{ background: '#bdbdbd', color: '#333', borderRadius: '4px', fontSize: '0.95rem', padding: '4px 12px', fontWeight: 500 }}>Labor</span>
            </div>
            <div style={{ fontWeight: 700, fontSize: '2rem', marginBottom: '8px' }}>Professional Movers</div>
            <div style={{ fontWeight: 700, fontSize: '2rem', color: '#0F766E', marginBottom: '4px' }}>$150 <span style={{ fontWeight: 400, fontSize: '1rem', color: '#888' }}>per service</span></div>
            <div style={{ fontWeight: 600, marginTop: '18px', marginBottom: '4px' }}>Description</div>
            <div style={{ color: '#444', fontSize: '1rem', marginBottom: '12px' }}>Experienced movers to help with packing and loading</div>
            <div style={{ fontWeight: 600, marginBottom: '4px' }}>Service Duration</div>
            <div style={{ color: '#444', fontSize: '1rem', marginBottom: '18px' }}>4 hours minimum</div>
            <div style={{ fontWeight: 600, marginBottom: '4px' }}>Quantity</div>
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '18px' }}>
              <button onClick={() => setQuantity(Math.max(1, quantity - 1))} style={{ background: '#a3a3a3', color: '#fff', border: 'none', borderRadius: '4px', width: '32px', height: '32px', fontSize: '1.3rem', fontWeight: 700, cursor: 'pointer' }}>-</button>
              <span style={{ margin: '0 16px', fontWeight: 600, fontSize: '1.2rem' }}>{quantity}</span>
              <button onClick={() => setQuantity(quantity + 1)} style={{ background: '#a3a3a3', color: '#fff', border: 'none', borderRadius: '4px', width: '32px', height: '32px', fontSize: '1.3rem', fontWeight: 700, cursor: 'pointer' }}>+</button>
            </div>
            <div style={{ display: 'flex', gap: '16px', marginBottom: '24px' }}>
              <button style={{ flex: 1, background: '#fff', color: '#0F766E', border: '2px solid #0F766E', borderRadius: '4px', padding: '12px 0', fontWeight: 700, fontSize: '1.1rem', cursor: 'pointer' }}>Add to Cart</button>
              <button style={{ flex: 1, background: '#fff', color: '#F59E0B', border: '2px solid #F59E0B', borderRadius: '4px', padding: '12px 0', fontWeight: 700, fontSize: '1.1rem', cursor: 'pointer' }}>Book Now</button>
            </div>
            <div style={{ fontWeight: 600, marginBottom: '8px' }}>Additional Specifications</div>
            <ul style={{ color: '#222', fontSize: '1rem', marginLeft: '18px', marginBottom: 0 }}>
              <li>2-person team</li>
              <li>Includes basic tools</li>
              <li>Insurance covered</li>
              <li>Background checked</li>
            </ul>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default ProductPage;
