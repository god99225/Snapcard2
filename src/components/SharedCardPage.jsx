import React from 'react';
import { useLocation } from 'react-router-dom';

function SharedCardPage() {
  const query = new URLSearchParams(useLocation().search);
  const data = query.get('data');
  const cardData = data ? JSON.parse(atob(data)) : null;

  if (!cardData) return <div>Invalid or expired card link.</div>;

  return (
    <div className="shared-card-container">
      <div className="card">
        <h1>{cardData.firstName} {cardData.lastName}</h1>
        <p>{cardData.title} at {cardData.company}</p>
        <p>{cardData.headline}</p>
        {/* Add more card visuals as needed */}
      </div>
    </div>
  );
}

export default SharedCardPage;
