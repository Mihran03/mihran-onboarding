import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, Link, useLocation } from 'react-router-dom';
import LoginPage from './Pages/LoginPage';
import HomePage from './Pages/HomePage';
import TextEditor from './Pages/TextEditor';
import PdfEditor from './Pages/pdfEditor';
import WordEditor from './Pages/wordEditor';

import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import { motion } from 'framer-motion';
import Header from './Pages/Header';
import AboutUs from './Pages/aboutUs';
import './App.css';
import ContactForm from './Pages/contactus';
const BackgroundWrapper = ({ children }) => {
  const location = useLocation();

  useEffect(() => {
    if (location.pathname === '/') {
      document.body.classList.add('loginPageBackground');
      document.body.classList.remove('homePageBackground');
    } else {
      document.body.classList.add('homePageBackground');
      document.body.classList.remove('loginPageBackground');
    }
  }, [location.pathname]);

  return children;
};

const App = () => {
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [darkMode, setDarkMode] = useState(true);

  const pages = [
    { name: 'Text Editor', path: '/home' },
    { name: 'PDF Viewer', path: '/home/pdf' },
    { name: 'Word Editor', path: '/home/word' }
  ];

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <Router>
      <BackgroundWrapper>
        {isLoggedIn && (
          <>
            <motion.div
              initial={{ opacity: 0, y: -50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Header pages={pages} setLoggedIn={setLoggedIn} />
            </motion.div>
            <motion.div
              className="appBarContainer"
              initial={{ opacity: 0, y: -50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <AppBar position="static" className="customAppBar">
                <Container maxWidth="xl">
                  <Toolbar className="customToolbar">
                    {pages.map((page) => (
                      <Button key={page.name} color="inherit" component={Link} to={page.path} className="customButton">
                        {page.name}
                      </Button>
                    ))}
                  </Toolbar>
                </Container>
              </AppBar>
            </motion.div>
          </>
        )}
        <Routes>
          <Route path="/" element={<LoginPage setLoggedIn={setLoggedIn} />} />
          <Route path="/home" element={isLoggedIn ? <HomePage /> : <Navigate to="/" />} />
          <Route path="/home/about" element={isLoggedIn ? <AboutUs /> : <Navigate to="/" />} />
          <Route path="/home/contactus" element={isLoggedIn ? <ContactForm /> : <Navigate to="/" />} />
          <Route path="/home/pdf" element={isLoggedIn ? <PdfEditor /> : <Navigate to="/" />} />
          <Route path="/home/word" element={isLoggedIn ? <WordEditor /> : <Navigate to="/" />} />
        </Routes>
      </BackgroundWrapper>
    </Router>
  );
};

export default App;
