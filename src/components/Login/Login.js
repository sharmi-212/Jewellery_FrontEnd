import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { Container, CssBaseline, TextField, Button, FormControlLabel, Checkbox, Grid, Typography, Paper, Box, styled } from '@mui/material';
import { useUser } from '../../UserContext';
import Cookies from 'js-cookie';

const BackgroundContainer = styled('div')({
  backgroundSize: 'cover',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  minHeight: '100vh',
  margin: 0,
  backgroundImage: `url("https://png.pngtree.com/thumb_back/fh260/back_our/20190621/ourmid/pngtree-taobao-jewelry-fresh-and-simple-gold-jewelry-poster-image_194638.jpg")`,
  backgroundRepeat: 'no-repeat',
  backgroundPosition: 'center',
});

const StyledContainer = styled(Container)({
  backgroundColor: 'rgba(255, 255, 255, 0.9)',
  padding: '3rem',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  borderRadius: '10px',
  boxShadow: '0px 4px 15px rgba(0, 0, 0, 0.1)',
});

const StyledPaper = styled(Paper)({
  padding: '3rem',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
});

const Title = styled(Typography)({
  marginBottom: '1.5rem',
  color: '#333',
});

const StyledForm = styled('form')({
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  marginTop: '2rem',
});

const StyledTextField = styled(TextField)({
  marginBottom: '1rem',
});

const StyledButton = styled(Button)({
  marginTop: '1.5rem',
});

const StyledLink = styled(Link)({
  marginTop: '1rem',
  alignSelf: 'flex-start',
  color: '#333',
  textDecoration: 'none',
  '&:hover': {
    textDecoration: 'underline',
  },
});

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);
  const navigate = useNavigate();
  const { login } = useUser();

  useEffect(() => {
    // Check if the user is already logged in
    if (Cookies.get('isLoggedIn')) {
      navigate('/');
    }
  }, [navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();

    // Basic form validation
    if (!email || !password) {
      alert('Please fill in both email and password fields.');
      return;
    }

    // Add authentication logic here (e.g., check credentials)
    try {
      const response = await axios.post('https://jewellery-backend-or7c.onrender.com/users/login', { email, password, isAdmin });

      // Check the response status or data for success or errors
      if (response.status === 200) {
        // Registration successful, handle accordingly (e.g., redirect)
        console.log('Login successful!');

        if (isAdmin) {
          console.log('Admin is logged IN');
          navigate('/books');
        } else {
          navigate('/');
        }
        login(true, isAdmin, email);
      } else {
        // Registration failed, handle accordingly (e.g., display error messages)
        console.error('Login failed:', response.data);
        alert('Your login credentials are incorrect.');
      }
    } catch (error) {
      // Handle network errors or other exceptions
      console.error('An error occurred:', error);
    }
  };

  return (
    <BackgroundContainer >
      <StyledContainer component="main" maxWidth="xs">
        <CssBaseline />
        <StyledPaper elevation={3}>
          <Title component="h1" variant="h5">
            Login Page
          </Title>
          <StyledForm onSubmit={handleLogin}>
            <StyledTextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <StyledTextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" checked={isAdmin} onChange={() => setIsAdmin(!isAdmin)} />}
              label="Login as Admin"
            />
            <StyledButton type="submit" fullWidth variant="contained" color="primary">
              Login
            </StyledButton>
            <Grid container>
              <Grid item>
                <StyledLink to="/register" variant="body2">
                  Don't have an account? Register
                </StyledLink>
              </Grid>
            </Grid>
          </StyledForm>
        </StyledPaper>
      </StyledContainer>
    </BackgroundContainer>
  );
}

export default LoginPage;
