import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  FiArrowLeft,
  FiBox,
  FiCalendar,
  FiDollarSign,
  FiEdit2,
  FiGrid,
  FiSearch,
  FiTrash2,
  FiTruck,
  FiUsers,
  FiEye,
} from 'react-icons/fi';
import '../styles/AdminPage.css';

type AdminTab = 'dashboard' | 'services' | 'vehicles' | 'bookings' | 'users';

const navItems: { key: AdminTab; label: string; icon: React.ReactNode }[] = [
  { key: 'dashboard', label: 'Dashboard', icon: <FiGrid /> },
  { key: 'services', label: 'Services', icon: <FiBox /> },
  { key: 'vehicles', label: 'Vehicles', icon: <FiTruck /> },
  { key: 'bookings', label: 'Bookings', icon: <FiCalendar /> },
  { key: 'users', label: 'Users', icon: <FiUsers /> },
];

const services = [
  { name: 'Professional Movers', desc: 'Experienced movers to help with packing', category: 'Labor', price: '$150', duration: '4 hours' },
  { name: 'Packing Service', desc: 'Complete packing service with materials', category: 'Labor', price: '$200', duration: 'Full day' },
  { name: 'Furniture Assembly', desc: 'Expert furniture disassembly and reassembly', category: 'Labor', price: '$100', duration: '2-3 hours' },
  { name: 'Storage Unit Rental', desc: 'Secure storage units for temporary holding', category: 'Storage', price: '$120', duration: 'Monthly' },
];

const vehicles = [
  { name: 'Small Van', desc: 'Perfect for small apartments or single rooms', price: '$80', capacity: 'Up to 500 sq ft' },
  { name: 'Medium Truck', desc: 'Ideal for 1-2 bedroom apartments', price: '$120', capacity: 'Up to 1000 sq ft' },
  { name: 'Large Truck', desc: 'Suitable for 3-4 bedroom homes', price: '$180', capacity: 'Up to 2000 sq ft' },
  { name: 'Box Truck', desc: 'For large homes or commercial moves', price: '$250', capacity: 'Up to 3500 sq ft' },
];

const bookings = [
  { id: 'b1', customer: 'John Smith', date: '2026-02-15', slot: '09:00 AM - 01:00 PM', status: 'confirmed', total: '$270', deadline: '14/02/2026' },
  { id: 'b2', customer: 'Sarah Johnson', date: '2026-02-20', slot: '02:00 PM - 06:00 PM', status: 'pending', total: '$80', deadline: '19/02/2026' },
  { id: 'b3', customer: 'Michael Brown', date: '2026-02-10', slot: '08:00 AM - 05:00 PM', status: 'in-progress', total: '$680', deadline: '09/02/2026' },
];

const users = [
  { id: 'u1', name: 'John Smith', email: 'john@example.com', bookings: 3 },
  { id: 'u2', name: 'Sarah Johnson', email: 'sarah@example.com', bookings: 1 },
  { id: 'u3', name: 'Michael Brown', email: 'michael@example.com', bookings: 5 },
  { id: 'u4', name: 'Emily Davis', email: 'emily@example.com', bookings: 2 },
];

function AdminPage() {
  const [activeTab, setActiveTab] = useState<AdminTab>('dashboard');
  const navigate = useNavigate();

  return (
    <div className="admin-shell">
      <header className="admin-topbar">
        <div className="admin-brand">
          <div className="brand-icon"><FiTruck /></div>
          <div>
            <div className="brand-title">MerryMovers</div>
            <div className="brand-subtitle">Admin Dashboard</div>
          </div>
        </div>
        <button className="back-button" onClick={() => navigate('/')}> <FiArrowLeft /> Back to Site</button>
      </header>

      <div className="admin-body">
        <aside className="admin-sidebar">
          {navItems.map((item) => (
            <button
              key={item.key}
              className={`sidebar-item ${activeTab === item.key ? 'active' : ''}`}
              onClick={() => setActiveTab(item.key)}
            >
              <span>{item.icon}</span>
              {item.label}
            </button>
          ))}
        </aside>

        <main className="admin-content">
          {activeTab === 'dashboard' && (
            <>
              <h1>Dashboard Overview</h1>
              <p>Welcome back! Here's what's happening with your business today.</p>
              <div className="summary-grid">
                <div className="summary-card"><FiDollarSign /><div><strong>Total Revenue</strong><span>$1,030</span></div></div>
                <div className="summary-card"><FiCalendar /><div><strong>Total Bookings</strong><span>3</span></div></div>
                <div className="summary-card"><FiUsers /><div><strong>Active Users</strong><span>4</span></div></div>
                <div className="summary-card"><FiBox /><div><strong>Services & Vehicles</strong><span>8</span></div></div>
              </div>
              <div className="panel">
                <h3>Booking Status Overview</h3>
                <div className="status-strip">
                  <div className="status-chip pending">1 Pending</div>
                  <div className="status-chip confirmed">1 Confirmed</div>
                  <div className="status-chip progress">1 In Progress</div>
                </div>
              </div>
              <div className="panel">
                <h3>Recent Bookings</h3>
                <table className="admin-table">
                  <thead>
                    <tr><th>BOOKING ID</th><th>CUSTOMER</th><th>DATE</th><th>STATUS</th><th>TOTAL</th></tr>
                  </thead>
                  <tbody>
                    {bookings.map((booking) => (
                      <tr key={booking.id}>
                        <td>{booking.id}</td>
                        <td>{booking.customer}</td>
                        <td>{booking.date}</td>
                        <td><span className={`status-badge ${booking.status}`}>{booking.status}</span></td>
                        <td>{booking.total}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </>
          )}

          {activeTab === 'services' && (
            <>
              <div className="heading-row">
                <div><h1>Services Management</h1><p>Manage your moving services</p></div>
                <button className="primary-btn">+ Add New Service</button>
              </div>
              <div className="search-box"><FiSearch /><input placeholder="Search services..." /></div>
              <div className="panel">
                <table className="admin-table">
                  <thead>
                    <tr><th>SERVICE</th><th>CATEGORY</th><th>PRICE</th><th>DURATION</th><th>ACTIONS</th></tr>
                  </thead>
                  <tbody>
                    {services.map((service) => (
                      <tr key={service.name}>
                        <td><strong>{service.name}</strong><div className="muted">{service.desc}</div></td>
                        <td>{service.category}</td>
                        <td>{service.price}</td>
                        <td>{service.duration}</td>
                        <td className="actions"><button><FiEdit2 /></button><button><FiTrash2 /></button></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </>
          )}

          {activeTab === 'vehicles' && (
            <>
              <div className="heading-row">
                <div><h1>Vehicles Management</h1><p>Manage your vehicle fleet</p></div>
                <button className="primary-btn">+ Add New Vehicle</button>
              </div>
              <div className="search-box"><FiSearch /><input placeholder="Search vehicles..." /></div>
              <div className="cards-grid">
                {vehicles.map((vehicle) => (
                  <div className="vehicle-card" key={vehicle.name}>
                    <div className="vehicle-image" />
                    <h3>{vehicle.name}</h3>
                    <p>{vehicle.desc}</p>
                    <div className="vehicle-meta"><strong>{vehicle.price}</strong><span>{vehicle.capacity}</span></div>
                    <div className="vehicle-actions"><button><FiEdit2 /> Edit</button><button><FiTrash2 /> Delete</button></div>
                  </div>
                ))}
              </div>
            </>
          )}

          {activeTab === 'bookings' && (
            <>
              <h1>Bookings Management</h1>
              <p>View and manage customer bookings</p>
              <div className="status-strip multi">
                <div className="status-chip pending">Pending 1</div>
                <div className="status-chip confirmed">Confirmed 1</div>
                <div className="status-chip progress">In Progress 1</div>
                <div className="status-chip">Completed 0</div>
                <div className="status-chip">Cancelled 0</div>
              </div>
              <div className="panel">
                <h3>Filters</h3>
                <div className="filters-row">
                  <div className="search-box"><FiSearch /><input placeholder="Search by customer or booking id..." /></div>
                  <input className="simple-input" placeholder="Status" />
                  <input className="simple-input" placeholder="Date" />
                </div>
              </div>
              <div className="panel">
                <table className="admin-table">
                  <thead>
                    <tr><th>BOOKING ID</th><th>CUSTOMER</th><th>DATE</th><th>TIME SLOT</th><th>STATUS</th><th>TOTAL</th><th>DEADLINE</th><th>ACTIONS</th></tr>
                  </thead>
                  <tbody>
                    {bookings.map((booking) => (
                      <tr key={booking.id}>
                        <td>{booking.id}</td>
                        <td>{booking.customer}</td>
                        <td>{booking.date}</td>
                        <td>{booking.slot}</td>
                        <td><span className={`status-badge ${booking.status}`}>{booking.status}</span></td>
                        <td>{booking.total}</td>
                        <td>{booking.deadline}</td>
                        <td className="actions"><button><FiEye /></button></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </>
          )}

          {activeTab === 'users' && (
            <>
              <h1>Users Management</h1>
              <p>Manage customer accounts</p>
              <div className="search-box"><FiSearch /><input placeholder="Search users by name or email..." /></div>
              <div className="user-grid">
                {users.map((user) => (
                  <div className="user-card" key={user.id}>
                    <div className="avatar">{user.name.charAt(0)}</div>
                    <h3>{user.name}</h3>
                    <div className="muted">ID: {user.id}</div>
                    <div className="muted">{user.email}</div>
                    <div className="muted">{user.bookings} bookings</div>
                    <div className="vehicle-actions"><button>View Details</button><button>Send Message</button></div>
                  </div>
                ))}
              </div>
            </>
          )}
        </main>
      </div>
    </div>
  );
}

export default AdminPage;
