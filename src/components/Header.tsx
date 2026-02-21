


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
        <button className="signup-btn">Sign Up / Login</button>
      </div>
    </header>
  );
}

export default Header;
