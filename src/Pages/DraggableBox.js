import React, { useState } from 'react';
import Draggable from 'react-draggable';
import { Button } from '@mui/material';
import '../css/DraggableBox.css';
function DraggableBox({ toggleVisibility }) {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');

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

  

  return (
    <Draggable
      axis="both"
      handle=".handle"
      defaultPosition={{x: 0, y: 0}}
      position={null}
      scale={1}
    >
      <div className="draggable-box">
        <div className="handle">
          <svg viewBox="0 0 24 24">
            <path fill="currentColor" d="M10 9V5h4v4h5v2h-5v4h-4v-4H5V9h5Z" />
          </svg>
          Drag here
        </div>
        <div className="content">
          <input 
            type="text" 
            value={newTask} 
            onChange={e => setNewTask(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Add new task"
          />
          <button onClick={addTask}>Add</button>
          <ul>
            {tasks.map((task, index) => (
              <li key={index}>
                {task}
                <button onClick={() => removeTask(index)}>Remove</button>
              </li>
            ))}
          </ul>
        </div>
        <Button sx={{
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
  }} onClick={toggleVisibility}>Hide</Button>
      </div>
    </Draggable>
  );
}

export default DraggableBox;
