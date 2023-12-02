import './advanced.css';
import aptitudeGif from '../assets/aptitude.gif';
import reasoningGif from '../assets/reasoning.gif';
import codingGif from '../assets/coding.gif';
import pythonGif from '../assets/python.gif';
import { Link, useLocation } from 'react-router-dom';
import React,{ useState, useEffect } from 'react';
import axios from 'axios';
import userDetails from '../../../backend/api/users/userDetails';

const AdvancedPage = () => {
  const [topics, setTopics] = useState([
    {
      topid_id: 1,
      title: 'Aptitude',
      description: 'Practice aptitude questions',
      animation: 'animation-aptitude',
      gif: aptitudeGif, 
    },
    {
      topic_id: 2,
      title: 'Reasoning',
      description: 'Improve your reasoning skills',
      animation: 'animation-reasoning',
      gif: reasoningGif,
    },
    {
      topic_id: 3,
      title: 'Coding',
      description: 'Sharpen your coding abilities',
      animation: 'animation-coding',
      gif: codingGif,
    },
    {
      topic_id: 4,
      title: 'Python',
      description: 'Master Python programming',
      animation: 'animation-python',
      gif: pythonGif,
    },
  ]);
  
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const levelId = searchParams.get('levelId');
  useEffect(() => {
    if (!levelId) {
      console.error('Level ID is missing in URL parameters');
      return;
    }

    // Fetch titles from the API based on levelId
    axios.get(`http://localhost:3000/api/topics/topics?levelId=${levelId}`,
      { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } })
      .then(response => {
        try {
        const titlesData = response.data.data;
        const updatedTopics = topics.map((title, index) => {
          if(index < 4){
            return {
              topic_id: titlesData[index].topic_id,
              title: titlesData[index].topic_name.substring(9),
              description: topics[index].description,
              animation: topics[index].animation,
              gif: topics[index].gif,
              };
          }
          return title;
        });
        setTopics(updatedTopics);
      }
      catch (error) {
        console.error('Error mapping data:', error);
      }
      })
      .catch(error => {
        console.error('Error fetching titles:', error);
      });
  }, [levelId]);

  const handleCardClick = (topic) => {
    // Set the level and topic in UserDetails
    userDetails.setTopic(topic.title);
    // Navigate to the card's link
    // history.push(`${card.link}?levelId=${card.level}`);
    // console.log(userDetails);
  };
    return (
        <section className=" card-section-beg">
            <div className="quote-card">
            <div className="background-image"></div>
            <div className="quote-text">
              <h3>"College is your canvas, and every lesson you learn adds <br />color to your future success. <br/> <span className='spaced-text'></span> Embrace challenges, aim high, and paint a masterpiece of opportunities through diligent preparation."</h3>
              <p>-Tony Robbins</p>
            </div>
          </div>
          <div className="topic-cards-container">
          <div className="topic-cards-grid">
            {topics.map((topic) => (
              <div className="topic-card" key={topic.title} onClick={() => handleCardClick(topic)}>
                <div className={`animation-section ${topic.animation}`}>
                <img className="animation-gif" src={topic.gif} alt={`${topic.title} Animation`} />
                </div>
                <h3 className="topic-title">{topic.title}</h3>
                <p className="topic-description">{topic.description}</p>
                <Link to={`/testpage?topicId=${topic.topic_id}`} >
                  <button className="topic-button">Attempt Test</button>
                </Link>
              </div>
            ))}
          </div>
          </div>

        </section>
        
      );
  };
  
  export default AdvancedPage;