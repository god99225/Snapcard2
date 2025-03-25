import React, { useState, useEffect } from 'react';
import Sidebar from './Sidebar'; // Import Sidebar
import '../style/EmailSignatures.css'; // Import CSS for the page
import { FaFacebook, FaTwitter, FaLinkedin, FaWhatsapp, FaDownload, FaTimes } from 'react-icons/fa';

function EmailSignatures() {
  const [cards, setCards] = useState([]);
  const [selectedCard, setSelectedCard] = useState(null);

  useEffect(() => {
    // Load saved cards from local storage
    const savedCards = JSON.parse(localStorage.getItem('cards')) || [];
    setCards(savedCards);
  }, []);

  // Function to generate QR code URL using qrserver API
  const generateQRCodeUrl = (card) => {
    const qrValue = `Name: ${card.firstName} ${card.lastName}, Business: ${card.businessName}, Position: ${card.position}, Address: ${card.address}`;
    const encodedValue = encodeURIComponent(qrValue);
    return `https://api.qrserver.com/v1/create-qr-code/?data=${encodedValue}&size=150x150`;
  };

  const handleCardClick = (card) => {
    setSelectedCard(card);
  };

  const handleCloseModal = () => {
    setSelectedCard(null);
  };

  return (
    <div className="email-signatures-container">
      <Sidebar />
      <div className="content-wrapper">
        <h1 className="page-heading">Email Signatures</h1>
        <p className="page-intro">Manage your email signatures and view QR codes for each card.</p>

        <div className="cards-grid">
          {/* Render saved cards with first and last name only */}
          {cards.length > 0 ? (
            cards.map((card) => (
              <div key={card.id} className="card-preview" onClick={() => handleCardClick(card)}>
                <h2 className="card-name">{card.firstName} {card.lastName}</h2>
              </div>
            ))
          ) : (
            <p>No saved cards available</p>
          )}
        </div>

        {/* Modal to show full card details, QR code, and social media sharing */}
        {selectedCard && (
          <div className="modal-overlay">
            <div className="modal-content">
              <FaTimes className="modal-close" onClick={handleCloseModal} />
              
              <div className="modal-left">
                <h2>{selectedCard.firstName} {selectedCard.lastName}</h2>
                <ul className="card-details">
                  <li><strong>Compnay Name :</strong> {selectedCard.company}</li>
                  <li><strong>Title :</strong> {selectedCard.title}</li>
                  <li><strong>Department :</strong> {selectedCard.department}</li>
                  {/* <li><strong>Headlines :</strong> {selectedCard.headline}</li> */}

                </ul>
              </div>

              <div className="modal-right">
                <div className="qr-code-container">
                  <img 
                    src={generateQRCodeUrl(selectedCard)} 
                    alt={`QR Code for ${selectedCard.firstName} ${selectedCard.lastName}`} 
                    className="qr-code-img"
                  />
                  <button className="download-qr-button">
                    <FaDownload /> Download QR Code
                  </button>
                </div>

                <div className="social-share-icons">
                  <a href={`https://www.facebook.com/sharer/sharer.php?u=${window.location.origin}/email-signatures/${selectedCard.id}`} target="_blank" rel="noopener noreferrer">
                    <FaFacebook className="social-icon" />
                  </a>
                  <a href={`https://twitter.com/intent/tweet?url=${window.location.origin}/email-signatures/${selectedCard.id}`} target="_blank" rel="noopener noreferrer">
                    <FaTwitter className="social-icon" />
                  </a>
                  <a href={`https://www.linkedin.com/sharing/share-offsite/?url=${window.location.origin}/email-signatures/${selectedCard.id}`} target="_blank" rel="noopener noreferrer">
                    <FaLinkedin className="social-icon" />
                  </a>
                  <a href={`https://api.whatsapp.com/send?text=${window.location.origin}/email-signatures/${selectedCard.id}`} target="_blank" rel="noopener noreferrer">
                    <FaWhatsapp className="social-icon" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default EmailSignatures;
