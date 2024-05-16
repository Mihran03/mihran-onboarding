import React, { useState } from 'react';
import { Resizable } from 'react-resizable';
import Draggable from 'react-draggable';
import { Button } from '@mui/material';
import '../css/SpotifyPlayer.css'; // Import CSS file

function SpotifyPlayer({ toggleVisibility, initialWidth, initialHeight, minWidth, minHeight }) {
  const [width, setWidth] = useState(initialWidth);
  const [height, setHeight] = useState(initialHeight);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [spotifyUrl, setSpotifyUrl] = useState('');
  const [spotifyUri, setSpotifyUri] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Extract the URI from the Spotify URL
    const uriMatch = spotifyUrl.match(/spotify:track:([a-zA-Z0-9]+)/);
    if (uriMatch && uriMatch.length > 1) {
      setSpotifyUri(uriMatch[1]);
    } else {
      // If the URL is not a track URI, try to extract a playlist URI
      const playlistMatch = spotifyUrl.match(/spotify.com\/playlist\/([a-zA-Z0-9]+)/);
      if (playlistMatch && playlistMatch.length > 1) {
        setSpotifyUri(`playlist/${playlistMatch[1]}`);
      } else {
        // Handle invalid URL
        alert('Please enter a valid Spotify track or playlist URL');
      }
    }
  };

  const onResize = (event, { size }) => {
    setWidth(size.width);
    setHeight(size.height);
  };

  const onStopDrag = (e, data) => {
    setPosition({ x: data.x, y: data.y });
  };

  return (
    <Draggable
      handle=".drag-handle"
      defaultPosition={{ x: position.x, y: position.y }}
      onStop={onStopDrag}
    >
      <Resizable
        width={width}
        height={height}
        onResize={onResize}
        minConstraints={[minWidth, minHeight]}
        handle={(h) => <span className="react-resizable-handle react-resizable-handle-se" onClick={e => e.stopPropagation()} />}
      >
        <div className="draggable-box">
          <div className="header">
            <div className="drag-handle">Drag Me</div>
            <Button
              sx={{
                padding: '6px 5px',
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
              }}
              onClick={toggleVisibility}
            >
              X
            </Button>
          </div>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Enter Spotify track or playlist URL"
              value={spotifyUrl}
              onChange={(e) => setSpotifyUrl(e.target.value)}
            />
            <Button type="submit" style={{ backgroundColor: 'rgba(66, 62, 62)'  }} >Load</Button>
          </form>
          {spotifyUri && (
            <div className="spotify-player">
              <iframe
                title="Spotify Player"
                src={`https://open.spotify.com/embed/${spotifyUri}`}
                frameBorder="0"
                allowtransparency="true"
                allow="encrypted-media"
              ></iframe>
            </div>
          )}
        </div>
      </Resizable>
    </Draggable>
  );
}

export default SpotifyPlayer;
