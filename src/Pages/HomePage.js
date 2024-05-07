import React, { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add'; // Import the Add icon
import ListIcon from '@mui/icons-material/List';
import DateRangeIcon from '@mui/icons-material/DateRange';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import { Box } from '@mui/material'; // To use for layout

import TextEditor from './TextEditor';
import DraggableBox from './DraggableBox';
import MyCalendar from './MyCalendar';
import PomodoroTimer from './PomodoroTimer';
import '../css/homepage.css';

function HomePage() {
  const [editorContent, setEditorContent] = useState('');
  const [showDraggable, setShowDraggable] = useState(false);
  const [showCalendar, setShowCalendar] = useState(false);
  const [showPomodoroTimer, setShowPomodoroTimer] = useState(false);

  const toggleDraggable = () => setShowDraggable(!showDraggable);
  const toggleCalendar = () => setShowCalendar(!showCalendar);
  const togglePomodoroTimer = () => setShowPomodoroTimer(!showPomodoroTimer);

  const handleFileChange = event => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = function(e) {
        setEditorContent(e.target.result);
      };
      reader.readAsText(file);
    }
  };

  const handleEditorChange = content => {
    setEditorContent(content);
  };

  const handleDownload = () => {
    const textContent = editorContent.replace(/<[^>]*>?/gm, '');
    const element = document.createElement("a");
    const file = new Blob([textContent], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = "editedFile.txt";
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <div className="homepage">
      <AppBar position="static">
        <Toolbar>
          <Button color="inherit" onClick={toggleDraggable} startIcon={<ListIcon />}>
            {showDraggable ? 'Hide To-Do List' : 'Show To-Do List'}
          </Button>
          <Button color="inherit" onClick={toggleCalendar} startIcon={<DateRangeIcon />}>
            {showCalendar ? 'Hide Calendar' : 'Show Calendar'}
          </Button>
          <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: 'center' }}>
            <IconButton color="inherit">
              <AddIcon />
            </IconButton>
          </Box>
          <Button color="inherit" onClick={togglePomodoroTimer} endIcon={<AccessTimeIcon />}>
            {showPomodoroTimer ? 'Hide Pomodoro Timer' : 'Show Pomodoro Timer'}
          </Button>
        </Toolbar>
      </AppBar>
      <h1>Welcome to the StudySync!</h1>
      <DraggableBox isVisible={showDraggable} />
      {showCalendar && <MyCalendar />}
      {showPomodoroTimer && <PomodoroTimer />}
      <div className="text-editor-container">
        <TextEditor 
          handleFileChange={handleFileChange}
          editorContent={editorContent}
          handleEditorChange={handleEditorChange}
          handleDownload={handleDownload}
        />
      </div>
    </div>
  );
}

export default HomePage;
