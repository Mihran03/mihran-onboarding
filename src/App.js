import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, Link } from 'react-router-dom';
import LoginPage from './Pages/LoginPage';
import HomePage from './Pages/HomePage';
import TextEditor from './Pages/TextEditor';
import PdfEditor from './Pages/pdfEditor';
import WordEditor from './Pages/wordEditor';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import './App.css';

const App = () => {
  const [isLoggedIn, setLoggedIn] = useState(false);
  const pages = [
    { name: 'Text Editor', path: '/home' },
    { name: 'PDF Viewer', path: '/home/pdf' },
    { name: 'Word Editor', path: '/home/word' }
  ];

  return (
    <Router>
      {isLoggedIn && (
  <AppBar position="static" className="customAppBar">
    <Container maxWidth="xl">
      <Toolbar className="customToolbar">
        <Typography variant="h6" component="div" sx={{ flexGrow: 1, textAlign: 'center' }}>
          LOGO
        </Typography>
        {pages.map((page) => (
          <Button key={page.name} color="inherit" component={Link} to={page.path} className="customButton">
            {page.name}
          </Button>
        ))}
      </Toolbar>
    </Container>
  </AppBar>
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
