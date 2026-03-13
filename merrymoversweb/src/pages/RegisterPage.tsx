import React, { useState } from 'react';
import './css/LoginPage.css'; // Reuse login styles for register
import { register } from '../api/auth';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

const RegisterPage: React.FC = () => {
  const [username, setUsername] = useState('sampleuser');
  const [email, setEmail] = useState('sampleuser@example.com');
  const [password, setPassword] = useState('samplepass');
  const [confirmPassword, setConfirmPassword] = useState('samplepass');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (!username || !email || !password || !confirmPassword) {
      setError('Please fill in all fields.');
      return;
    }
    if (password.length < 6) {
      setError('Password must be at least 6 characters long.');
      return;
    }
    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }
    // Simple email validation
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
      setError('Please enter a valid email address.');
      return;
    }
    // Compare input to sample values for demo error handling
    if (username !== 'sampleuser' || email !== 'sampleuser@example.com' || password !== 'samplepass' || confirmPassword !== 'samplepass') {
      setError('Sample values required: sampleuser, sampleuser@example.com, samplepass');
      return;
    }
    // No backend call, only sample value check
    if (email === 'sampleuser@example.com') {
      setError('This email is already taken.');
      return;
    }
    if (username === 'sampleuser' && email !== 'sampleuser@example.com' && password === 'samplepass' && confirmPassword === 'samplepass') {
      navigate('/'); // Redirect to homepage on success
    } else {
      setError('Sample values required: sampleuser, sampleuser@example.com, samplepass');
    }
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleRegister}>
        <div style={{ textAlign: 'center', marginBottom: '8px', fontWeight: 700, fontSize: '1.5rem', color: '#0F766E' }}>Merry Movers</div>
        <h2>Register</h2>
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
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            placeholder="Enter your email"
            autoComplete="email"
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
            autoComplete="new-password"
          />
        </div>
        <div className="input-group">
          <label htmlFor="confirmPassword">Confirm Password</label>
          <input
            type="password"
            id="confirmPassword"
            value={confirmPassword}
            onChange={e => setConfirmPassword(e.target.value)}
            placeholder="Re-enter your password"
            autoComplete="new-password"
          />
        </div>
        {error && <div className="error-message">{error}</div>}
        <button type="submit" className="login-btn">Register</button>
        <div style={{ marginTop: '12px', textAlign: 'center' }}>
          Already have an account? <Link to="/login" style={{ color: '#0F766E', fontWeight: 600 }}>Login</Link>
        </div>
      </form>
    </div>
  );
};

export default RegisterPage;
