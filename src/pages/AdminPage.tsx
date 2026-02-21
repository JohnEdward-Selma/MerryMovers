import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

function AdminPage() {
  return (
    <>
      <Header />
      <div style={{ display: 'flex', maxWidth: '1200px', margin: '0 auto', padding: '32px 0 0 0', gap: '40px' }}>
        {/* Sidebar */}
        <aside style={{ minWidth: '220px', background: '#a3a3a3', color: '#222', padding: '24px', borderRadius: '8px', marginRight: '32px', height: 'fit-content' }}>
          <h2 style={{ fontSize: '1.3rem', fontWeight: 700, marginBottom: '24px' }}>Filters</h2>
          <div style={{ fontWeight: 600, marginBottom: '12px' }}>All</div>
          <div style={{ fontWeight: 600, marginBottom: '12px' }}>Services</div>
          <div style={{ fontWeight: 600, marginBottom: '12px' }}>Vehicles</div>
          <div style={{ fontWeight: 600, marginBottom: '12px' }}>Bookings</div>
          <div style={{ fontWeight: 600 }}>Users</div>
        </aside>
        {/* Main Body */}
        <div style={{ flex: 1 }}>
          <h1 style={{ fontWeight: 700, fontSize: '2rem', marginBottom: '32px', textAlign: 'center' }}>Admin Dashboard</h1>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '40px', marginBottom: '40px' }}>
            {/* Service Table */}
            <div>
              <div style={{ display: 'flex', alignItems: 'center', marginBottom: '12px' }}>
                <span style={{ fontWeight: 700, fontSize: '1.2rem', marginRight: '12px' }}>Service</span>
                <button style={{ background: '#a3a3a3', color: '#fff', border: 'none', borderRadius: '4px', width: '32px', height: '32px', fontSize: '1.1rem', fontWeight: 700, cursor: 'pointer' }}>+</button>
              </div>
              {[...Array(4)].map((_, idx) => (
                <div key={idx} style={{ background: '#d4d4d4', borderRadius: '8px', marginBottom: '12px', padding: '18px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <span>Service Record {idx + 1}</span>
                  <button style={{ background: '#EF4444', color: '#fff', border: 'none', borderRadius: '4px', width: '32px', height: '32px', fontSize: '1.1rem', fontWeight: 700, cursor: 'pointer' }}>🗑</button>
                </div>
              ))}
            </div>
            {/* Vehicle Table */}
            <div>
              <div style={{ display: 'flex', alignItems: 'center', marginBottom: '12px' }}>
                <span style={{ fontWeight: 700, fontSize: '1.2rem', marginRight: '12px' }}>Vehicle</span>
                <button style={{ background: '#a3a3a3', color: '#fff', border: 'none', borderRadius: '4px', width: '32px', height: '32px', fontSize: '1.1rem', fontWeight: 700, cursor: 'pointer' }}>+</button>
              </div>
              {[...Array(4)].map((_, idx) => (
                <div key={idx} style={{ background: '#d4d4d4', borderRadius: '8px', marginBottom: '12px', padding: '18px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <span>Vehicle Record {idx + 1}</span>
                  <button style={{ background: '#EF4444', color: '#fff', border: 'none', borderRadius: '4px', width: '32px', height: '32px', fontSize: '1.1rem', fontWeight: 700, cursor: 'pointer' }}>🗑</button>
                </div>
              ))}
            </div>
            {/* Users Table */}
            <div>
              <div style={{ fontWeight: 700, fontSize: '1.2rem', marginBottom: '12px' }}>Users</div>
              {[...Array(4)].map((_, idx) => (
                <div key={idx} style={{ background: '#d4d4d4', borderRadius: '8px', marginBottom: '12px', padding: '18px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <span>User Record {idx + 1}</span>
                  <button style={{ background: '#EF4444', color: '#fff', border: 'none', borderRadius: '4px', width: '32px', height: '32px', fontSize: '1.1rem', fontWeight: 700, cursor: 'pointer' }}>🗑</button>
                </div>
              ))}
            </div>
            {/* Bookings Table */}
            <div>
              <div style={{ fontWeight: 700, fontSize: '1.2rem', marginBottom: '12px' }}>Bookings</div>
              {[...Array(4)].map((_, idx) => (
                <div key={idx} style={{ background: '#d4d4d4', borderRadius: '8px', marginBottom: '12px', padding: '18px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <span>Booking Record {idx + 1}</span>
                  <button style={{ background: '#EF4444', color: '#fff', border: 'none', borderRadius: '4px', width: '32px', height: '32px', fontSize: '1.1rem', fontWeight: 700, cursor: 'pointer' }}>🗑</button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default AdminPage;
