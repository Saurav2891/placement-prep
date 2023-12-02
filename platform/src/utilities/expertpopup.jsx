import React from 'react';
import './expertpopup.css';

const ExpertPopup = ({ onClose }) => {
  return (
    <div className="expert-popup">
      <div className="popup-content">
      <h2>Coming Soon!</h2>
        <p>Expert content is under development. Stay tuned!</p>
        <button className="ok-button" onClick={onClose}>
          OK
        </button>
      </div>
    </div>
  );
};

export default ExpertPopup;
