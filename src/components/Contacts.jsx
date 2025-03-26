import React, { useState } from 'react';
import Sidebar from './Sidebar'; // Import Sidebar
import '../style/Contacts.css'; // Import the CSS


const contactsData = [
  { name: 'Abhijit Mate', position: 'Software Engineer', email: 'john@example.com', logo: '/assets/contact1.png' },
  { name: 'Pranav', position: 'Product Manager', email: 'jane@example.com', logo: '/assets/contact1.png' },
  { name: 'Ashish Ganwant', position: 'UX Designer', email: 'alice@example.com', logo: '/assets/contact1.png' },
  { name: 'Amruta Patil', position: 'Data Scientist', email: 'bob@example.com', logo: '/assets/contact1.png' },
  { name: 'Umadevi Mathpati', position: 'Digital Marketing', email: 'Uma@example.com', logo: '/assets/contact1.png' },
  { name: 'Mrugnayana Giri', position: 'Sales Excecative', email: 'john@example.com', logo: '/assets/contact1.png' },
  { name: 'Vishal Sonowane', position: 'Product Manager', email: 'jane@example.com', logo: '/assets/contact1.png' },
  { name: 'Pooja Mam', position: 'UX Designer', email: 'alice@example.com', logo: '/assets/contact1.png' },
  { name: 'Anjali Channagire ', position: 'Data Scientist', email: 'bob@example.com', logo: '/assets/contact1.png' },
  { name: 'Yash Garg', position: 'PowerBI', email: 'Uma@example.com', logo: '/assets/contact1.png' },


];

function Contacts() {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredContacts = contactsData.filter((contact) =>
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
