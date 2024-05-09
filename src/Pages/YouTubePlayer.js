import React, { useState } from 'react';
import YouTube from 'react-youtube';
import Draggable from 'react-draggable';
import { Button } from '@mui/material';
import '../css/YoutubePlayer.css';
import { Resizable } from 'react-resizable';

const YouTubePlayer = ({ toggleVisibility, initialWidth, initialHeight, minWidth, minHeight }) => {
  const [inputUrl, setInputUrl] = useState('');
  const [videoUrl, setVideoUrl] = useState('');
  const [width, setWidth] = useState(initialWidth);
  const [height, setHeight] = useState(initialHeight);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const onResize = (event, { element, size, handle }) => {
    setWidth(size.width);
    setHeight(size.height);
  };

  const onStopDrag = (e, data) => {
    setPosition({ x: data.x, y: data.y });
  };

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
    height: height.toString(),
    width: width.toString(),
    playerVars: {
      autoplay: 1,
    },
  };

  return (
    <Draggable
      axis="both"
      handle=".handle"
      defaultPosition={{x: position.x, y: position.y}}
      onStop={onStopDrag}
      scale={1}
    >
      <Resizable
        width={width}
        height={height}
        onResize={onResize}
        minConstraints={[minWidth, minHeight]}
        handle={(h) => <span className="react-resizable-handle react-resizable-handle-se" onClick={e => e.stopPropagation()} />}
      >
        <div className="resizable-box" style={{ width: `${width}px`, height: `${height}px`, position: 'absolute' }}>
          <div className="header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div className="handle">Drag Me</div>
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
            {videoUrl && <YouTube className='youtube-player' videoId={videoId} opts={opts} />}
          </div>
        </div>
      </Resizable>
    </Draggable>
  );
}

export default YouTubePlayer;
