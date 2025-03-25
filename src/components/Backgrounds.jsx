import React, { useState, useEffect } from 'react';
import Sidebar from './Sidebar';
import '../style/Backgrounds.css';

const Backgrounds = () => {
  const [cards, setCards] = useState([]);
  const [selectedFrame, setSelectedFrame] = useState(null);
  const [selectedCard, setSelectedCard] = useState(null);

  useEffect(() => {
    // Fetch cards from local storage
    const savedCards = JSON.parse(localStorage.getItem('cards')) || [];
    setCards(savedCards);
  }, []);

  const frames = [
    { id: 1, imgSrc: '../src/assets/gallary5.png', title: 'Frame 1', description: 'Elegant design.' },
    { id: 2, imgSrc: '../src/assets/gallary6.jpg', title: 'Frame 2', description: 'Modern style.' },
    { id: 3, imgSrc: '../src/assets/gallary1.jpg', title: 'Frame 3', description: 'Professional look.' },
    { id: 4, imgSrc: '../src/assets/gallary2.jpg', title: 'Frame 4', description: 'Creative touch.' },
    { id: 5, imgSrc: '../src/assets/gallary3.jpg', title: 'Frame 5', description: 'Classic frame.' },
    { id: 6, imgSrc: '../src/assets/gallary4.jpg', title: 'Frame 6', description: 'Minimalist design.' },
    { id: 7, imgSrc: '../src/assets/gallary7.jpg', title: 'Frame 1', description: 'Elegant design.' },
    { id: 8, imgSrc: '../src/assets/gallary8.jpg', title: 'Frame 2', description: 'Modern style.' },
    { id: 9, imgSrc: '../src/assets/gallary9.jpg', title: 'Frame 3', description: 'Professional look.' },
    { id: 10, imgSrc: '../src/assets/gallary10.jpg', title: 'Frame 4', description: 'Creative touch.' },
    { id: 11, imgSrc: '../src/assets/gallary11.jpg', title: 'Frame 5', description: 'Classic frame.' },
  ];

  const handleFrameSelect = (frame) => {
    setSelectedFrame(frame);
  };

  const handleCardSelect = (card) => {
    setSelectedCard(card);
  };

  return (
    <div className="backgrounds-page">
      <Sidebar />
      <div className="backgrounds-main-content">
        {/* Cards Section */}
        <div className="backgrounds-cards-section">
          <h2 className="backgrounds-cards-heading">Saved Cards</h2>
          <div className="backgrounds-cards-container">
            {cards.length === 0 ? (
              <p className="backgrounds-no-cards">No cards available.</p>
            ) : (
              cards.map((card, index) => (
                <div 
                  key={index} 
                  className={`backgrounds-card ${selectedCard === card ? 'selected-card' : ''}`}
                  onClick={() => handleCardSelect(card)}
                >
                  <div className="card-header"></div>
                  <div className="backgrounds-card-content">
                    <h2 className="backgrounds-card-title">{card.firstName} {card.lastName}</h2>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Frames Section */}
        <div className="backgrounds-frames">
          <h2 className="backgrounds-frames-title">Download Frames</h2>
          <div className="backgrounds-frame-gallery">
            {selectedFrame && (
              <div className="backgrounds-frame-preview-container">
                <div className="backgrounds-frame-preview">
                  {selectedCard && (
                    <div className="selected-card-preview">
                      <h4>{selectedCard.firstName} {selectedCard.lastName}</h4>
                    </div>
                  )}
                  <img
                    src={selectedFrame.imgSrc}
                    alt={selectedFrame.title}
                    className="backgrounds-frame-preview-img"
                  />
                </div>
                <div className="backgrounds-frame-description">
                  <h3>{selectedFrame.title}</h3>
                  <p>{selectedFrame.description}</p>
                  <a
                    href={selectedFrame.imgSrc}
                    download={selectedFrame.title}
                    className="backgrounds-download-btn"
                  >
                    Download Frame
                  </a>
                </div>
              </div>
            )}
            
            <div className="backgrounds-frame-grid">
              {frames.map((frame) => (
                <div
                  key={frame.id}
                  className={`backgrounds-frame-item ${selectedFrame === frame ? 'selected' : ''}`}
                  onClick={() => handleFrameSelect(frame)}
                >
                  <img src={frame.imgSrc} alt={frame.title} className="backgrounds-frame-img" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Backgrounds;
