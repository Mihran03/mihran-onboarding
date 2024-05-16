import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import Draggable from 'react-draggable'; 
import { Button } from '@mui/material';
import { Resizable } from 'react-resizable';
import '../css/calender.css'; // Assuming you have a CSS file for additional styles

function MyCalendar({ toggleVisibility, initialWidth, initialHeight, minWidth, minHeight }) {
  const [date, setDate] = useState(new Date());
  const [width, setWidth] = useState(initialWidth);
  const [height, setHeight] = useState(initialHeight);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const onChange = (newDate) => {
    setDate(newDate);
  };

  const onResize = (event, { element, size, handle }) => {
    setWidth(size.width);
    setHeight(size.height);
  };

  // Handle the stopping of dragging
  const onStopDrag = (e, data) => {
    setPosition({ x: data.x, y: data.y });
  };

  return (
    <Draggable
      axis="both"
      handle=".handle"
      defaultPosition={{x: 0, y: 0}}
      position={null}
      scale={1}
    >
      <Resizable
        width={width}
        height={height}
        onResize={onResize}
        minConstraints={[minWidth, minHeight]}
        handle={(h) => <span className="react-resizable-handle react-resizable-handle-se" onClick={e => e.stopPropagation()} />}
      >
        <div className="calendar-container" style={{ width: `${width}px`, height: `${height}px`, position: 'absolute' }}>
        <div className="header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div className="handle">
            
            Drag here
          </div>
          
            <Button sx={{
              padding: '6px 10px',
              backgroundColor: '#dc3545',
              color: 'white',
              border: 'none',
              cursor: 'pointer',
              width: '30px',
              height: '30px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              '&:hover': {
                backgroundColor: '#c82333',
              },
            }} onClick={toggleVisibility}>X</Button>
          </div>
          <Calendar
            onChange={onChange}
            value={date}
            className="react-calendar"
            style={{ width: '100%', height: '100%' }} // Make Calendar responsive
          />
          <p>Selected date: {date.toDateString()}</p>
          
          
        </div>
      </Resizable>
      
    </Draggable>
    
  );
}

export default MyCalendar;
