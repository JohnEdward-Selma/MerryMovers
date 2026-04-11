import React, { useState } from 'react';

import Header from '../../../shared/components/Header';
import Footer from '../../../shared/components/Footer';
import { Link } from 'react-router-dom';

function HomePage() {
    const [category, setCategory] = useState('All');
    const [type, setType] = useState('All');
    const [price, setPrice] = useState(500);

    return (
      <>
        <Header />
        <div className="sub-header" style={{ textAlign: 'left', margin: '32px 0 24px 40px' }}>
          <h2 style={{ fontSize: '2.5rem', fontWeight: 700, margin: 0 }}>
            Your Complete Moving Solution
          </h2>
          <p style={{ fontSize: '1.25rem', color: '#555', marginTop: 8 }}>
            Professional moving services and vehicle rentals to make your move stress-free
          </p>
        </div>
        <div style={{ display: 'flex', alignItems: 'flex-start', marginLeft: '40px' }}>
          {/* Sidebar Filters */}
          <aside style={{ minWidth: '250px', background: '#ececec', padding: '24px', borderRadius: '8px', marginRight: '32px' }}>
            <h2 style={{ fontSize: '1.3rem', fontWeight: 700, marginBottom: '24px' }}>Filters</h2>
            <div style={{ marginBottom: '18px' }}>
              <div style={{ fontWeight: 600 }}>Category</div>
              <div style={{ marginTop: '8px' }}>
                <button style={{ marginRight: '8px', background: category === 'All' ? '#0F766E' : '#fff', color: category === 'All' ? '#fff' : '#333', border: '1px solid #0F766E', borderRadius: '4px', padding: '4px 12px', fontWeight: 600, cursor: 'pointer' }} onClick={() => setCategory('All')}>All</button>
                <button style={{ marginRight: '8px', background: category === 'Labor' ? '#0F766E' : '#fff', color: category === 'Labor' ? '#fff' : '#333', border: '1px solid #0F766E', borderRadius: '4px', padding: '4px 12px', fontWeight: 600, cursor: 'pointer' }} onClick={() => setCategory('Labor')}>Labor</button>
                <button style={{ background: category === 'Storage' ? '#0F766E' : '#fff', color: category === 'Storage' ? '#fff' : '#333', border: '1px solid #0F766E', borderRadius: '4px', padding: '4px 12px', fontWeight: 600, cursor: 'pointer' }} onClick={() => setCategory('Storage')}>Storage</button>
              </div>
            </div>
            <div style={{ marginBottom: '18px' }}>
              <div style={{ fontWeight: 600 }}>Type</div>
              <div style={{ marginTop: '8px' }}>
                <button style={{ marginRight: '8px', background: type === 'All' ? '#0F766E' : '#fff', color: type === 'All' ? '#fff' : '#333', border: '1px solid #0F766E', borderRadius: '4px', padding: '4px 12px', fontWeight: 600, cursor: 'pointer' }} onClick={() => setType('All')}>All</button>
                <button style={{ marginRight: '8px', background: type === 'Service' ? '#0F766E' : '#fff', color: type === 'Service' ? '#fff' : '#333', border: '1px solid #0F766E', borderRadius: '4px', padding: '4px 12px', fontWeight: 600, cursor: 'pointer' }} onClick={() => setType('Service')}>Service</button>
                <button style={{ background: type === 'Vehicle' ? '#0F766E' : '#fff', color: type === 'Vehicle' ? '#fff' : '#333', border: '1px solid #0F766E', borderRadius: '4px', padding: '4px 12px', fontWeight: 600, cursor: 'pointer' }} onClick={() => setType('Vehicle')}>Vehicle</button>
              </div>
            </div>
            <div style={{ marginBottom: '18px' }}>
              <div style={{ fontWeight: 600 }}>Price Range</div>
              <div style={{ marginTop: '8px', display: 'flex', alignItems: 'center' }}>
                <input type="range" min="0" max="1000" value={price} onChange={e => setPrice(Number(e.target.value))} style={{ width: '100%' }} />
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem', marginTop: '4px' }}>
                <span>$0</span>
                <span>$1000</span>
              </div>
              <div style={{ textAlign: 'center', fontWeight: 600, fontSize: '1.1rem', marginTop: '8px', color: '#0F766E' }}>
                ${price}
              </div>
            </div>
            <button style={{ marginTop: '16px', background: '#0F766E', color: 'white', border: 'none', borderRadius: '4px', padding: '8px 12px', fontWeight: 600, cursor: 'pointer' }} onClick={() => { setCategory('All'); setType('All'); setPrice(500); }}>Clear Filters</button>
          </aside>
          {/* Product Grid */}
          <section style={{ flex: 1 }}>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '24px' }}>Available Services and Vehicles</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, minmax(0, 1fr))', gap: '24px' }}>
              {[...Array(6)].map((_, idx) => (
                <Link to="/product" key={idx} style={{ textDecoration: 'none' }}>
                  <div style={{ background: '#ececec', borderRadius: '8px', overflow: 'hidden', boxShadow: '0 2px 8px #0001', display: 'flex', flexDirection: 'column', minHeight: '320px', width: '95%', cursor: 'pointer', transition: 'box-shadow 0.2s' }}>
                    <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 600, fontSize: '1.1rem', color: '#333', height: '140px' }}>
                      Product Pic
                    </div>
                    <div style={{ padding: '16px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <div style={{ fontWeight: 700, fontSize: '1.1rem' }}>Furniture Assembly</div>
                        <div style={{ background: '#d1d5db', color: '#333', borderRadius: '4px', fontSize: '0.9rem', padding: '2px 8px', fontWeight: 500 }}>Labor</div>
                      </div>
                      <div style={{ color: '#666', fontSize: '0.95rem', margin: '8px 0' }}>
                        Expert furniture disassembly and reassembly
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '12px' }}>
                        <div style={{ fontWeight: 700, fontSize: '1.2rem', color: '#0F766E' }}>$100 <span style={{ fontWeight: 400, fontSize: '0.95rem', color: '#888' }}>/service</span></div>
                        <button style={{ background: '#F59E0B', color: 'white', border: 'none', borderRadius: '4px', padding: '8px 18px', fontWeight: 600, cursor: 'pointer' }}>Add</button>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        </div>
        <Footer />
      </>
    );
  }

export default HomePage;
