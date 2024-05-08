import React, { useState } from 'react';
import YouTube from 'react-youtube';
import Draggable from 'react-draggable';
import { Button } from '@mui/material';
import '../css/YoutubePlayer.css';

const YouTubePlayer = ({ toggleVisibility }) => {
  const [inputUrl, setInputUrl] = useState('');
  const [videoUrl, setVideoUrl] = useState('');

  const handleUrlChange = (event) => {
    setInputUrl(event.target.value);
  };

  const handleSubmit = () => {
    setVideoUrl(inputUrl);
  };

  const handleCancel = () => {
    setVideoUrl('');
    setInputUrl('');
  };

  const videoId = videoUrl ? videoUrl.split('v=')[1].split('&')[0] : '';

  const opts = {
    height: '390',
    width: '640',
    playerVars: {
      autoplay: 1,
    },
  };

  return (
    <Draggable
      axis="both"
      handle=".handle"
      defaultPosition={{ x: 0, y: 0 }}
      position={null}
      scale={1}
    >
      <div className="draggable-box" style={{ 
          width: videoUrl ? `${opts.width}px` : '300px', 
          maxWidth: '100%', 
          minHeight: videoUrl ? `${opts.height}px` : '100px' 
      }}>
        <div className="handle">Drag Me</div>
        <div className="content">
          <input
            type="text"
            value={inputUrl}
            onChange={handleUrlChange}
            placeholder="Enter YouTube URL here"
          />
          <Button onClick={handleSubmit} variant="contained" color="primary">
            Load Video
          </Button>
          {videoUrl && (
            <Button onClick={handleCancel} variant="contained" color="secondary" style={{ marginLeft: '10px' }}>
              Cancel
            </Button>
          )}
          {videoUrl && <YouTube videoId={videoId} opts={opts} />} {/* Ensure YouTube component receives videoId and opts props */}
        </div>
        <Button   sx={{
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
  }}  onClick={toggleVisibility}>Hide</Button>

      </div>
    </Draggable>
  );
}

export default YouTubePlayer;
