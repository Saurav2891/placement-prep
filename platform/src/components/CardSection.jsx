// import React from 'react';
import './CardSection.css'; // Import the CSS file for styling
import { Link } from 'react-router-dom';
const CardSection = () => {
  const cardsData = [
    { level: 1, title: 'Beginner', description: 'Start your journey',link:"/beginner" },
    { level: 2, title: 'Intermediate', description: 'Take it to the next level', link: '/intermediate' },
    { level: 3, title: 'Advanced', description: 'Challenge yourself',link: '/advanced' },
    { level: 4, title: 'Expert', description: 'Master your skills', link: '/expert' },
  ];

  return (
    <section className="card-section">
      {cardsData.map((card) => (
        <div className="card" key={card.level}>
          <div className="card-header">
            <h2>{card.title}</h2>
          </div>
          <div className="card-content">
            <p>{card.description}</p>
            <Link to={card.link}> {/* Use Link component */}
              <button className="card-button">Learn More</button>
            </Link>
          </div>
        </div>
      ))}
    </section>
  );
};

export default CardSection;
