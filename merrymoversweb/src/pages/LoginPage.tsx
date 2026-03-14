import React, { useState } from 'react';
import './css/LoginPage.css'; // Updated path for custom styles
import { login } from '../api/auth';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

const LoginPage: React.FC = () => {
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (!identifier || !password) {
      setError('Please enter username/email and password.');
      return;
    }
    try {
      const user = await login(identifier, password);
      localStorage.setItem('authUser', JSON.stringify(user));
      window.dispatchEvent(new Event('authUserChanged'));
      navigate('/');
    } catch (err: any) {
      setError(err?.message || 'Login failed.');
    }
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleLogin}>
        <div style={{ textAlign: 'center', marginBottom: '8px', fontWeight: 700, fontSize: '1.5rem', color: '#0F766E' }}>Merry Movers</div>
        <h2>Login</h2>
        <div className="input-group">
          <label htmlFor="identifier">Username or Email</label>
          <input
            type="text"
            id="identifier"
            value={identifier}
            onChange={e => setIdentifier(e.target.value)}
            placeholder="Enter your username or email"
            autoComplete="username"
          />
        </div>
        <div className="input-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            placeholder="Enter your password"
            autoComplete="current-password"
          />
        </div>
        {error && <div className="error-message">{error}</div>}
        <button type="submit" className="login-btn">Login</button>
        <div style={{ marginTop: '12px', textAlign: 'center' }}>
          Don't have an account? <Link to="/register" style={{ color: '#0F766E', fontWeight: 600 }}>Sign Up</Link>
        </div>
      </form>
    </div>
  );
};

export default LoginPage;