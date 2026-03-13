


import React from 'react';
import './Header.css';
import { FaShoppingCart, FaUserCircle } from 'react-icons/fa';
import { Link } from 'react-router-dom';


function Header() {
  return (
    <header className="header-flex">
      <Link to="/" className="header-logo" style={{ textDecoration: 'none', color: 'inherit' }}>Merry Movers</Link>
      <div className="header-search">
        <input type="text" placeholder="Search..." />
      </div>
      <div className="header-icons">
        <Link to="/cart" className="icon-btn" title="Cart"><FaShoppingCart size={24} /></Link>
        <Link to="/admin" className="icon-btn" title="Profile"><FaUserCircle size={24} /></Link>
        <Link to="/login" className="signup-btn" style={{ textDecoration: 'none', color: 'inherit', marginRight: '8px' }}>Login</Link>
        <Link to="/register" className="signup-btn" style={{ textDecoration: 'none', color: 'inherit' }}>Sign Up</Link>
      </div>
    </header>
  );
}

export default Header;
