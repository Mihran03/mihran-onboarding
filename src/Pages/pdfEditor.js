import React, { useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import { Button, Menu, MenuItem, styled } from '@mui/material';
import '../css/pdfViewer.css';
import { Add } from '@material-ui/icons';
import DraggableBox from './DraggableBox';
import MyCalendar from './MyCalendar';
import PomodoroTimer from './PomodoroTimer';
import YouTubePlayer from './YouTubePlayer';
import SpotifyPlayer from './SpotifyPlayer';
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

const options = {
  cMapUrl: 'cmaps/',
  standardFontDataUrl: 'standard_fonts/',
};

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

function PdfEditor() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [numPages, setNumPages] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [anchorEl, setAnchorEl] = useState(null);
  const [showDraggable, setShowDraggable] = useState(false);
  const [showCalendar, setShowCalendar] = useState(false);
  const [showPomodoroTimer, setShowPomodoroTimer] = useState(false);
  const [showYouTube, setShowYouTube] = useState(false);
  const [showSpotify, setShowSpotify] = useState(false);

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const toggleWidget = (setter) => () => {
    setter((prev) => !prev);
    handleMenuClose();
  };

  const onFileLoad = (event) => {
    const files = event.target.files;
    if (files && files[0]) {
      setSelectedFile(files[0]);
    }
  };

  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
    setCurrentPage(1);
  };

  const changePage = (offset) => {
    setCurrentPage((prevPage) => Math.min(Math.max(prevPage + offset, 1), numPages));
  };

  return (
    <div className="p-container">
      <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <Button
          aria-controls="simple-menu"
          aria-haspopup="true"
          onClick={handleMenuClick}
          endIcon={<Add />}
          size="small"
          variant="outlined"
          style={{ color: 'rgba(66, 62, 62)', borderColor: 'rgba(66, 62, 62)' }}
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
          <MenuItem onClick={toggleWidget(setShowDraggable)}>Toggle Draggable Box</MenuItem>
          <MenuItem onClick={toggleWidget(setShowCalendar)}>Toggle Calendar</MenuItem>
          <MenuItem onClick={toggleWidget(setShowPomodoroTimer)}>Toggle Pomodoro Timer</MenuItem>
          <MenuItem onClick={toggleWidget(setShowYouTube)}>Toggle YouTube Player</MenuItem>
          <MenuItem onClick={toggleWidget(setShowSpotify)}>Toggle Spotify Player</MenuItem>
        </Menu>
      </div>
      <input type="file" accept=".pdf" onChange={onFileLoad} />

      {selectedFile && (
        <div>
          <div className="pdf-navigation">
            <Button
            style={{ color: 'rgba(66, 62, 62)', borderColor: 'rgba(66, 62, 62)' }}
              className="nav-button"
              variant="outlined"
              onClick={() => changePage(-1)}
            >
              Previous
            </Button>
            <p>Page {currentPage} of {numPages}</p>
            <Button
              style={{ color: 'rgba(66, 62, 62)', borderColor: 'rgba(66, 62, 62)' }}
              className="nav-button"
              variant="outlined"
              onClick={() => changePage(1)}
            >
              Next
            </Button>
          </div>
          <div className="pdf-container">
            <Document file={selectedFile} onLoadSuccess={onDocumentLoadSuccess} options={options}>
              <Page pageNumber={currentPage} />
            </Document>
          </div>
        </div>
      )}

      {showDraggable && <DraggableBox initialWidth={200} initialHeight={200} minWidth={100} minHeight={100} toggleVisibility={() => setShowDraggable(false)} />}
      {showCalendar && <MyCalendar initialWidth={200} initialHeight={200} minWidth={100} minHeight={100} toggleVisibility={() => setShowCalendar(false)} />}
      {showPomodoroTimer && <PomodoroTimer initialWidth={200} initialHeight={200} minWidth={100} minHeight={100} toggleVisibility={() => setShowPomodoroTimer(false)} />}
      {showYouTube && <YouTubePlayer initialWidth={200} initialHeight={200} minWidth={100} minHeight={100} toggleVisibility={() => setShowYouTube(false)} />}
      {showSpotify && <SpotifyPlayer initialWidth={200} initialHeight={100} minWidth={100} minHeight={100} toggleVisibility={() => setShowSpotify(false)} />}
    </div>
  );
}

export default PdfEditor;
