import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, Link } from 'react-router-dom';
import LoginPage from './Pages/LoginPage';
import HomePage from './Pages/HomePage';
import TextEditor from './Pages/TextEditor';
import PdfEditor from './Pages/pdfEditor';
import WordEditor from './Pages/wordEditor';
import './App.css';
const App = () => {
  const [isLoggedIn, setLoggedIn] = useState(false);

  return (
    <Router>
      {isLoggedIn && (
        <nav className="navbar">
          <ul>
            <li><Link to="/home">Text Editor</Link></li>
            
            <li><Link to="/home/pdf">PDF Viewer</Link></li>
            <li><Link to="/home/word">Word Editor</Link></li>
          </ul>
        </nav>
      )}
      <Routes>
        <Route path="/" element={<LoginPage setLoggedIn={setLoggedIn} />} />
        <Route path="/home" element={isLoggedIn ? <HomePage /> : <Navigate to="/" />} />
        
        <Route path="/home/pdf" element={isLoggedIn ? <PdfEditor /> : <Navigate to="/" />} />
        <Route path="/home/word" element={isLoggedIn ? <WordEditor /> : <Navigate to="/" />} />
      </Routes>
    </Router>
  );
};

export default App;
