import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from './Sidebar';
import { encode as btoa } from 'js-base64';
import '../style/ViewCard.css';
import QRCode from 'react-qr-code'; // Make sure to install react-qr-code package

function ViewCardPage() {
  const [selectedSection, setSelectedSection] = useState('design');
  const [selectedFrame, setSelectedFrame] = useState('frame1'); // Frame selection state
  const [formData, setFormData] = useState({
    prefix: '',
    firstName: '',
    lastName: '',
    suffix: '',
    preferredName: '',
    title: '',
    department: '',
    company: '',
    headline: '',
    color: '#ff5722',
    colorType: 'solid', // Add this line
    gradientStart: '#ff5722',
    gradientEnd: '#ff9800',
    logo: '',
    shape: 'rectangle',
    socialLinks: {},
  });
  const [card, setCard] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const savedCard = JSON.parse(localStorage.getItem('selectedCard'));
    if (savedCard) {
      setCard(savedCard);
      setFormData({
        ...savedCard,
        colorType: savedCard.colorType || 'solid' // Ensure colorType exists
      });
      setSelectedFrame(savedCard.selectedFrame);
    } else {
      navigate('/');
    }
  }, [navigate]);

  if (!card) {
    return <div>Loading...</div>;
  }

  const handleFrameChange = (frame) => {
    setSelectedFrame(frame);
  };

  const handleEditClick = () => {
    // Navigate to NewCardPage with card data
    navigate('/new-card', { state: { card: formData, selectedFrame } });
  };

  const handleDownloadClick = () => {
    // Generate VCF content
    const vcfData = `
BEGIN:VCARD
VERSION:3.0
FN:${formData.firstName} ${formData.lastName}
ORG:${formData.company}
TITLE:${formData.title}
EMAIL:${formData.email || ''}
TEL:${formData.phone || ''}
ADR:${formData.address || ''}
URL:${formData.website || ''}
NOTE:${formData.headline || ''}
END:VCARD
    `.trim();

    // Create a blob and trigger download
    const blob = new Blob([vcfData], { type: 'text/vcard' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${formData.firstName}_${formData.lastName}.vcf`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleDeleteClick = () => {
    // Remove card from localStorage
    localStorage.removeItem('selectedCard');

    // Redirect to home after deletion
    alert('Card deleted successfully!');
    navigate('/home');
  };
  

  const shareData = btoa(JSON.stringify(formData));
  const shareUrl = `${window.location.origin}/shared-card?data=${shareData}`;

  return (
    <div className="new-card-page-container">
      <Sidebar />
      <div className="new-card-layout">
        {/* card view */}
        <div className={`new-card-card ${selectedFrame} ${formData.shape}`}>
        <div className="card-header" style={{ 
              backgroundColor: formData.colorType === 'solid' ? formData.color : undefined,
              background: formData.colorType === 'gradient' 
                ? `linear-gradient(135deg, ${formData.gradientStart}, ${formData.gradientEnd})`
                : undefined 
          }}>
            {formData.logo && <img src={formData.logo} alt="Logo" className="card-logo" />}
          </div>

          <div className="new-card-content">
            <div className="dashed-line"></div>
            
            <h1 className="new-card-title">
              {`${formData.prefix} ${formData.firstName} ${formData.lastName} ${formData.suffix}`}
            </h1>
            <p className="new-card-title-extra">{formData.title}</p>
            <p className="new-card-department" style={{ color: formData.color }}>
              {formData.department}
            </p>
            <p className="new-card-company">{formData.company}</p>
          </div>
          <p className="new-card-headline">{formData.headline}</p>
          <p className="new-card-preferredName">
            {formData.preferredName}
          </p>
          <div className="social-links-container">
            {Object.entries(formData.socialLinks).map(([platform, url]) => (
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

        <div className="new-card-details-container">
          {/* Tabs Section */}
          <div className="new-card-tabs">
            <button
              className={selectedSection === 'design' ? 'active' : ''}
              onClick={() => setSelectedSection('design')}
            >
              Share
            </button>
            <button
              className={selectedSection === 'info' ? 'active' : ''}
              onClick={() => setSelectedSection('info')}
            >
              Settings
            </button>
          </div>

          {/* Download, Share, and Edit Section */}
          <div className="card-action-buttons">
            <button className="download-button" onClick={handleDownloadClick}>
              <i className="fas fa-download"></i> Download
            </button>
            <button className="share-button">
              <i className="fas fa-share-alt"></i> Share
            </button>
            <button className="edit-button" onClick={handleEditClick}>
              <i className="fas fa-edit"></i> Edit
            </button>
          </div>

         <div className="new-card-section">
         {selectedSection === 'design' && (
          <div className="view-card-sections">
            
                {/* Section 1: Stats */}
                <div className="oop">
            <div className="section-one">
              <div className="stats-box">
                <h4>Total Views</h4>
                <p>{card.totalViews || 0}</p>
              </div>
              <div className="stats-box">
                <h4>Total Shares</h4>
                <p>{card.totalShares || 0}</p>
              </div>
              <div className="stats-box">
                <h4>Total Contacts</h4>
                <p>{card.totalContacts || 0}</p>
              </div>
                  </div>
                  </div>

            {/* Section 2: QR Code */}
            <div className="section-two">
              <div className="qr-box">
                <h4>Scan to Share</h4>
                <QRCode value={shareUrl} size={160} />              </div>
            </div>

            {/* Section 3: Social Media Links */}
            <div className="section-three">
              <h4>Share on Social Media</h4>
              <div className="share-links">
                <a href={`https://facebook.com/sharer/sharer.php?u=${window.location.href}`} target="_blank" rel="noopener noreferrer">Facebook</a>
                <a href={`https://twitter.com/intent/tweet?url=${window.location.href}`} target="_blank" rel="noopener noreferrer">Twitter</a>
                <a href={`https://www.linkedin.com/shareArticle?url=${window.location.href}`} target="_blank" rel="noopener noreferrer">LinkedIn</a>
              </div>
            </div>

          </div>
        )}


        {selectedSection === 'info' && (
          <div className="info-options">

            {/* Card Details Section */}
            <div className="settings-section">
              <h4>Card Details</h4>
              <p><strong>Name: </strong>{formData.firstName} {formData.lastName}</p>
              <p><strong>Company: </strong>{formData.company}</p>
              <p><strong>Title: </strong>{formData.title}</p>
            </div>

            {/* Personalized Link Section */}
            <div className="settings-section">
              <h4>Personalized Link</h4>
              <input
                type="text"
                value={formData.personalizedLink || `${window.location.href}/${formData.firstName}-${formData.lastName}`}
                readOnly
              />
              <button
                className="copy-button"
                onClick={() => navigator.clipboard.writeText(`${window.location.href}/${formData.firstName}-${formData.lastName}`)}
              >
                Copy Link
              </button>
            </div>

            {/* Pause/Unpause Card Section */}
            <div className="settings-section">
              <h4>Pause Card</h4>
              <button className="pause-button" onClick={() => {/* Pause logic here */}}>
                {card.paused ? 'Unpause Card' : 'Pause Card'}
              </button>
            </div>

            {/* Delete Card Section */}
            <div className="settings-section">
              <h4>Delete Card</h4>
              <p>Remove this card permanently from your project.</p>
              <button className="delete-button" onClick={handleDeleteClick}>
                Delete Card
              </button>
            </div>

            {/* QR Code with Logo Section */}
            <div className="settings-section">
              <h4>QR Code with Logo</h4>
              <div className="qr-code-with-logo">
                <QRCode value={window.location.href} />
                {formData.logo && (
                  <img src={formData.logo} alt="Logo" className="qr-logo" />
                )}
              </div>
            </div>

          </div>
        )}



            {selectedSection === 'widget' && (
              <div className="widget-options" style={{ display: 'none' }}>
                <h3>Social Links</h3>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ViewCardPage;
