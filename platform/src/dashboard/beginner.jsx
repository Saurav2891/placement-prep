import './beginner.css';
import { Link } from 'react-router-dom';
const BeginnerPage = () => {
    const cardsData = [
        { level: 1, title: 'Beginner', description: 'Start your journey',link:"/beginner" },
        { level: 2, title: 'Intermediate', description: 'Take it to the next level', link: '/intermediate' },
        { level: 3, title: 'Advanced', description: 'Challenge yourself',link: '/advanced' },
        { level: 4, title: 'Expert', description: 'Master your skills', link: '/expert' },
      ];
    return (
        <section className=" card-section">
            <div className="hero-content">
                <h1>Supercharge Your Placement Prep</h1>
                <p>Get ready to ace your interviews and land your dream job.</p>
            </div>
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
  
  export default BeginnerPage;