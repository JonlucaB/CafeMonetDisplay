
import React from 'react';
import { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";

// A simple timeer that counts down until the page will be reloaded
export default function Timer(props) {
  const navigate = useNavigate();
  const [timeSpan, setTimeSpan] = useState(props.duration*60*1000);

  const getTime = (time) => {
    const minutes = Math.floor((time/1000/60)%60);
    const seconds = Math.floor((time/1000)%60);
    
    return (minutes < 10 ? '0' : '')+minutes+':'+(seconds < 10 ? '0' : '')+seconds;
  }

  useEffect(() => {
    const intervalId = setInterval(() => {
        setTimeSpan((_timeSpan) => _timeSpan > 0 ? _timeSpan - 1000 : navigate("/loadData"))
    }, 1000);

    return () => {
        clearInterval(intervalId);
    };
  }, []);

  return (
    <div className="timer">
        <b>Automatic Refresh in: {getTime(timeSpan)}</b>
    </div>
  );
};