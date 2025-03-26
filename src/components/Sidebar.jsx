import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import '../style/Sidebar.css';

function Sidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <div className={`sidebar ${isCollapsed ? 'collapsed' : ''}`}>
      <div className="logo">
        <img src="/assets/Snapcard logo2.png" alt="Logo" /> {/* Replace with the actual logo path */}
        <button onClick={toggleSidebar} className="toggle-btn">
          {/* <i className="fas fa-bars"></i> */}
        </button>
      </div>
      <nav>
        <ul>
          <li>
            <NavLink to="/home" activeClassName="active">
              <i className="fas fa-home"></i> <span className="nav-text">Home</span>
            </NavLink>
          </li>
          <li>
            <NavLink to="/contacts" activeClassName="active">
              <i className="fas fa-address-book"></i> <span className="nav-text">Contacts</span>
            </NavLink>
          </li>
          <li>
            <NavLink to="/backgrounds" activeClassName="active">
              <i className="fas fa-image"></i> <span className="nav-text">Backgrounds</span>
            </NavLink>
          </li>
          <li>
            <NavLink to="/email-signatures" activeClassName="active">
              <i className="fas fa-signature"></i> <span className="nav-text">Email Signatures</span>
            </NavLink>
          </li>
          <li>
            <NavLink to="/analytics" activeClassName="active">
              <i className="fas fa-chart-line"></i> <span className="nav-text">Analytics</span>
            </NavLink>
          </li>
        </ul>
      </nav>
      <div className="sidebar-footer">
        <ul>
          <li>
            <NavLink to="/settings" activeClassName="active">
              <i className="fas fa-cog"></i> <span className="nav-text">Settings</span>
            </NavLink>
          </li>
          <li>
            <NavLink to="/support" activeClassName="active">
              <i className="fas fa-headset"></i> <span className="nav-text">Contact Support</span>
            </NavLink>
          </li>
          <li>
            <NavLink to="/help" activeClassName="active">
              <i className="fas fa-question-circle"></i> <span className="nav-text">Help Center</span>
            </NavLink>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Sidebar;
