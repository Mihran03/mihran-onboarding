import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './Pages/LoginPage';  // Ensure correct path
import HomePage from './Pages/HomePage';    // Ensure correct path



const App = () => (
  <Router>
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="/home" element={<HomePage />} />
    </Routes>
  </Router>
);

export default App;
