import React, { useState } from 'react';
import { Button, TextField, Typography, Container, CssBaseline, Box, Avatar } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function LoginPage({ setLoggedIn }) {
  const navigate = useNavigate();
  const [isSignUp, setIsSignUp] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [error, setError] = useState('');

  const theme = createTheme({
    palette: {
      mode: darkMode ? 'dark' : 'light',
    },
  });

  const toggleTheme = () => {
    setDarkMode(!darkMode);
  };

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
      <Container component="main" maxWidth="xs">
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            {isSignUp ? 'Sign Up' : 'Sign In'}
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="username"
              label="Username"
              name="username"
              autoComplete="username"
              autoFocus
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
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              {isSignUp ? 'Register' : 'Sign In'}
            </Button>
            {error && (
              <Typography variant="body2" color="error">
                {error}
              </Typography>
            )}
          </Box>
          <Button onClick={toggleTheme} sx={{ mt: 2 }}>
            Toggle Dark/Light Mode
          </Button>
        </Box>
      </Container>
    </ThemeProvider>
  );
}

export default LoginPage;
