import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Dashboard from './Dashboard';
import Sidebar from './Sidebar';
import './NewCardPage';
import '../style/Home.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPager, faSort } from '@fortawesome/free-solid-svg-icons'; // Import faPager and faSort icons

function Home() {
  const navigate = useNavigate();
  const [cards, setCards] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOrder, setSortOrder] = useState('asc');

  useEffect(() => {
    // Load saved cards from local storage
    const savedCards = JSON.parse(localStorage.getItem('cards')) || [];
    setCards(savedCards);
  }, []);

  const handleNewCardClick = () => {
    navigate('/new-card');
  };

  const handleCardClick = (card) => {
    // Store the selected card in localStorage before navigating
    localStorage.setItem('selectedCard', JSON.stringify(card));
    navigate('/view-card', { state: { card } });
  };

  const filteredCards = cards.filter(card =>
    card.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    card.lastName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const sortedCards = filteredCards.sort((a, b) => {
    if (sortOrder === 'asc') {
      return a.firstName.localeCompare(b.firstName);
    }
    return b.firstName.localeCompare(a.firstName);
  });

  return (
    <div className="home-container">
      <Sidebar />
      <div className="dashboard-wrapper">
        <Dashboard />
        <div className="main-content">
          <div className="sep">
            <h1>Welcome to your cards!</h1>
          </div>

          {/* Conditionally render search bar, sort button, and new card button if cards exist */}
          {cards.length > 0 && (
            <div className="search-sorting">
              <input
                type="text"
                placeholder="Search..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="search-input"
              />
              <button onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')} className="sort-button">
                <FontAwesomeIcon icon={faSort} /> Sort
              </button>
              <button className="new-card-btn1" onClick={handleNewCardClick}>+ New Card</button>
            </div>
          )}

          <div className="cards-container">
            {/* Conditionally render the Prem Borkar card */}
            {cards.length === 0 && (
              <div className="card personal-card prem-borkar-card" onClick={handleNewCardClick}>
                <div className="card-header personal-header"></div>
                <h2>Business Card</h2>
                <ul>
                  <li><span className="li-content1"></span></li>
                  <li><span className="li-content1"></span></li>
                  <li><span className="li-content2"></span></li>
                  <li><FontAwesomeIcon icon={faPager} className="custom-icon" /><span className="li-content"></span></li>
                  <li><FontAwesomeIcon icon={faPager} className="custom-icon" /><span className="li-content"></span></li>
                  <li><FontAwesomeIcon icon={faPager} className="custom-icon" /><span className="li-content"></span></li>
                  <li><FontAwesomeIcon icon={faPager} className="custom-icon" /><span className="li-content"></span></li>
                </ul>
                <div className="card-footer">
                  <span>Personal</span>
                  <span>Aug 30, 2024</span>
                </div>
              </div>
            )}

            {cards.length === 0 && (
              <div className="card personal-card prem-borkar-card" onClick={handleNewCardClick}>
                <div className="card-header personal-header"></div>
                <h2>Visiting Card</h2>
                <ul>
                  <li><span className="li-content1"></span></li>
                  <li><span className="li-content1"></span></li>
                  <li><span className="li-content2"></span></li>
                  <li><FontAwesomeIcon icon={faPager} className="custom-icon" /><span className="li-content"></span></li>
                  <li><FontAwesomeIcon icon={faPager} className="custom-icon" /><span className="li-content"></span></li>
                  <li><FontAwesomeIcon icon={faPager} className="custom-icon" /><span className="li-content"></span></li>
                  <li><FontAwesomeIcon icon={faPager} className="custom-icon" /><span className="li-content"></span></li>
                </ul>
                <div className="card-footer">
                  <span>Personal</span>
                  <span>Aug 30, 2024</span>
                </div>
              </div>
            )}

            {/* Render saved cards */}
            {sortedCards.length > 0 && (
              sortedCards.map((card, index) => (
                <div key={index} className="card" onClick={() => handleCardClick(card)}>
                  <div className="card-header" style={{ backgroundColor: card.color }}>
                    {/* {card.logo && <img src={card.logo} alt="Logo" className="card-logo" />} */}
                  </div>
                  <h2>{card.firstName} {card.lastName}</h2>
                  <ul>
                    <li><span className="li-content1"></span></li>
                    <li><span className="li-content1"></span></li>
                    <li><span className="li-content2"></span></li>
                    <li><FontAwesomeIcon icon={faPager} className="custom-icon" /><span className="li-content"></span></li>
                    <li><FontAwesomeIcon icon={faPager} className="custom-icon" /><span className="li-content"></span></li>
                    <li><FontAwesomeIcon icon={faPager} className="custom-icon" /><span className="li-content"></span></li>
                    <li><FontAwesomeIcon icon={faPager} className="custom-icon" /><span className="li-content"></span></li>
                  </ul>
                  <div className="card-footer">
                    <span>Saved Card</span>
                    <span>{new Date().toLocaleDateString()}</span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
