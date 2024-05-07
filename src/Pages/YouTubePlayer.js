import React, { useState } from 'react';
import YouTube from 'react-youtube';
import Draggable from 'react-draggable';
import { Button } from '@mui/material';

const YouTubePlayer = () => {
  const [inputUrl, setInputUrl] = useState('');
  const [videoUrl, setVideoUrl] = useState('');

  const handleUrlChange = (event) => {
    setInputUrl(event.target.value);
  };

  const handleSubmit = () => {
    setVideoUrl(inputUrl);
  };

  const handleCancel = () => {
    setVideoUrl('');  // Reset the video URL to remove the video
    setInputUrl('');  // Also clear the input field
  };

  // Extract the video ID from the URL
  const videoId = videoUrl ? videoUrl.split('v=')[1].split('&')[0] : '';

  // Options for the YouTube player
  const opts = {
    height: '390',  // Adjust these as needed to fit your layout
    width: '640',   // Adjust these as needed to fit your layout
    playerVars: {
      autoplay: 1,  // Play automatically
    },
  };

  return (
    <Draggable
      axis="both"
      handle=".handle"
      defaultPosition={{x: 0, y: 0}}
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
            <Button onClick={handleCancel} variant="contained" color="secondary" style={{marginLeft: '10px'}}>
              Cancel
            </Button>
          )}
          {videoUrl && <YouTube videoId={videoId} opts={opts} />}
        </div>
      </div>
    </Draggable>
  );
}

export default YouTubePlayer;
