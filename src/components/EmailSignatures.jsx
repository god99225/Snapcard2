import React, { useState, useEffect } from 'react';
import Sidebar from './Sidebar';
import '../style/EmailSignatures.css';
import { FaFacebook, FaTwitter, FaLinkedin, FaWhatsapp, FaDownload, FaTimes } from 'react-icons/fa';
import { FaEnvelope, FaPhone, FaBuilding } from 'react-icons/fa';
import html2canvas from 'html2canvas'; // Import html2canvas

function EmailSignatures() {
  const [cards, setCards] = useState([]);
  const [selectedCard, setSelectedCard] = useState(null);
  const [selectedStyle, setSelectedStyle] = useState(0);

  useEffect(() => {
    const savedCards = JSON.parse(localStorage.getItem('cards')) || [];
    setCards(savedCards);
  }, []);

  const generateQRCodeUrl = (card) => {
    const qrValue = `Name: ${card.firstName} ${card.lastName}, Business: ${card.businessName}, Position: ${card.position}, Address: ${card.address}`;
    const encodedValue = encodeURIComponent(qrValue);
    return `https://api.qrserver.com/v1/create-qr-code/?data=${encodedValue}&size=150x150`;
  };

  const handleCardClick = (card) => {
    setSelectedCard(card);
    setSelectedStyle(0);
  };

  const handleCloseModal = () => {
    setSelectedCard(null);
  };

  const renderSignaturePreview = (card, styleIndex) => {
    const fullName = `${card.firstName} ${card.lastName}`;
    const email = card.email || 'email@example.com';
    const phone = card.phone || '+123456789';
    const company = card.company || 'Company Name';
    const title = card.title || 'Title';
    const department = card.department || 'Department';

    switch (styleIndex) {
      case 0:
        return (
          <div className="signature-box signature-style-0" id="signature-preview">
            <h2>{fullName}</h2>
            <p>{title} | {department}</p>
            <p><FaBuilding /> {company}</p>
            <p><FaEnvelope /> {email} | <FaPhone /> {phone}</p>
          </div>
        );
      case 1:
        return (
          <div className="signature-box signature-style-1" id="signature-preview">
            <div className="left-border">
              <h3>{fullName}</h3>
              <p>{title}</p>
              <p>{company}</p>
              <p>{email}</p>
              <p>{phone}</p>
            </div>
          </div>
        );
      case 2:
        return (
          <div className="signature-box signature-style-2" id="signature-preview">
            <div className="highlight-bar">
              <h2>{fullName}</h2>
              <span>{title} - {department}</span>
            </div>
            <p>{company}</p>
            <p>{email} | {phone}</p>
          </div>
        );
      case 3:
        return (
          <div className="signature-box signature-style-3" id="signature-preview">
            <h2 className="name">{fullName}</h2>
            <p className="role">{title} | {department}</p>
            <p className="company">{company}</p>
            <p className="contact"><FaEnvelope /> {email} &nbsp; <FaPhone /> {phone}</p>
          </div>
        );
      case 4:
        return (
          <div className="signature-box signature-style-4" id="signature-preview">
            <div className="column-layout">
              <div>
                <h2>{fullName}</h2>
                <p>{title}</p>
              </div>
              <div>
                <p><FaBuilding /> {company}</p>
                <p><FaEnvelope /> {email}</p>
                <p><FaPhone /> {phone}</p>
              </div>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  const handleDownloadSignature = () => {
    const signatureElement = document.getElementById('signature-preview');
    html2canvas(signatureElement).then((canvas) => {
      const link = document.createElement('a');
      link.href = canvas.toDataURL('image/png');
      link.download = `${selectedCard.firstName}_${selectedCard.lastName}_signature.png`;
      link.click();
    });
  };

  return (
    <div className="email-signatures-container">
      <Sidebar />
      <div className="content-wrapper">
        <h1 className="page-heading">Email Signatures</h1>
        <p className="page-intro">Manage your email signatures and view QR codes for each card.</p>

        <div className="cards-grid">
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

        {selectedCard && (
          <div className="modal-overlay">
            <div className="modal-content1">
              <FaTimes className="modal-close" onClick={handleCloseModal} />
              
              <div className="modal-left">
                <h2>{selectedCard.firstName} {selectedCard.lastName}</h2>
                <ul className="card-details">
                  <li><strong>Company Name:</strong> {selectedCard.company}</li>
                  <li><strong>Title:</strong> {selectedCard.title}</li>
                  <li><strong>Department:</strong> {selectedCard.department}</li>
                </ul>

                <div className="style-selector">
                  <h3>Select Signature Style:</h3>
                  {[...Array(5)].map((_, index) => (
                    <button 
                      key={index} 
                      className={`style-button ${selectedStyle === index ? 'active' : ''}`}
                      onClick={() => setSelectedStyle(index)}
                    >
                      Style {index + 1}
                    </button>
                  ))}
                </div>
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

                <div className="signature-preview">
                  <h3>Signature Preview:</h3>
                  {renderSignaturePreview(selectedCard, selectedStyle)}
                </div>

                <button className="download-signature-button" onClick={handleDownloadSignature}>
                  <FaDownload /> Download Signature
                </button>

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
