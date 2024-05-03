import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';  // Ensure this path correctly points to the file where App is defined
import './index.css';  // Assuming you have some global styles

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

