import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Sidebar from './Sidebar';
import axios from 'axios';
import QRCode from 'react-qr-code';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDownload, faShareAlt, faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import '../style/ViewCard.css';

function ViewCardPage() {
  const [selectedSection, setSelectedSection] = useState('design');
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    title: '',
    department: '',
    company: '',
    color: '#ff5722',
    colorType: 'solid',
    gradientStart: '#ff5722',
    gradientEnd: '#ff9800',
    logo: ''
  });
  const [card, setCard] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const location = useLocation();
  const { cardId } = location.state || {};
  const token = localStorage.getItem('userToken');

  useEffect(() => {
    if (!token) {
      navigate('/login');
      return;
    }

    if (!cardId) {
      navigate('/home');
      return;
    }

    const fetchCardData = async () => {
      try {
        // Fetch card metadata
        const cardResponse = await axios.get(`/api/odata/Cards(Oid=${cardId})`, {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: 'application/json;odata.metadata=minimal'
          }
        });

        // Fetch data info
        const dataResponse = await axios.get(`/api/odata/DataInfos(Oid=${cardId})`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        const cardData = cardResponse.data;
        const dataInfo = dataResponse.data;

        setCard(cardData);
        setFormData({
          firstName: dataInfo.firstname || '',
          lastName: dataInfo.Lastname || '',
          title: dataInfo.Title || '',
          department: dataInfo.Department || '',
          company: dataInfo.Company || '',
          color: cardData.color || '#ff5722',
          colorType: cardData.colorType || 'solid',
          gradientStart: cardData.gradientStart || '#ff5722',
          gradientEnd: cardData.gradientEnd || '#ff9800',
          logo: dataInfo.Logo || ''
        });
        setLoading(false);
      } catch (error) {
        console.error('Error fetching card data:', error);
        setError('Failed to load card data');
        setLoading(false);
        navigate('/home');
      }
    };

    fetchCardData();
  }, [cardId, token, navigate]);

  const handleEditClick = () => {
    navigate('/new-card', { 
      state: { 
        card: { ...formData, Oid: cardId },
        isEditing: true 
      }
    });
  };

  const handleDownloadClick = () => {
    const vcfData = `
      BEGIN:VCARD
      VERSION:3.0
      FN:${formData.firstName} ${formData.lastName}
      ORG:${formData.company}
      TITLE:${formData.title}
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

  const handleDeleteClick = async () => {
    if (window.confirm('Are you sure you want to delete this card?')) {
      try {
        await axios.delete(`/api/odata/Cards(Oid=${cardId})`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        navigate('/home');
      } catch (error) {
        console.error('Error deleting card:', error);
        alert('Failed to delete card');
      }
    }
  };

  if (loading) {
    return <div className="loading-container">Loading card data...</div>;
  }

  if (error) {
    return <div className="error-container">{error}</div>;
  }

  return (
    <div className="new-card-page-container">
      <Sidebar />
      <div className="new-card-layout">
        {/* Card Preview Section */}
        <div className="new-card-card frame1 rectangle">
          <div className="card-header" style={{ 
            backgroundColor: formData.colorType === 'solid' ? formData.color : undefined,
            background: formData.colorType === 'gradient' 
              ? `linear-gradient(135deg, ${formData.gradientStart}, ${formData.gradientEnd})`
              : undefined 
          }}>
            {formData.logo && <img src={formData.logo} alt="Logo" className="card-logo" />}
          </div>

          <div className="new-card-content">
            <h1 className="new-card-title">
              {`${formData.firstName} ${formData.lastName}`}
            </h1>
            <p className="new-card-title-extra">{formData.title}</p>
            <p className="new-card-department" style={{ color: formData.color }}>
              {formData.department}
            </p>
            <p className="new-card-company">{formData.company}</p>
          </div>
        </div>

        {/* Card Actions and Details Section */}
        <div className="new-card-details-container">
          <div className="new-card-tabs">
            <button
              className={selectedSection === 'design' ? 'active' : ''}
              onClick={() => setSelectedSection('design')}
            >
              Analytics
            </button>
            <button
              className={selectedSection === 'info' ? 'active' : ''}
              onClick={() => setSelectedSection('info')}
            >
              Settings
            </button>
          </div>

          <div className="card-action-buttons">
            <button className="download-button" onClick={handleDownloadClick}>
              <FontAwesomeIcon icon={faDownload} /> Download
            </button>
            <button className="edit-button" onClick={handleEditClick}>
              <FontAwesomeIcon icon={faEdit} /> Edit
            </button>
          </div>

          <div className="new-card-section">
            {selectedSection === 'design' && (
              <div className="view-card-sections">
                <div className="stats-container">
                  <div className="stats-box">
                    <h4>Total Views</h4>
                    <p>{card?.totalview || 0}</p>
                  </div>
                  <div className="stats-box">
                    <h4>Total Saves</h4>
                    <p>{card?.totalsaves || 0}</p>
                  </div>
                </div>

                <div className="qr-section">
                  <h4>Share Card</h4>
                  <QRCode value={window.location.href} size={128} />
                  <p className="qr-instruction">Scan QR code to share</p>
                </div>
              </div>
            )}

            {selectedSection === 'info' && (
              <div className="settings-section">
                <div className="card-info">
                  <h4>Card Details</h4>
                  <p><strong>Name:</strong> {formData.firstName} {formData.lastName}</p>
                  <p><strong>Company:</strong> {formData.company}</p>
                  <p><strong>Title:</strong> {formData.title}</p>
                  <p><strong>Department:</strong> {formData.department}</p>
                </div>

                <div className="danger-zone">
                  <h4>Danger Zone</h4>
                  <button className="delete-button" onClick={handleDeleteClick}>
                    <FontAwesomeIcon icon={faTrash} /> Delete Card
                  </button>
                  <p className="warning-text">
                    Warning: This action cannot be undone. All card data will be permanently deleted.
                  </p>
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