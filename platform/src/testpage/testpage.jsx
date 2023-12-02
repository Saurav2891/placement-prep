import './testpage.css';
import React, { useState, useEffect, useRef} from 'react';
import CountdownTimer from '../utilities/countdowntimer';
import { Link, Navigate, useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Popup } from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import userDetails from '../../../backend/api/users/userDetails';

const TestPage = () => {
  const [selectedOptions, setSelectedOptions] = useState(() => Array(10).fill(null));
  const [showStartButton, setShowStartButton] = useState(true);
  const [showTimer, setShowTimer] = useState(false);
  const [showSubmitButton, setShowSubmitButton] = useState(false);
  const [questions, setQuestions] = useState([  ]);
  const [showPlaceholder, setShowPlaceholder] = useState(true);
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const topicId = searchParams.get('topicId');
  const [isLoading, setIsLoading] = useState(true);
  const [isTestActive, setIsTestActive] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [isTimerFrozen, setIsTimerFrozen] = useState(false);

  const attemptedQuestionsRef = useRef(0);
  const unattemptedQuestionsRef = useRef(0);
  const correctAnswersRef = useRef(0);
  const wrongAnswersRef = useRef(0);
  const scoreRef = useRef(0);

  useEffect(() => {
    if (!topicId) {
        console.error('Topic ID is missing in URL parameters');
        return;
    }
    axios.get(`http://localhost:3000/api/test/quiz?topicId=${topicId}`,
    { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } })
    .then(response => {
        try {
            // console.log(response.data);
        if (response.data.success === 1) {
            setQuestions(response.data.data);
            const defaultSelectedOptions = response.data.data.map(() => null);
            setSelectedOptions(defaultSelectedOptions);
            
          }
        } catch (error) {
            console.error('Error mapping data:', error);
        }
        })
        .catch(error => {
          console.error('Error fetching questions:', error);
          setFetchError('An error occurred while fetching questions. Please try again later.');
        });
        const id = localStorage.getItem('userId');
        if (id) {
          axios.get(`http://localhost:3000/api/users/${id}`, {
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
          })
          .then(userResponse => {
            // console.log(userResponse.data);
            if (userResponse.data.success === 1) {
              // Handle user details as needed
              const userdetails = userResponse.data.data;
              // console.log(userdetails);
              userDetails.setName(userdetails.first_name + ' ' + userdetails.last_name);
              userDetails.setCollege(userdetails.college);
              userDetails.setDomain(userdetails.domain);
              userDetails.setGraduationYear(userdetails.graduation_year);

              // console.log(userDetails);
            } else {
              console.error('Failed to fetch user details');
            }
          })
          .catch(userError => {
            console.error('Error fetching user details:', userError);
          });
        }
    }, [topicId]);

    useEffect(() => {
      // API call to store the test record
      const storeTestRecord = async () => {
        try {
          // Your API endpoint and data to store the test record
          const apiEndpoint = 'http://localhost:3000/api/test/test-result';
          const testData = {
            // Your test record data
            // For example, user ID, test score, etc.
          };
  
          // Make the API call
          const response = await axios.post(apiEndpoint, testData);
  
          // Handle the response as needed
          console.log('Test record stored successfully:', response.data);
        } catch (error) {
          console.error('Error storing test record:', error);
  
          // Optionally, handle the error or show a message to the user
        }
      };
  
      // Call the function to store the test record when the popup is opened
      if (showPopup) {
        storeTestRecord();
      }
    }, [showPopup]);

  const handleStartClick = () => {
    setShowStartButton(false);
    setShowTimer(true);
    setShowSubmitButton(true); 
    setIsTestActive(true);
    setShowPlaceholder(false);
    // Start the timer logic here
  };

const handleTestSubmit = () => {
  let correctAnswers = 0;
  let attemptedQuestions = 0;
  let wrongAnswers = 0;
  
  questions.forEach((question, index) => {
    if (selectedOptions[index] !== null) {
      attemptedQuestions++;
      if (selectedOptions[index] === question.correct_option_index) {
        correctAnswers++;
      } else {
        wrongAnswers++;
      }
    }
  });

  const unattemptedQuestions = questions.length - attemptedQuestions;
  const score = correctAnswers * 2; // 2 marks per correct answer

  attemptedQuestionsRef.current = attemptedQuestions;
  unattemptedQuestionsRef.current = unattemptedQuestions;
  correctAnswersRef.current = correctAnswers;
  wrongAnswersRef.current = wrongAnswers;
  scoreRef.current = score;

  // console.log(`Attempted Questions: ${attemptedQuestionsRef.current}`);
  // console.log(`Unattempted Questions: ${unattemptedQuestionsRef.current}`);
  // console.log(`Correct Answers: ${correctAnswersRef.current}`);
  // console.log(`Wrong Answers: ${wrongAnswersRef.current}`);
  // console.log(`Score: ${scoreRef.current}`);

  setIsTimerFrozen(true); 
  setShowPopup(true);
};
const handleClearResponse = (questionIndex) => {
  const updatedSelectedOptions = [...selectedOptions];
  updatedSelectedOptions[questionIndex] = null;
  setSelectedOptions(updatedSelectedOptions);
};
const handleOptionClick = (questionIndex, optionIndex) => {
  const updatedSelectedOptions = [...selectedOptions];
  updatedSelectedOptions[questionIndex] = optionIndex;
  setSelectedOptions(updatedSelectedOptions);
};
const navigate = useNavigate();
const handleGoHome = () => {
  // Your logic to navigate home goes here
  // console.log('Navigating to home...');
  navigate('/');  
};

// Sample function for the "Close" button
const handleClose = () => {
  // Your logic to close the popup goes here
  // console.log('Closing the popup...');
  window.location.reload();
};

  return (
    <div className="test-page">
    <div className="test-container">
      <div className="top-container">
        {showStartButton && (
          <button className="btn btn-primary start-button" onClick={handleStartClick}>
            Start Test
          </button>
        )}
        {showTimer && <div className="timer">
        <CountdownTimer totalTime={10}
        onTimeout={() => {
          handleTestSubmit();
        }}
        isTestActive={isTestActive}
        isFrozen={isTimerFrozen} />
            </div>}
      </div>
      {isTestActive && (
      <div className="mcq-container">
      {questions.map((question, questionIndex) => (
        <div key={questionIndex} className="question-frame">
          <div className="question">{question.question_text}</div>
          <div className="options">
            {JSON.parse(question.options).map((option, optionIndex) => (
              <button key={optionIndex} className={`option-button ${selectedOptions[questionIndex] === optionIndex ? 'selected' : ''}`}
              onClick={() => handleOptionClick(questionIndex, optionIndex)}>
                {option}
              </button>
            ))}
          </div>
          <div className="clear-button">
            <p className="clear-response" onClick={()=> handleClearResponse(questionIndex)}>Clear your response</p>
          </div>
        </div>
      ))}
      </div>
      )}
      <div className="bottom-container">
        {showSubmitButton && (
          <button className="btn btn-primary submit-button" onClick={handleTestSubmit}>Submit Test</button>
        )}
      </div>
    </div>
    {showPlaceholder && (
        <div className="placeholder-div" style={{ width: '60%', height: '400px' }}>
            
          </div>
    )}
    <Popup open={showPopup} closeOnDocumentClick={false}>
          <div className="popup">
          <div className="top-container-result">
          <div className="test-result-heading">Test Result</div>
          <button type="button" className="btn btn-close" aria-label="Close" onClick={handleClose}>
            <i className="fa fa-times fa-2x close-icon"></i>
          </button>
          </div>
          <div className="middle-container-result">
            <p>User Name: {userDetails.getName()}</p>
            <p>College: {userDetails.getCollege()}</p>
            <p>Domain: {userDetails.getDomain()}</p>
            <p>Graduation Year: {userDetails.getGraduationYear()}</p>
            <p>Level: {userDetails.getLevel()}</p>
            <p>Topic: {userDetails.getTopic()}</p>
            <p>Score: {scoreRef.current}</p>
            <div className="counters">
              <div className="counter">
                <p>Right Answers</p>
                <div className="circle right-circle">{correctAnswersRef.current}</div>
              </div>
              <div className="counter">
                <p>Wrong Answers</p>
                <div className="circle wrong-circle">{wrongAnswersRef.current}</div>
              </div>
              <div className="counter">
                <p>Attempted Questions</p>
                <div className="circle attempted-circle">{attemptedQuestionsRef.current}</div>
              </div>
              <div className="counter">
                <p>Unattempted Questions</p>
                <div className="circle unattempted-circle">{unattemptedQuestionsRef.current}</div>
              </div>
            </div>
          </div>
          <div className="bottom-container-result">
            <button className="btn home-btn" onClick={handleGoHome}>Home</button>
            <button className="btn close-btn" onClick={handleClose}>Close</button>
          </div>
        </div>

      </Popup>
  </div>
  );
};

export default TestPage;
