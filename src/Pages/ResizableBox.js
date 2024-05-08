import React, { useState } from 'react';
import { Resizable } from 'react-resizable';
import Draggable from 'react-draggable';
import 'react-resizable/css/styles.css';
import '../css/resizableBox.css';

const ResizableBox = ({ initialWidth, initialHeight, minWidth, minHeight }) => {
  const [width, setWidth] = useState(initialWidth);
  const [height, setHeight] = useState(initialHeight);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  // Handle the resizing
  const onResize = (event, { element, size, handle }) => {
    setWidth(size.width);
    setHeight(size.height);
  };

  // Handle the stopping of dragging
  const onStopDrag = (e, data) => {
    setPosition({ x: data.x, y: data.y });
  };

  return (
    <Draggable
      handle=".drag-handle"
      defaultPosition={{x: position.x, y: position.y}}
      onStop={onStopDrag}
    >
      <Resizable
        width={width}
        height={height}
        onResize={onResize}
        minConstraints={[minWidth, minHeight]}
        handle={(h) => <span className="react-resizable-handle react-resizable-handle-se" onClick={e => e.stopPropagation()} />}
      >
        <div className="resizable-box" style={{ width: `${width}px`, height: `${height}px`, position: 'absolute' }}>
          {/* Drag handle */}
          <div className="drag-handle" style={{ width: '100%', height: '20px', backgroundColor: 'grey', cursor: 'move' }}>
            Drag here
          </div>
          {/* Content of the resizable box can be added here */}
        </div>
      </Resizable>
    </Draggable>
  );
};

export default ResizableBox;
