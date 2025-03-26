import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebaseConfig';  // Ensure firebase.js is correctly configured
import '../style/Login.css';

function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      setError('Please enter email and password.');
      return;
    }

    try {
      await createUserWithEmailAndPassword(auth, email, password);
      alert('Account created successfully! Please login.');
      navigate('/');
    } catch (err) {
      setError(err.message);
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
