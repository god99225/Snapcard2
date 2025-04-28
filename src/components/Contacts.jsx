import React, { useState, useEffect } from 'react';
import Sidebar from './Sidebar'; // Import Sidebar
import '../style/Contacts.css'; // Import the CSS

function Contacts() {
  const [searchTerm, setSearchTerm] = useState('');
  const [contacts, setContacts] = useState([]);

  // Fetch contacts from localStorage when the component is mounted
  useEffect(() => {
    const currentUserEmail = localStorage.getItem('userEmail'); // 🔥 Get logged-in user's email
    if (currentUserEmail) {
      const storedContacts = JSON.parse(localStorage.getItem(`contactsData_${currentUserEmail}`)) || [];
      setContacts(storedContacts);
    } else {
      setContacts([]);
    }
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
