import React, { useState, useRef } from 'react';
import mammoth from 'mammoth';
import { Editor, EditorState, RichUtils, Modifier, convertToRaw, ContentState } from 'draft-js';
import { stateToHTML } from 'draft-js-export-html';
import { stateFromHTML } from 'draft-js-import-html';
import { saveAs } from 'file-saver';
import 'draft-js/dist/Draft.css';
import '../css/wordEditor.css'; // Make sure to import the CSS file
import { Add } from '@material-ui/icons';
import { Button, Menu, MenuItem } from '@mui/material';
import DraggableBox from './DraggableBox';
import MyCalendar from './MyCalendar';
import PomodoroTimer from './PomodoroTimer';
import TextEditor from './TextEditor';
import YouTubePlayer from './YouTubePlayer';
import SpotifyPlayer from './SpotifyPlayer';

const applyAlignment = (contentState, blockKey, alignment) => {
  const block = contentState.getBlockForKey(blockKey);
  const newBlock = block.merge({
    data: block.getData().set('text-align', alignment),
  });
  return contentState.merge({
    blockMap: contentState.getBlockMap().set(blockKey, newBlock),
  });
};

const handleAlignment = (contentState, alignmentMap) => {
  let newContentState = contentState;
  alignmentMap.forEach((alignment, blockKey) => {
    newContentState = applyAlignment(newContentState, blockKey, alignment);
  });
  return newContentState;
};

const WordEditor = () => {
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const [error, setError] = useState(null);
  const fileInputRef = useRef(null);
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

  const toggleSpotify = () => {
    setShowSpotify(!showSpotify);
    handleMenuClose();
  };

  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    if (file) {
      try {
        const arrayBuffer = await file.arrayBuffer();
        const result = await mammoth.convertToHtml({
          arrayBuffer,
          styleMap: [
            "b => strong",
            "i => em",
            "u => underline",
            "p[style-name='Title'] => h1:fresh",
            "p[style-name='Subtitle'] => h2:fresh",
            "p[style-name='Heading 1'] => h1:fresh",
            "p[style-name='Heading 2'] => h2:fresh",
            "p[style-name='Heading 3'] => h3:fresh",
            "p[style-name='Heading 4'] => h4:fresh",
            "p[style-name='Heading 5'] => h5:fresh",
            "p[style-name='Heading 6'] => h6:fresh"
          ]
        });
        let html = result.value;

        // Parse alignment from HTML
        const alignmentMap = new Map();
        const parser = new DOMParser();
        const doc = parser.parseFromString(html, 'text/html');
        doc.querySelectorAll('p').forEach((p, index) => {
          const textAlign = p.style.textAlign;
          if (textAlign) {
            alignmentMap.set(index.toString(), textAlign);
          }
        });

        let contentState = stateFromHTML(html);

        // Apply alignment to contentState
        contentState = handleAlignment(contentState, alignmentMap);

        setEditorState(EditorState.createWithContent(contentState));
        setError(null);
      } catch (err) {
        setError("Error reading the file. Please make sure it's a valid Word document.");
        console.error(err);
      }
    }
  };

  const handleEditorChange = (state) => {
    setEditorState(state);
  };

  const handleSave = () => {
    const contentState = editorState.getCurrentContent();
    const html = stateToHTML(contentState);
    const blob = new Blob([html], { type: 'text/html' });
    saveAs(blob, 'document.html');
  };

  const handleKeyCommand = (command) => {
    const newState = RichUtils.handleKeyCommand(editorState, command);
    if (newState) {
      handleEditorChange(newState);
      return 'handled';
    }
    return 'not-handled';
  };

  const onBoldClick = () => {
    handleEditorChange(RichUtils.toggleInlineStyle(editorState, 'BOLD'));
  };

  const onHighlightClick = () => {
    handleEditorChange(RichUtils.toggleInlineStyle(editorState, 'HIGHLIGHT'));
  };

  return (
    <div className="editor-container">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ display: 'flex', gap: '8px' }}>
          <input
            type="file"
            ref={fileInputRef}
            style={{ display: 'none' }}
            onChange={handleFileUpload}
          />
          <Button style={{ color: 'rgba(66, 62, 62)' , borderColor: 'rgba(66, 62, 62)'  }} onClick={() => fileInputRef.current.click()} size="small" variant="outlined">Upload Word Document</Button>
          <Button style={{ color: 'rgba(66, 62, 62)' , borderColor: 'rgba(66, 62, 62)'  }} onClick={handleSave} size="small" variant="outlined">Save</Button>
          <Button style={{ color: 'rgba(66, 62, 62)' , borderColor: 'rgba(66, 62, 62)'  }} onClick={onBoldClick} size="small" variant="outlined">Bold</Button>
          <Button style={{ color: 'rgba(66, 62, 62)' , borderColor: 'rgba(66, 62, 62)'  }} onClick={onHighlightClick} size="small" variant="outlined">Highlight</Button>
        </div>
        <Button
          aria-controls="simple-menu"
          aria-haspopup="true"
          onClick={handleMenuClick}
          endIcon={<Add />}
          size="small"
          variant="outlined"
          style={{ color: 'rgba(66, 62, 62)' , borderColor: 'rgba(66, 62, 62)'  }}
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
      <div className="editor-body">
        {error && <div style={{ color: 'red' }}>{error}</div>}
        <div className="editor-area">
          <Editor
            editorState={editorState}
            handleKeyCommand={handleKeyCommand}
            onChange={handleEditorChange}
            customStyleMap={{
              HIGHLIGHT: { backgroundColor: 'yellow' }
            }}
          />
        </div>
      </div>
      {showDraggable && <DraggableBox initialWidth={200} initialHeight={200} minWidth={100} minHeight={100} toggleVisibility={() => setShowDraggable(false)} />}
      {showCalendar && <MyCalendar initialWidth={200} initialHeight={200} minWidth={100} minHeight={100} toggleVisibility={() => setShowCalendar(false)} />}
      {showPomodoroTimer && <PomodoroTimer initialWidth={200} initialHeight={200} minWidth={100} minHeight={100} toggleVisibility={() => setShowPomodoroTimer(false)} />}
      {showYouTube && <YouTubePlayer initialWidth={200} initialHeight={200} minWidth={100} minHeight={100} toggleVisibility={() => setShowYouTube(false)} />}
      {showSpotify && <SpotifyPlayer initialWidth={200} initialHeight={100} minWidth={100} minHeight={100} toggleVisibility={() => setShowSpotify(false)} />}
    </div>
  );
};

export default WordEditor;
