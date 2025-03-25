import React, { useState } from 'react';
import Sidebar from './Sidebar'; // Import Sidebar
import '../style/Settings.css';

const Settings = () => {
  const [userData, setUserData] = useState({
    username: 'JohnDoe',
    email: 'john@example.com',
    password: '',
    confirmPassword: '',
  });

  const [notifications, setNotifications] = useState({
    emailNotifications: true,
    smsNotifications: false,
    promotionalEmails: true,
  });

  const [settingsUpdated, setSettingsUpdated] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === 'checkbox') {
      setNotifications({ ...notifications, [name]: checked });
    } else {
      setUserData({ ...userData, [name]: value });
    }
  };

  const validateForm = () => {
    if (userData.password !== userData.confirmPassword) {
      setErrorMessage("Passwords don't match!");
      return false;
    }
    setErrorMessage('');
    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    // Simulate an API call to update user settings
    setTimeout(() => {
      console.log('User data updated:', userData);
      console.log('Notification preferences:', notifications);
      setSettingsUpdated(true);
    }, 1000);
  };

  return (
    <div className="account-settings-page">
      < Sidebar />
      <div className="account-settings-content">
        <h1 className="account-settings-title">Account Settings</h1>

        {settingsUpdated && (
          <div className="account-settings-success-message">
            <h2>Settings Updated!</h2>
            <p>Your account settings have been successfully updated.</p>
          </div>
        )}
        
        {errorMessage && (
          <div className="account-settings-error-message">
            <p>{errorMessage}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="account-settings-form">
          <div className="account-settings-group">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              name="username"
              value={userData.username}
              onChange={handleChange}
              required
            />
          </div>
          <div className="account-settings-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={userData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="account-settings-group">
            <label htmlFor="password">New Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={userData.password}
              onChange={handleChange}
              required
            />
          </div>
          <div className="account-settings-group">
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={userData.confirmPassword}
              onChange={handleChange}
              required
            />
          </div>

          <div className="account-settings-notifications">
            <h3>Notification Preferences</h3>
            <label>
              <input
                type="checkbox"
                name="emailNotifications"
                checked={notifications.emailNotifications}
                onChange={handleChange}
              />
              Email Notifications
            </label>
            <label>
              <input
                type="checkbox"
                name="smsNotifications"
                checked={notifications.smsNotifications}
                onChange={handleChange}
              />
              SMS Notifications
            </label>
            <label>
              <input
                type="checkbox"
                name="promotionalEmails"
                checked={notifications.promotionalEmails}
                onChange={handleChange}
              />
              Promotional Emails
            </label>
          </div>

          <button type="submit" className="account-settings-button">Save Changes</button>
        </form>

        <div className="account-settings-features">
          <h3>20+ Features and Tools</h3>
          <ul>
            <li>User Profile Management</li>
            <li>Two-Factor Authentication</li>
            <li>Data Export Options</li>
            <li>Privacy Settings Control</li>
            <li>Account Activity Log</li>
            <li>Notification Preferences</li>
            <li>Social Media Integration</li>
            <li>API Key Management</li>
            <li>Subscription Management</li>
            <li>Security Questions Setup</li>
            <li>Change Email Address</li>
            <li>Change Username</li>
            <li>Profile Picture Upload</li>
            <li>Connected Devices Overview</li>
            <li>Account Deactivation</li>
            <li>Billing Information Update</li>
            <li>Feedback and Support Requests</li>
            <li>Saved Payment Methods</li>
            <li>Mobile App Management</li>
            <li>Account Insights and Analytics</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Settings;
