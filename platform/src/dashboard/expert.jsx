import './expert.css';
import React,{ useState } from 'react';
import ExpertPopup from '../utilities/expertpopup';
import { Navigate } from 'react-router-dom';

const ExpertPage = () => { 
  const [showPopup, setShowPopup] = useState(true);

  const closePopup = () => {
    setShowPopup(false);
    window.location.href = '/';
  };

  return (
    <div className="expert-page">
      {showPopup && <ExpertPopup onClose={closePopup} />}
      <h1>Welcome to the Expert Page</h1>
    </div>
  );
};
  
export default ExpertPage;
