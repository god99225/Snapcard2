import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebaseConfig';  // Ensure firebase.js is correctly configured
import '../style/Login.css';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    
    // Basic validation
    if (!email || !password) {
      setError('Please enter both email and password.');
      return;
    }

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      localStorage.setItem('userToken', user.accessToken); // Store user token
      localStorage.setItem('userEmail', user.email); // Store email
      navigate('/home', { state: { email: user.email } });
    } catch (err) {
      setError('Invalid email or password. Please try again.');
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
