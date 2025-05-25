import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Dashboard from './Dashboard';
import Sidebar from './Sidebar';
import '../style/Home.css';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPager, faSort } from '@fortawesome/free-solid-svg-icons';

function Home() {
  const navigate = useNavigate();
  const [cards, setCards] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOrder, setSortOrder] = useState('asc');

  const token = localStorage.getItem('userToken');
  const headers = {
    Authorization: `Bearer ${token}`,
    Accept: 'application/json;odata.metadata=minimal;odata.streaming=true',
  };

  useEffect(() => {
    if (token) {
      Promise.all([
        axios.get('/api/odata/Cards', { headers }),
        axios.get('/api/odata/cardsinfo', { headers })
      ])
      .then(([cardsRes, infoRes]) => {
        const fetchedCards = cardsRes.data.value || [];
        const cardInfos = infoRes.data.value || [];

        // Merge cards with their corresponding info
        const mergedCards = fetchedCards.map(card => ({
          ...card,
          info: cardInfos.find(info => 
            card.Name?.toLowerCase() === info.firstname?.toLowerCase()
          )
        }));

        setCards(mergedCards);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
    } else {
      navigate('/login');
    }
  }, [token, navigate]);

  const handleNewCardClick = () => {
    navigate('/new-card');
  };

  const handleCardClick = (card) => {
    navigate('/view-card', { 
      state: { 
        cardId: card.info?.Oid // Use CardInfo OID for viewing
      }
    }); 
  };

  const filteredCards = cards.filter(card =>
    card.Name?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const sortedCards = filteredCards.sort((a, b) => {
    if (sortOrder === 'asc') {
      return a.Name?.localeCompare(b.Name);
    }
    return b.Name?.localeCompare(a.Name);
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
                  <div className="card-header" style={{ 
                    backgroundColor: card.colorType === 'solid' ? card.color : undefined,
                    background: card.colorType === 'gradient' 
                      ? `linear-gradient(135deg, ${card.gradientStart}, ${card.gradientEnd})`
                      : undefined 
                  }}>
                    {/* {card.logo && <img src={card.logo} alt="Logo" className="card-logo" />} */}
                  </div>
                  <h2>{card.Name}</h2>
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
