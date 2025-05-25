import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import Sidebar from './Sidebar';
import { encode as btoa } from 'js-base64';
import '../style/ViewCard.css';
import QRCode from 'react-qr-code';

function ViewCardPage() {
  const [selectedSection, setSelectedSection] = useState('design');
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
    logo: '',
    socialLinks: {},
  });
  const [cardStats, setCardStats] = useState({
    totalViews: 0,
    totalShares: 0,
    totalContacts: 0,
    paused: false,
    personalizedLink: ''
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const location = useLocation();
  const { cardId } = location.state || {};

  useEffect(() => {
    const fetchCardData = async () => {
      const token = localStorage.getItem('userToken');
      if (!token) {
        navigate('/login');
        return;
      }

      try {
        // Fetch card info using the CardInfo OID from Home component
        const infoResponse = await axios.get(`/api/odata/cardsinfo(${cardId})`, {
          headers: { Authorization: `Bearer ${token}` }
        });

        const cardInfo = infoResponse.data;

        // Parse color data
        const colorType = cardInfo.Color?.includes(',') ? 'gradient' : 'solid';
        const [gradientStart, gradientEnd] = colorType === 'gradient' 
          ? cardInfo.Color.split(',') 
          : [cardInfo.Color, cardInfo.Color];

        // Set form data from cardinfo
        setFormData({
          prefix: cardInfo.prefix || '',
          firstName: cardInfo.firstname || '',
          lastName: cardInfo.Lastname || '',
          suffix: cardInfo.sufix || '',
          preferredName: cardInfo.PreferredName || '',
          title: cardInfo.Title || '',
          department: cardInfo.Department || '',
          company: cardInfo.Company || '',
          headline: cardInfo.Headline || '',
          color: colorType === 'solid' ? cardInfo.Color : gradientStart,
          logo: cardInfo.Logo || '',
          socialLinks: cardInfo.SocialLinks ? JSON.parse(cardInfo.SocialLinks) : {},
        });

        // Set dummy stats (replace with actual API call if needed)
        setCardStats({
          totalViews: cardInfo.totalviews || 0,
          totalShares: cardInfo.totalsaves || 0,
          totalContacts: cardInfo.totalcontacts || 0,
          paused: cardInfo.pausecard || false,
          personalizedLink: cardInfo.personalizedLink || ''
        });

      } catch (error) {
        console.error('Error fetching card data:', error);
        setError('Failed to load card data');
        navigate('/home');
      } finally {
        setLoading(false);
      }
    };

    if (cardId) fetchCardData();
  }, [cardId, navigate]);

  const handleDownloadClick = () => {
    const vcfData = `
      BEGIN:VCARD
      VERSION:3.0
      FN:${formData.firstName} ${formData.lastName}
      ORG:${formData.company}
      TITLE:${formData.title}
      NOTE:${formData.headline}
      END:VCARD
    `.trim();

    const blob = new Blob([vcfData], { type: 'text/vcard' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${formData.firstName}_${formData.lastName}.vcf`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleEditClick = () => {
    navigate('/new-card', { 
      state: { 
        card: formData,
        cardId: cardId
      }
    });
  };

  const handleDeleteClick = async () => {
    if (!window.confirm('Are you sure you want to delete this card?')) return;

    try {
      const token = localStorage.getItem('userToken');
      await axios.delete(`/api/odata/cardsinfo(${cardId})`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      alert('Card deleted successfully!');
      navigate('/home');
    } catch (error) {
      console.error('Error deleting card:', error);
      alert('Failed to delete card.');
    }
  };

  if (loading) {
    return (
      <div className="new-card-page-container">
        <Sidebar />
        <div className="loading-message">Loading card details...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="new-card-page-container">
        <Sidebar />
        <div className="error-message">{error}</div>
      </div>
    );
  }

  const shareData = btoa(JSON.stringify(formData));
  const shareUrl = `${window.location.origin}/shared-card?data=${shareData}`;

  return (
    <div className="new-card-page-container">
      <Sidebar />
      <div className="new-card-layout">
        <div className="new-card-card frame1 rectangle">
          <div className="card-header" style={{ backgroundColor: formData.color }}>
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
        </div>

        <div className="new-card-details-container">
          <div className="new-card-tabs">
            <button className={selectedSection === 'design' ? 'active' : ''}
              onClick={() => setSelectedSection('design')}>
              Share
            </button>
            <button className={selectedSection === 'info' ? 'active' : ''}
              onClick={() => setSelectedSection('info')}>
              Settings
            </button>
          </div>

          <div className="card-action-buttons">
            <button className="download-button" onClick={handleDownloadClick}>
              <i className="fas fa-download"></i> Download
            </button>
            <button className="edit-button" onClick={handleEditClick}>
              <i className="fas fa-edit"></i> Edit
            </button>
          </div>

          <div className="new-card-section">
            {selectedSection === 'design' && (
              <div className="view-card-sections">
                <div className="stats-container">
                  <div className="stats-box">
                    <h4>Total Views</h4>
                    <p>{cardStats.totalViews}</p>
                  </div>
                  <div className="stats-box">
                    <h4>Total Shares</h4>
                    <p>{cardStats.totalShares}</p>
                  </div>
                  <div className="stats-box">
                    <h4>Total Contacts</h4>
                    <p>{cardStats.totalContacts}</p>
                  </div>
                </div>

                <div className="qr-section">
                  <h4>Scan to Share</h4>
                  <QRCode value={shareUrl} size={160} />
                </div>

                <div className="social-share-section">
                  <h4>Share on Social Media</h4>
                  <div className="social-share-buttons">
                    <a href={`https://facebook.com/sharer/sharer.php?u=${shareUrl}`} 
                      target="_blank" rel="noopener noreferrer">
                      <i className="fab fa-facebook"></i>
                    </a>
                    <a href={`https://twitter.com/intent/tweet?url=${shareUrl}`} 
                      target="_blank" rel="noopener noreferrer">
                      <i className="fab fa-twitter"></i>
                    </a>
                    <a href={`https://www.linkedin.com/shareArticle?url=${shareUrl}`} 
                      target="_blank" rel="noopener noreferrer">
                      <i className="fab fa-linkedin"></i>
                    </a>
                  </div>
                </div>
              </div>
            )}

            {selectedSection === 'info' && (
              <div className="settings-sections">
                <div className="settings-section">
                  <h4>Card Details</h4>
                  <p><strong>Name:</strong> {formData.firstName} {formData.lastName}</p>
                  <p><strong>Company:</strong> {formData.company}</p>
                  <p><strong>Title:</strong> {formData.title}</p>
                </div>

                <div className="settings-section danger-zone">
                  <h4>Delete Card</h4>
                  <p>Permanently remove this card from your account.</p>
                  <button className="delete-button" onClick={handleDeleteClick}>
                    Delete Card
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ViewCardPage;