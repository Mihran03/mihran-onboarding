import React, { useState } from 'react';
import { AppBar, Toolbar, Button, Box, Menu, MenuItem, styled } from '@mui/material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import SettingsIcon from '@mui/icons-material/Settings';
import LogoutIcon from '@mui/icons-material/Logout';
import { Add } from '@material-ui/icons';
import DraggableBox from './DraggableBox';
import MyCalendar from './MyCalendar';
import PomodoroTimer from './PomodoroTimer';
import TextEditor from './TextEditor';
import YouTubePlayer from './YouTubePlayer';
import '../css/homepage.css';
import { SpotifyAuth, Scopes } from 'react-spotify-auth';
import 'react-spotify-auth/dist/index.css';
import TextFieldsIcon from '@material-ui/icons/TextFields';
import { useNavigate } from 'react-router-dom';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import PdfEditor from './pdfEditor';
import WordEditor from './wordEditor';
import SpotifyPlayer from './SpotifyPlayer';

const StyledMenu = styled((props) => (
  <Menu
    elevation={0}
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'right',
    }}
    transformOrigin={{
      vertical: 'top',
      horizontal: 'right',
    }}
    {...props}
  />
))(({ theme }) => ({
  // Custom styling here as provided
}));

function HomePage() {
  const [token, setToken] = useState(null);
  const [editorContent, setEditorContent] = useState('');
  const [showDraggable, setShowDraggable] = useState(false);
  const [showCalendar, setShowCalendar] = useState(false);
  const [showPomodoroTimer, setShowPomodoroTimer] = useState(false);
  const [showYouTube, setShowYouTube] = useState(false);
  const [showSpotify, setShowSpotify] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const toggleDraggable = () => {
    setShowDraggable(!showDraggable);
    handleMenuClose();
  };

  const toggleYouTube = () => {
    setShowYouTube(!showYouTube);
    handleMenuClose();
  };

  const toggleCalendar = () => {
    setShowCalendar(!showCalendar);
    handleMenuClose();
  };

  const togglePomodoroTimer = () => {
    setShowPomodoroTimer(!showPomodoroTimer);
    handleMenuClose();
  };

  const toggleSpotify = () => {
    setShowSpotify(!showSpotify);
    handleMenuClose();
  };
  
  return (
    <div className="homepage">
      <div className="text-editor-container">
        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <Button
            aria-controls="simple-menu"
            aria-haspopup="true"
            onClick={handleMenuClick}
            endIcon={<Add/>}
            size="small"
            variant="outlined"
          >
            Add Widgets
          </Button>
          <Menu
            id="simple-menu"
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
          >
            <MenuItem onClick={toggleDraggable}>Toggle Draggable Box</MenuItem>
            <MenuItem onClick={toggleCalendar}>Toggle Calendar</MenuItem>
            <MenuItem onClick={togglePomodoroTimer}>Toggle Pomodoro Timer</MenuItem>
            <MenuItem onClick={toggleYouTube}>Toggle YouTube Player</MenuItem>
            <MenuItem onClick={toggleSpotify}>Toggle Spotify Player</MenuItem>
          </Menu>
        </div>
        
        <TextEditor
          handleFileChange={(e) => setEditorContent(e.target.result)}
          editorContent={editorContent}
          handleEditorChange={setEditorContent}
          handleDownload={() => {
            const element = document.createElement("a");
            const file = new Blob([editorContent.replace(/<[^>]*>?/gm, '')], { type: 'text/plain' });
            element.href = URL.createObjectURL(file);
            element.download = "editedFile.txt";
            document.body.appendChild(element);
            element.click();
            document.body.removeChild(element);
          }}
        />
      </div>

      {showDraggable && <DraggableBox initialWidth={200} initialHeight={200} minWidth={100} minHeight={100} toggleVisibility={() => setShowDraggable(false)} />}
      {showCalendar && <MyCalendar initialWidth={200} initialHeight={200} minWidth={100} minHeight={100} toggleVisibility={() => setShowCalendar(false)} />}
      {showPomodoroTimer && <PomodoroTimer initialWidth={200} initialHeight={200} minWidth={100} minHeight={100} toggleVisibility={() => setShowPomodoroTimer(false)} />}
      {showYouTube && <YouTubePlayer initialWidth={200} initialHeight={200} minWidth={100} minHeight={100} toggleVisibility={() => setShowYouTube(false)} />}
      {showSpotify && <SpotifyPlayer initialWidth={200} initialHeight={100} minWidth={100} minHeight={100} toggleVisibility={() => setShowSpotify(false)} />}
    </div>
  );
}

export default HomePage;
