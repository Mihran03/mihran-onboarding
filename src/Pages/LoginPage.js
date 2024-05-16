import React, { useState } from 'react';
import { Button, TextField, Typography, Container, CssBaseline, Box } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../css/LoginPage.css';
import logo from '../css/logo-no-text.png';

function LoginPage({ setLoggedIn }) {
  const navigate = useNavigate();
  const [isSignUp, setIsSignUp] = useState(false);
  const [error, setError] = useState('');

  const theme = createTheme({
    typography: {
      fontFamily: 'Roboto, sans-serif',
      allVariants: {
        color: 'rgba(66, 62, 62, 255)', // Set text color
      },
    },
    palette: {
      primary: {
        main: 'rgba(66, 62, 62, 255)', // Set button color
      },
    },
  });

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const username = formData.get('username');
    const password = formData.get('password');
    const url = isSignUp ? 'http://localhost:3001/register' : 'http://localhost:3001/validatePassword';

    try {
      const res = await axios.post(url, { username, password });
      if (isSignUp && res.data.success) {
        setError('');
        setIsSignUp(false); // Switch to login after successful sign-up
      } else if (!isSignUp && res.data.validation) {
        setLoggedIn(true); // Set login state to true on successful validation
        navigate('/home');
      } else {
        setError(res.data.error || 'Invalid username or password');
      }
    } catch (error) {
      setError('An error occurred while trying to sign in');
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container component="main" maxWidth="xs" className="login-container">
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            backgroundColor: 'background.paper',
            padding: 4,
            transition: 'all 0.3s ease-in-out',
          }}
        >
          <div>
            <img src={logo} alt="StudySync Logo" style={{ width: '200px', height: 'auto' }} />
          </div>
          <Typography component="h3" variant="h6" sx={{ mb: 2 }}>
            StudySync
          </Typography>
          <Typography component="h1" variant="h5" sx={{ mb: 2 }}>
            {isSignUp ? 'Sign Up' : 'Sign In'}
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }} className="form">
            <TextField
              margin="normal"
              required
              fullWidth
              id="username"
              label="Username"
              name="username"
              autoComplete="username"
              autoFocus
              variant="outlined"
              sx={{ mb: 2 }}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              variant="outlined"
              sx={{ mb: 2 }}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              sx={{ mt: 3, mb: 2 }}
              className="button"
            >
              {isSignUp ? 'Register' : 'Sign In'}
            </Button>
            {error && (
              <Typography variant="body2" color="error" sx={{ mt: 2 }} className="error">
                {error}
              </Typography>
            )}
          </Box>
          <Button onClick={() => setIsSignUp(!isSignUp)} sx={{ mt: 2 }} className="toggle-button">
            {isSignUp ? 'Already have an account? Sign In' : "Don't have an account? Sign Up"}
          </Button>
        </Box>
      </Container>
    </ThemeProvider>
  );
}

export default LoginPage;
