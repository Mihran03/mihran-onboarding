import React, { useState, useEffect } from 'react';
import { TextField, Button, Typography, Box, Grid } from '@mui/material';
import Draggable from 'react-draggable'; // Import Draggable

function PomodoroTimer({toggleVisibility }) {
    const [studyMinutes, setStudyMinutes] = useState(25);
    const [breakMinutes, setBreakMinutes] = useState(5);
    const [secondsLeft, setSecondsLeft] = useState(studyMinutes * 60);
    const [isTimerRunning, setIsTimerRunning] = useState(false);
    const [isStudyTime, setIsStudyTime] = useState(true); // Toggle between study and break

 

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
            <div className='timer-container'>
            <Box sx={{ p: 2, maxWidth: 200, margin: '20px auto', textAlign: 'center', backgroundColor: '#fff', border: '1px solid #ccc', borderRadius: '8px', boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)', position: 'relative' }}>
                <div className="handle">Drag here</div>
                <Typography variant="h4" gutterBottom>
                    {isStudyTime ? 'Study Time' : 'Break Time'}
                </Typography>
                <Typography variant="h2" sx={{ mb: 2 }}>
                    {Math.floor(secondsLeft / 60)}:{String(secondsLeft % 60).padStart(2, '0')}
                </Typography>
                <Grid container spacing={2} justifyContent="center">
                    <Grid item>
                        <Button variant="contained" color="primary" onClick={handleStartStop}>
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
            </Box>
            <Button className = "hide-button" onClick={toggleVisibility}>Hide</Button>
            </div>
        </Draggable>
    );
}

export default PomodoroTimer;
