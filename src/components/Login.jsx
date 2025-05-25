import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../style/Login.css';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const API_BASE = import.meta.env.VITE_API_BASE_URL;


  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      setError('Please enter both email and password.');
      return;
    }

    try {
      // Step 1: Get Token
      const authResponse = await axios.post(`${API_BASE}/Authentication/Authenticate`, {
  username: 'Admin',
  password: '', // Secure this in production!
});

      const token = authResponse.data.replace(/^"|"$/g, ''); // Remove quotes

      // Step 2: Get all accounts using token
const accountsResponse = await axios.get(`${API_BASE}/odata/Accounts`, {
  headers: {
    'Authorization': `Bearer ${token}`,
    'Accept': '*/*',
  }
});
      const accounts = accountsResponse.data?.value || [];

      // Step 3: Match user credentials
      const matchedUser = accounts.find(
        (account) =>
          account.Email?.toLowerCase() === email.toLowerCase() &&
          account.password === password
      );

      if (matchedUser) {
        localStorage.setItem('userToken', token);
        localStorage.setItem('userEmail', matchedUser.Email);
        localStorage.setItem('userName', matchedUser.Name);
        localStorage.setItem('userId', matchedUser.Oid || '');
        localStorage.setItem('accountId', matchedUser.accountid || ''); // ✅ THIS IS CRITICAL

        navigate('/home', {
          state: { email: matchedUser.Email, name: matchedUser.Name }
        });
      }
      else
      {
        setError('Invalid email or password.');
      }


    } catch (err) {
      console.error('Login error:', err);
      setError('Login failed. Please check your credentials or try again later.');
    }
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <div className="login-card">
          <img 
            src="/assets/Snapcard logo.png" 
            alt="Snapcard Logo" 
            style={{ width: "250px", margin: "0 auto" }} 
          />
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
                required
              />
            </div>
            <div className="input-group">
              <label>Password</label>
              <input
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
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
