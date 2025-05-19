import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../style/Login.css';

function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    // Validate input
    if (!email || !password || !name) {
      setError('Please fill all fields.');
      return;
    }

    try {
      // Step 1: Authenticate as Admin to get token
      const authResponse = await axios.post('/api/Authentication/Authenticate', {
        UserName: 'Admin',   // Replace with real admin username
        Password: ''         // Replace with real admin password
      });

      const token = (authResponse.data || '').replace(/^"|"$/g, '');
      console.log("Received Token:", token);

      // Step 2: Post user registration
      await axios.post('/api/odata/Accounts',
        {
          Name: name,
          Email: email,
          password: password, // Pay attention to casing — should match API expectations
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert('Account created successfully! Please login.');
      navigate('/');
    } catch (err) {
      console.error("Registration error:", err);
      const errorMsg =
        err.response?.data?.message || err.response?.data?.error || 'Registration failed.';
      setError(errorMsg);
    }
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <div className="login-card">
          <img 
            src="/assets/Snapcard logo.png" 
            alt="Snapcard Logo" 
            style={{ width: "250px", height: "auto", display: "block", margin: "0 auto" }} 
          />
          <h2>Create an account</h2>
          <p>Already have an account? <a href="/">Login</a></p>
          {error && <p className="error-message">{error}</p>}
          <form onSubmit={handleRegister}>
            <div className="input-group">
              <label>Name</label>
              <input
                type="text"
                placeholder="Enter your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
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
            <button type="submit" className="login-btn">Sign Up</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Register;
