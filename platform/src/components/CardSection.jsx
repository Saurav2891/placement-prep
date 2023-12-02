import React,{ useState, useEffect } from 'react';
import './CardSection.css'; // Import the CSS file for styling
import { Link } from 'react-router-dom';
import axios from 'axios';
import userDetails from '../../../backend/api/users/userDetails';

const CardSection = () => {
  const [cardsData, setCardsData] = useState([
    { level: 1, title: 'Beginner', description: 'Start your journey', link: '/beginner' },
    { level: 2, title: 'Intermediate', description: 'Take it to the next level', link: '/intermediate' },
    { level: 3, title: 'Advanced', description: 'Challenge yourself', link: '/advanced' },
    { level: 4, title: 'Expert', description: 'Master your skills', link: '/expert' },
  ]);

  useEffect(() => {
    // Fetch data from the API
    axios.get('http://localhost:3000/api/users/levels')
      .then(response => {
        // console.log(response.data);
        // Map the API response to match the structure you need
        try {
        const levelsData = response.data.data;
        const updatedCardsData = cardsData.map((card, index) => {
          if(index < 3){
            return {
              level: levelsData[index].level_id,
              title: levelsData[index].level_name,
              description: cardsData[index].description,
              link: cardsData[index].link
              };
          }
          return card;
        });
        
        // Set the mapped data to the state
        setCardsData(updatedCardsData);
      }
      catch (error) {
        console.error('Error mapping data:', error);
      }
      })
      .catch(error => {
        console.error(error);
      });
  }, []);

  const handleCardClick = (card) => {
    // Set the level and topic in UserDetails
    userDetails.setLevel(card.title);
    // Navigate to the card's link
    // history.push(`${card.link}?levelId=${card.level}`);
  };
  return (
    <section className="card-section">
      {cardsData.map((card) => (
        <div className="card" key={card.level} onClick={() => handleCardClick(card)}>
          <div className="card-header">
            <h2>{card.title}</h2>
          </div>
          <div className="card-content">
            <p>{card.description}</p>
            <Link  to={`${card.link}?levelId=${card.level}`}>
              <button className="card-button">Learn More</button>
            </Link>
          </div>
        </div>
      ))}
    </section>
  );
};

export default CardSection;
