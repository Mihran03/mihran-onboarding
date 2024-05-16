import React, { useState, useEffect } from 'react';
import { TextField, Button, Typography, Box, Grid } from '@mui/material';
import Draggable from 'react-draggable'; // Import Draggable
import { Resizable } from 'react-resizable';
import '../css/pomodoro.css';

function PomodoroTimer({toggleVisibility, initialWidth, initialHeight, minWidth, minHeight  }) {
    const [studyMinutes, setStudyMinutes] = useState(25);
    const [breakMinutes, setBreakMinutes] = useState(5);
    const [secondsLeft, setSecondsLeft] = useState(studyMinutes * 60);
    const [isTimerRunning, setIsTimerRunning] = useState(false);
    const [isStudyTime, setIsStudyTime] = useState(true); // Toggle between study and break
    const [width, setWidth] = useState(initialWidth);
    const [height, setHeight] = useState(initialHeight);
    const [position, setPosition] = useState({ x: 0, y: 0});

    const onResize = (event, { size }) => {
        setWidth(size.width);
        setHeight(size.height);
      };
    
      const onStopDrag = (e, data) => {
        setPosition({ x: data.x, y: data.y });
      };

    useEffect(() => {
        setSecondsLeft((isStudyTime ? studyMinutes : breakMinutes) * 60);
    }, [isStudyTime, studyMinutes, breakMinutes]);

    useEffect(() => {
        let interval = null;
        if (isTimerRunning && secondsLeft > 0) {
            interval = setInterval(() => {
                setSecondsLeft(seconds => seconds - 1);
            }, 1000);
        } else if (secondsLeft === 0) {
            setIsStudyTime(!isStudyTime);
        }
        return () => clearInterval(interval);
    }, [isTimerRunning, secondsLeft, isStudyTime]);

    const handleStartStop = () => {
        setIsTimerRunning(!isTimerRunning);
    };

    const handleReset = () => {
        setIsTimerRunning(false);
        setIsStudyTime(true);
        setSecondsLeft(studyMinutes * 60);
    };

    return (
        <Draggable
            axis="both"
            handle=".handle"
            defaultPosition={{ x: 0, y: 0 }}
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
            <div className='timer-container' style={{ width: `${width}px`, height: `${height}px`, position: 'absolute' }}>
            <div className="header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>   
            
                <div className="handle">Drag here</div>
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
                <Typography variant="h5" gutterBottom>
                    {isStudyTime ? 'Study Time' : 'Break Time'}
                </Typography>
                <Typography variant="h5" sx={{ mb: 2 }}>
                    {Math.floor(secondsLeft / 60)}:{String(secondsLeft % 60).padStart(2, '0')}
                </Typography>
                <Grid container spacing={2} justifyContent="center">
                    <Grid item>
                        <Button variant="contained" style={{ backgroundColor: 'rgba(66, 62, 62)'  }} onClick={handleStartStop}>
                            {isTimerRunning ? 'Pause' : 'Start'}
                        </Button>
                    </Grid>
                    <Grid item>
                        <Button variant="outlined" color="secondary" onClick={handleReset}>
                            Reset
                        </Button>
                    </Grid>
                </Grid>
                <Box sx={{ mt: 3 }}>
                    <TextField
                        label="Study Minutes"
                        type="number"
                        value={studyMinutes}
                        onChange={e => setStudyMinutes(+e.target.value)}
                        InputProps={{ inputProps: { min: 1 } }}
                        sx={{ width: '45%', mr: 1 }}
                    />
                    <TextField
                        label="Break Minutes"
                        type="number"
                        value={breakMinutes}
                        onChange={e => setBreakMinutes(+e.target.value)}
                        InputProps={{ inputProps: { min: 1 } }}
                        sx={{ width: '45%' }}
                    />
                </Box>
            
            
            </div>
            </Resizable>
        </Draggable>
    );
}

export default PomodoroTimer;
