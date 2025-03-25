// src/components/Login.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../style/Login.css';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    
    // Basic validation
    if (!email || !password) {
      setError('Please enter both email and password.');
      return;
    }

    // Dummy authentication logic
    if ((email === 'prem@gmail.com' || email === 'yash@gmail.com') && password === 'pass') {
      setError('');
      // Navigate to dashboard with email state
      localStorage.setItem('userToken', 'dummy-token'); // Save token to local storage (mock implementation)
      localStorage.setItem('userEmail', email); // Save email to local storage
      navigate('/home', { state: { email } });
    } else {
      setError('Invalid credentials');
    }
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <div className="login-card">
          <div className="logo11">
            <img src="src/assets/ll.png" alt="Logo" />
          </div>
          <h2>Login to your account</h2>
          <p>Don't have an account? <a href="/register">Register</a></p>

          {error && <p className="error-message">{error}</p>}

          <form onSubmit={handleLogin}>
            <div className="input-group">
              <label>Email</label>
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="input-group">
              <label>Password</label>
              <input
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <button type="submit" className="login-btn">Login</button>
          </form>

          <div className="or-divider">
            <span>or continue with</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
