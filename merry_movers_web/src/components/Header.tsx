
import React, { useEffect, useState } from 'react';
import './Header.css';
import { FaShoppingCart, FaUserCircle } from 'react-icons/fa';
import { Link } from 'react-router-dom';

type AuthUser = {
  username?: string;
  profilePicture?: string;
};

function readAuthUser(): AuthUser | null {
  const raw = localStorage.getItem('authUser');
  if (!raw) {
    return null;
  }
  try {
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

function Header() {
  const [authUser, setAuthUser] = useState<AuthUser | null>(() => readAuthUser());
  const [hasPfpError, setHasPfpError] = useState(false);

  useEffect(() => {
    const syncAuthUser = () => {
      setAuthUser(readAuthUser());
    };

    window.addEventListener('storage', syncAuthUser);
    window.addEventListener('authUserChanged', syncAuthUser as EventListener);

    return () => {
      window.removeEventListener('storage', syncAuthUser);
      window.removeEventListener('authUserChanged', syncAuthUser as EventListener);
    };
  }, []);

  useEffect(() => {
    setHasPfpError(false);
  }, [authUser?.profilePicture]);

  const username = authUser?.username || '';

  return (
    <header className="header-flex">
      <Link to="/" className="header-logo" style={{ textDecoration: 'none', color: 'inherit' }}>Merry Movers</Link>
      <div className="header-search">
        <input type="text" placeholder="Search..." />
      </div>
      <div className="header-icons">
        <Link to="/cart" className="icon-btn" title="Cart"><FaShoppingCart size={24} /></Link>
        {username && <span className="username-label">{username}</span>}
        <Link to="/dashboard" className="icon-btn" title="Dashboard">
          {authUser?.profilePicture && !hasPfpError ? (
            <img
              src={authUser.profilePicture}
              alt="Profile"
              className="header-pfp"
              onError={() => setHasPfpError(true)}
            />
          ) : (
            <FaUserCircle size={24} />
          )}
        </Link>
        {!username && (
          <>
            <Link to="/login" className="signup-btn" style={{ textDecoration: 'none', color: 'inherit', marginRight: '8px' }}>Login</Link>
            <Link to="/register" className="signup-btn" style={{ textDecoration: 'none', color: 'inherit' }}>Sign Up</Link>
          </>
        )}
      </div>
    </header>
  );
}

export default Header;
