// MyCalendar.js
import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import Draggable from 'react-draggable'; // Import Draggable
import { Button } from '@mui/material';


function MyCalendar({ toggleVisibility }) {
  const [date, setDate] = useState(new Date());

  const onChange = (newDate) => {
    setDate(newDate);
  };

  return (
    <Draggable
      axis="both"
      handle=".handle"
      defaultPosition={{x: 0, y: 0}}
      position={null}
      scale={1}
    >
      <div className="calendar-container">
        <div className="handle">
          <svg viewBox="0 0 24 24">
            <path fill="currentColor" d="M10 9V5h4v4h5v2h-5v4h-4v-4H5V9h5Z" />
          </svg>
          Drag here
        </div>
        <Calendar
          onChange={onChange}
          value={date}
        />
        <p>Selected date: {date.toDateString()}</p>
        <Button sx={{
    padding: '6px 12px',
    backgroundColor: '#dc3545',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    marginTop: '10px',
    '&:hover': {
      backgroundColor: '#c82333',
    },
  }} onClick={toggleVisibility}>Hide</Button>
      </div>
    </Draggable>
  );
}

export default MyCalendar;
