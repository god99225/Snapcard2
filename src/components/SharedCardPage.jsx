import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import '../style/ViewCard.css';
import html2canvas from 'html2canvas';

function SharedCardPage() {
  const query = new URLSearchParams(useLocation().search);
  const data = query.get('data');
  const cardData = data ? JSON.parse(atob(data)) : null;

  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({ name: '', number: '', email: '' });

  if (!cardData) return <div>Invalid or expired card link.</div>;

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newContact = {
      name: form.name,
      position: 'Connected via Card',
      email: form.email,
      number: form.number,
      logo: '/assets/contact1.png',
    };
  
    const existingContacts = JSON.parse(localStorage.getItem('contactsData')) || [];
    existingContacts.push(newContact);
    localStorage.setItem('contactsData', JSON.stringify(existingContacts));
  
    // Inform user and close modal
    alert('Contact Added Successfully!');
    setShowModal(false);
    setForm({ name: '', number: '', email: '' });
  };  
  
  const handleDownload = () => {
    const cardElement = document.querySelector('.new-card-card');
    if (!cardElement) return;
  
    html2canvas(cardElement).then((canvas) => {
      const link = document.createElement('a');
      link.download = 'digital_card.png';
      link.href = canvas.toDataURL('image/png');
      link.click();
    });
  };
  

  return (
    <div className="new-card-page-container">
      <div className="new-card-layout">

        <div className={`new-card-card ${cardData.selectedFrame || 'frame1'} ${cardData.shape || 'rectangle'}`}>
          <div className="card-header" style={{ backgroundColor: cardData.color || '#ff5722' }}>
            {cardData.logo && <img src={cardData.logo} alt="Logo" className="card-logo" />}
          </div>

          <div className="new-card-content">
            <div className="dashed-line"></div>

            <h1 className="new-card-title">
              {`${cardData.prefix || ''} ${cardData.firstName || ''} ${cardData.lastName || ''} ${cardData.suffix || ''}`}
            </h1>
            <p className="new-card-title-extra">{cardData.title}</p>
            <p className="new-card-department" style={{ color: cardData.color }}>
              {cardData.department}
            </p>
            <p className="new-card-company">{cardData.company}</p>
          </div>

          <p className="new-card-headline">{cardData.headline}</p>
          <p className="new-card-preferredName">{cardData.preferredName}</p>

          <div className="social-links-container">
            {cardData.socialLinks && Object.entries(cardData.socialLinks).map(([platform, url]) => (
              url && (
                <div key={platform} className="social-link-item">
                  <div className="social-icon-circle">
                    <i className={`fab fa-${platform}`}></i>
                  </div>
                  <a href={url} target="_blank" rel="noopener noreferrer" className="social-link-url">
                    {url}
                  </a>
                </div>
              )
            ))}
          </div>
        </div>

        {/* Connect Button */}
        <button className="connect-button" onClick={() => setShowModal(true)}>Connect</button>

        <button className="download-button" onClick={handleDownload}>Download</button>

        {/* Modal */}
        {showModal && (
          <div className="modal-overlay">
            <div className="modal-content">
              <h2>Add to Contacts</h2>
              <form onSubmit={handleSubmit}>
                <input
                  type="text"
                  name="name"
                  placeholder="Name"
                  value={form.name}
                  onChange={handleChange}
                  required
                />
                <input
                  type="text"
                  name="number"
                  placeholder="Phone Number"
                  value={form.number}
                  onChange={handleChange}
                />
                <input
                  type="email"
                  name="email"
                  placeholder="Email ID"
                  value={form.email}
                  onChange={handleChange}
                  required
                />
                <div className="modal-buttons">
                  <button type="submit" className="submit-button">Add Contact</button>
                  <button type="button" onClick={() => setShowModal(false)} className="cancel-button">Cancel</button>
                </div>
              </form>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}

export default SharedCardPage;
