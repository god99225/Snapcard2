import React, { useState, useEffect } from 'react';
import Sidebar from './Sidebar';
import '../style/Contacts.css';

function Contacts() {
  const [contacts, setContacts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    // Load contacts from localStorage
    const savedContacts = JSON.parse(localStorage.getItem('contactsData')) || [];
    
    // You can also add your default contacts if needed
    const defaultContacts = [
      { name: 'Abhijit Mate', position: 'Software Engineer', email: 'john@example.com', logo: '/assets/contact1.png' },
    ];

    setContacts([...defaultContacts, ...savedContacts]);
  }, []);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredContacts = contacts.filter((contact) =>
    contact.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="contacts-page">
      <Sidebar />
      <div className="main-content1">
        <div className="search-bar">
          <input
            type="text"
            placeholder="Search contacts..."
            value={searchTerm}
            onChange={handleSearch}
          />
          <button className="search-button">Search</button>
        </div>
        <div className="contacts-container">
          {filteredContacts.length > 0 ? (
            filteredContacts.map((contact, index) => (
              <div key={index} className="contact-card">
                <div className="contact-logo">
                  <img src={contact.logo} alt={`${contact.name} Logo`} />
                </div>
                <h3 className="contact-name">{contact.name}</h3>
                <p className="contact-position">{contact.position}</p>
                <p className="contact-email">{contact.email}</p>
              </div>
            ))
          ) : (
            <p>No contacts found</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default Contacts;
