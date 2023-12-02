import React, { useState, useEffect, useRef} from 'react';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

const CountdownTimer = ({ totalTime, onTimeout, isTestActive, isFrozen }) => {
  const [remainingTime, setRemainingTime] = useState(totalTime);
  const [percentage, setPercentage] = useState(100);
  const intervalRef = useRef(null);

  useEffect(() => {
    if (remainingTime > 0 && !isFrozen) {
      intervalRef.current = setInterval(() => {
        setRemainingTime(prevTime => {
          const newPercentage = (prevTime / totalTime) * 100;
          setPercentage(newPercentage);
          return prevTime - 1;
        });
      }, 1000);
    }
      return () => clearInterval(intervalRef.current);
  }, [remainingTime, totalTime, isFrozen]);

  useEffect(() => {
    if (remainingTime === 0 && isTestActive) {
      clearInterval(intervalRef.current);
      onTimeout();
    }
  }, [remainingTime, isTestActive, onTimeout]);

  const minutes = Math.floor(remainingTime / 60);
  const seconds = remainingTime % 60;

  return (
    <div className="countdown-timer" style={{width:90, height:90}}>
      <div className="timer">
        <CircularProgressbar
          value={percentage}
          text={`${minutes}:${seconds < 10 ? `0${seconds}` : seconds}`}
          strokeWidth={10}
          styles={{
            path: { stroke: `rgba(0, 123, 255, ${percentage / 100})` },
            text: { fill: '#333', fontSize: '16px' },
          }}
        />
      </div>
    </div>
  );
};

export default CountdownTimer;
