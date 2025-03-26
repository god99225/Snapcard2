
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import Dashboard from "./components/Dashboard";
import Home from './components/Home';
import NewCardPage from './components/NewCardPage'; // Import the new component
import Contacts from './components/Contacts';
import Backgrounds from './components/Backgrounds';
import EmailSignatures from './components/EmailSignatures';
import Analytics from './components/Analytics';
import Settings from './components/Settings'; // Assuming you create this component
import ViewCardPage from './components/ViewCardPage';
import Help from './components/Help';
import Support from './components/Support';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/home" element={<Home />} />
        <Route path="/new-card" element={<NewCardPage />} /> {/* Add the new route */}
        <Route path="/view-card" element={<ViewCardPage />} />
        <Route path="/contacts" element={<Contacts />} />
        <Route path="/backgrounds" element={<Backgrounds />} />
        <Route path="/email-signatures" element={<EmailSignatures />} />
        <Route path="/analytics" element={<Analytics />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/help" element={<Help />} />
        <Route path="/support" element={<Support />} />
      </Routes>
    </Router>
  );
}

export default App;
