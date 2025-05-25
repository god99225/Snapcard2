import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../style/Dashboard.css';
import emailIcon from '/assets/email-icon.png';
import optionsIcon from '/assets/options-icon.png';
import accountIcon from '/assets/account-icon.png';
import settingsIcon from '/assets/settings-icon.png';
import logoutIcon from '/assets/logout-icon.png';

function Dashboard() {
  const navigate = useNavigate();
  const [showOptions, setShowOptions] = useState(false);

  // Get stored email and name from localStorage
  const storedEmail = localStorage.getItem('userEmail') || '';
  const storedName = localStorage.getItem('userName') || '';

  useEffect(() => {
    const token = localStorage.getItem('userToken');
    if (!token) {
      navigate('/home', { replace: true });
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('userToken');
    localStorage.removeItem('userEmail');
    localStorage.removeItem('userName');
    navigate('/', { replace: true });
  };

  const handleOptionClick = (option) => {
    switch (option) {
      case 'account':
        navigate('/account');
        break;
      case 'settings':
        navigate('/settings');
        break;
      case 'logout':
        handleLogout();
        break;
      default:
        break;
    }
  };

  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <div className="header-right">
          <div className="user-info">
            <button
              className="options-button"
              onClick={() => setShowOptions(!showOptions)}
            >
            <img
              src={emailIcon}
              alt="Email Icon"
              style={{ width: '30px', height: '30px', marginRight: '10px' }}
              className="responsive-email-icon"
            />
              <div>
                <div className="user-name">{storedName || 'Welcome User'}</div>
                <span className="user-email">{storedEmail || 'No email available'}</span>
              </div>
            </button>
            {showOptions && (
              <div className="options-menu">
                <button onClick={() => handleOptionClick('account')}>
                  <img src={accountIcon} alt="Account Icon" className="icon option-icon" /> Account
                </button>
                <button onClick={() => handleOptionClick('settings')}>
                  <img src={settingsIcon} alt="Settings Icon" className="icon option-icon" /> Settings
                </button>
                <button onClick={() => handleOptionClick('logout')}>
                  <img src={logoutIcon} alt="Logout Icon" className="icon option-icon" /> Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </header>
      {/* Main content can go here */}
    </div>
  );
}

export default Dashboard;
