import React from 'react';
import { useLocation } from 'react-router-dom';
import '../style/ViewCard.css';


function SharedCardPage() {
  const query = new URLSearchParams(useLocation().search);
  const data = query.get('data');
  const cardData = data ? JSON.parse(atob(data)) : null;

  if (!cardData) return <div>Invalid or expired card link.</div>;

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
      </div>
    </div>
  );
}

export default SharedCardPage;
