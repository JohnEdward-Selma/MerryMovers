import React, { useState } from 'react';
import './css/LoginPage.css'; // Updated path for custom styles
import { login } from '../api/auth';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

const LoginPage: React.FC = () => {
  const [username, setUsername] = useState('sampleuser');
  const [password, setPassword] = useState('samplepass');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (!username || !password) {
      setError('Please enter both username and password.');
      return;
    }
    // Compare input to sample values for demo error handling
    if (username !== 'sampleuser' || password !== 'samplepass') {
      setError('Incorrect username or password.');
      return;
    }
    // No backend call, only sample value check
    if (username === 'sampleuser' && password === 'samplepass') {
      navigate('/'); // Redirect to homepage on success
    } else {
      setError('Incorrect username or password.');
    }
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleLogin}>
        <div style={{ textAlign: 'center', marginBottom: '8px', fontWeight: 700, fontSize: '1.5rem', color: '#0F766E' }}>Merry Movers</div>
        <h2>Login</h2>
        <div className="input-group">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={e => setUsername(e.target.value)}
            placeholder="Enter your username"
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