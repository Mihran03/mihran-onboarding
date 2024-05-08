import React, { useState, useEffect } from 'react';
import { Resizable } from 'react-resizable';
import Draggable from 'react-draggable';
import { Button } from '@mui/material';
import '../css/DraggableBox.css';

function DraggableBox({ toggleVisibility, initialWidth, initialHeight, minWidth, minHeight }) {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [width, setWidth] = useState(initialWidth);
  const [height, setHeight] = useState(initialHeight);
  const [position, setPosition] = useState({ x: 0, y: 0});
  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setInitialized(true);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  const addTask = () => {
    if (newTask) {
      setTasks([...tasks, newTask]);
      setNewTask('');
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      addTask();
    }
  };

  const removeTask = index => {
    const newTasks = [...tasks];
    newTasks.splice(index, 1);
    setTasks(newTasks);
  };

  const onResize = (event, { size }) => {
    setWidth(size.width);
    setHeight(size.height);
  };

  const onStopDrag = (e, data) => {
    setPosition({ x: data.x, y: data.y });
  };

  if (!initialized) {
    return <div>Loading...</div>; // Display loading indicator while initializing
  }

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
        
        <div className="draggable-box" style={{ width: `${width}px`, height: `${height}px`, position: 'absolute' }}>
          <div className="drag-handle">Drag here</div>
          <div className="content">
            <input type="text" value={newTask} onChange={e => setNewTask(e.target.value)} onKeyPress={handleKeyPress} placeholder="Add new task"/>
            <button onClick={addTask}>Add</button>
            <ul>
              {tasks.map((task, index) => (
                <li key={index}>{task}<button onClick={() => removeTask(index)}>Remove</button></li>
              ))}
            </ul>
          </div>
          <Button className="hide-button" onClick={toggleVisibility}>Hide</Button>
        </div>
        
      </Resizable>
    </Draggable>
  );
}

export default DraggableBox;
