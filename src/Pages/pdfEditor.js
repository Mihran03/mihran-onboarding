import React, { useState, useCallback } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import { useResizeObserver } from '@wojtekmaj/react-hooks';
import { AppBar, Toolbar, Button, Box, Menu, MenuItem, styled } from '@mui/material';
import '../css/pdfViewer.css'
import { Add } from '@material-ui/icons';
import DraggableBox from './DraggableBox';
import MyCalendar from './MyCalendar';
import PomodoroTimer from './PomodoroTimer';
import TextEditor from './TextEditor';
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
    const [containerRef, setContainerRef] = useState(null);
    const [containerWidth, setContainerWidth] = useState(null);
    const [editorContent, setEditorContent] = useState('');
    const [showDraggable, setShowDraggable] = useState(false);
    const [showCalendar, setShowCalendar] = useState(false);
    const [showPomodoroTimer, setShowPomodoroTimer] = useState(false);
    const [showYouTube, setShowYouTube] = useState(false);
    const [anchorEl, setAnchorEl] = useState(null);
    const [showSpotify, setShowSpotify] = useState(false);

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

    const onFileLoad = (event) => {
        const files = event.target.files;
        if (files && files[0]) {
            setSelectedFile(files[0]);
        }
    };

    const toggleSpotify = () => {
      setShowSpotify(!showSpotify);
      handleMenuClose();
    };
    

    const onDocumentLoadSuccess = ({ numPages }) => {
        setNumPages(numPages);
        setCurrentPage(1); // Reset to first page whenever a new document is loaded
    };

    const goToPrevPage = () => {
        if (currentPage > 1) setCurrentPage(currentPage - 1);
    };

    const goToNextPage = () => {
        if (currentPage < numPages) setCurrentPage(currentPage + 1);
    };

    return (
        <div className='container'>
            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                <Button
                    aria-controls="simple-menu"
                    aria-haspopup="true"
                    onClick={handleMenuClick}
                    endIcon={<Add />}
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
            <input type="file" accept=".pdf" onChange={onFileLoad} />

            {selectedFile && (
                <div className="pdf-container" ref={setContainerRef}>
                    <Document
                        file={selectedFile}
                        onLoadSuccess={onDocumentLoadSuccess}
                        options={options}
                    >
                        <Page
                            pageNumber={currentPage}
                        />
                    </Document>
                </div>
            )}

            {selectedFile && numPages > 1 && (
                <div className="pdf-navigation">
                    <button onClick={goToPrevPage}>Previous</button>
                    <p>Page {currentPage} of {numPages}</p>
                    <button onClick={goToNextPage}>Next</button>
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
