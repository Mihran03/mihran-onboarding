import React, { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import { Box, Menu, MenuItem } from '@mui/material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import DraggableBox from './DraggableBox';
import MyCalendar from './MyCalendar';
import PomodoroTimer from './PomodoroTimer';
import { styled } from '@mui/material/styles';
import '../css/homepage.css';
import TextEditor from './TextEditor';
import { Add } from '@material-ui/icons';

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
  const [editorContent, setEditorContent] = useState('');
  const [showDraggable, setShowDraggable] = useState(false);
  const [showCalendar, setShowCalendar] = useState(false);
  const [showPomodoroTimer, setShowPomodoroTimer] = useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);
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

  const toggleCalendar = () => {
    setShowCalendar(!showCalendar);
    handleMenuClose();
  };

  const togglePomodoroTimer = () => {
    setShowPomodoroTimer(!showPomodoroTimer);
    handleMenuClose();
  };

  return (
    <div className="homepage">
      <AppBar position="static">
        <Toolbar>
          <Box sx={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
            <Button
              aria-controls={open ? 'customized-menu' : undefined}
              aria-haspopup="true"
              aria-expanded={open ? 'true' : undefined}
              variant="contained"
              disableElevation
              onClick={handleMenuClick}
              startIcon ={<Add/>}
              endIcon={<KeyboardArrowDownIcon />}
              
            >
              Add Widget 
            </Button>
            <StyledMenu
              id="customized-menu"
              MenuListProps={{
                'aria-labelledby': 'customized-button',
              }}
              anchorEl={anchorEl}
              open={open}
              onClose={handleMenuClose}
            >
              <MenuItem onClick={toggleDraggable} disableRipple>
                {showDraggable ? 'Hide To-Do List' : 'Show To-Do List'}
              </MenuItem>
              <MenuItem onClick={toggleCalendar} disableRipple>
                {showCalendar ? 'Hide Calendar' : 'Show Calendar'}
              </MenuItem>
              <MenuItem onClick={togglePomodoroTimer} disableRipple>
                {showPomodoroTimer ? 'Hide Pomodoro Timer' : 'Show Pomodoro Timer'}
              </MenuItem>
            </StyledMenu>
          </Box>
        </Toolbar>
      </AppBar>
      {showDraggable && <DraggableBox toggleVisibility={() => setShowDraggable(false)} />}
      {showCalendar && <MyCalendar toggleVisibility={() => setShowCalendar(false)} />}
      {showPomodoroTimer && <PomodoroTimer toggleVisibility={() => setShowPomodoroTimer(false)} />}
      <div className="text-editor-container">
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
    </div>
  );
}

export default HomePage;
