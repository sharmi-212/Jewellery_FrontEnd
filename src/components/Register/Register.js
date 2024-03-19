import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import {
  Grid,
  Container,
  CssBaseline,
  TextField,
  Button,
  FormControlLabel,
  Checkbox,
  Typography,
  Paper,
  Box,
  styled,
} from '@mui/material';

const BackgroundContainer = styled('div')({
  backgroundSize: 'cover',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  minHeight: '100vh',
  margin: 0,
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

const ErrorMessage = styled(Typography)({
  marginTop: '0.5rem',
});

const StyledFormControlLabel = styled(FormControlLabel)({
  marginTop: '1rem',
  alignSelf: 'flex-start',
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

function RegistrationPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isPasswordValid, setIsPasswordValid] = useState(true);
  const [name, setName] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);
  const navigate = useNavigate();

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    const newPassword = e.target.value;
    setPassword(newPassword);
    // Check if the password meets the requirements
    const isMinLength = newPassword.length >= 6; // Adjust the minimum length as needed
    setIsPasswordValid(isMinLength);
  };

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleAdminCheckboxChange = (e) => {
    setIsAdmin(e.target.checked);
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    if (isPasswordValid === false) {
      alert('Password does not meet the requirements.');
      return;
    }

    if (password.length === 0 || email.length === 0 || name.length === 0) {
      alert('Please enter all the fields.');
      return;
    }

    try {
      const response = await axios.post('https://appliances-be.onrender.com/users/register', {
        name,
        email,
        password,
        isAdmin,
      });

      if (response.status === 200) {
        console.log('Registration successful!');
        navigate('/login');
      } else if (response.status === 201) {
        alert('Registration failed. Email already in use.');
      } else {
        console.error('Registration failed:', response.data);
        alert('Your registration request failed. Please try again.');
      }
    } catch (error) {
      console.error('An error occurred:', error);
    }
  };

  return (
    <BackgroundContainer style={{backgroundImage: `url("https://png.pngtree.com/thumb_back/fh260/back_our/20190621/ourmid/pngtree-taobao-jewelry-fresh-and-simple-gold-jewelry-poster-image_194638.jpg")`}}>
      <StyledContainer component="main" maxWidth="xs">
        <CssBaseline />
        <StyledPaper elevation={3}>
          <Title component="h1" variant="h5">
            Registration
          </Title>
          <StyledForm onSubmit={handleRegister}>
            <StyledTextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="name"
              label="Name"
              name="name"
              autoComplete="name"
              autoFocus
              value={name}
              onChange={handleNameChange}
            />
            <StyledTextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              value={email}
              onChange={handleEmailChange}
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
              autoComplete="new-password"
              value={password}
              onChange={handlePasswordChange}
            />
            {!isPasswordValid && (
              <ErrorMessage variant="caption" color="error">
                Password must be at least 6 characters long.
              </ErrorMessage>
            )}
            <StyledFormControlLabel
              control={
                <Checkbox
                  value="isAdmin"
                  color="primary"
                  checked={isAdmin}
                  onChange={handleAdminCheckboxChange}
                />
              }
              label="Register as Admin"
            />
            <StyledButton type="submit" fullWidth variant="contained" color="primary">
              Register
            </StyledButton>
            <Grid container>
              <Grid item>
                <StyledLink to="/login" variant="body2">
                  Already have an account? Login
                </StyledLink>
              </Grid>
            </Grid>
          </StyledForm>
        </StyledPaper>
      </StyledContainer>
    </BackgroundContainer>
  );
}

export default RegistrationPage;
