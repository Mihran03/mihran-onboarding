import React, { useState } from 'react';
import '../css/resizableBox.css';

const ResizableBox = ({ initialWidth, initialHeight, minWidth, minHeight }) => {
  const [isResizing, setIsResizing] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [width, setWidth] = useState(initialWidth);
  const [height, setHeight] = useState(initialHeight);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [startX, setStartX] = useState(0);
  const [startY, setStartY] = useState(0);

  const handleMouseDownResize = (e) => {
    setIsResizing(true);
    setStartX(e.clientX);
    setStartY(e.clientY);
    e.stopPropagation(); // Stop propagation to prevent dragging logic from firing
  };

  const handleMouseDownDrag = (e) => {
    setIsDragging(true);
    setStartX(e.clientX);
    setStartY(e.clientY);
    e.stopPropagation(); // Stop propagation to prevent resizing logic from firing
  };

  const handleMouseUp = () => {
    setIsResizing(false);
    setIsDragging(false);
  };

  const handleMouseMove = (e) => {
    if (isResizing) {
      const newWidth = width + (e.clientX - startX);
      const newHeight = height + (e.clientY - startY);

      if (newWidth >= minWidth) {
        setWidth(newWidth);
        setStartX(e.clientX);
      }

      if (newHeight >= minHeight) {
        setHeight(newHeight);
        setStartY(e.clientY);
      }
    } else if (isDragging) {
      const deltaX = e.clientX - startX;
      const deltaY = e.clientY - startY;
      setPosition(prevPosition => ({
        x: prevPosition.x + deltaX,
        y: prevPosition.y + deltaY
      }));
      setStartX(e.clientX);
      setStartY(e.clientY);
    }
  };

  return (
    <div
      className="resizable-box"
      style={{
        width: `${width}px`,
        height: `${height}px`,
        left: `${position.x}px`,
        top: `${position.y}px`,
        position: 'absolute'
      }}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
    >
      {/* Drag handle */}
      <div
        className="drag-handle"
        style={{ width: '100%', height: '20px', backgroundColor: 'grey', cursor: 'move' }}
        onMouseDown={handleMouseDownDrag}
      >
        Drag here
      </div>
      {/* Resizable handles */}
      <div
        className="resize-handle"
        style={{ width: '10px', height: '10px', position: 'absolute', right: '0', bottom: '0', cursor: 'nwse-resize' }}
        onMouseDown={handleMouseDownResize}
      />
      {/* Content of the resizable box can be added here */}
    </div>
  );
};

export default ResizableBox;
