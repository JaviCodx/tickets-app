import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import { useState } from 'react';

const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  return (
    <>
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="100vh"
      >
        <TextField
          onChange={(e) => setEmail(e.target.value)}
          required
          id="outlined-required"
          label="Email"
          value={email}
          helperText="Please enter your email"
          type="email"
        />

        <TextField
          onChange={(e) => setPassword(e.target.value)}
          required
          id="outlined-required"
          label="Password"
          value={password}
          helperText="Please enter your password"
          type="password"
        />
        <Button variant="contained">Submit</Button>
      </Box>
    </>
  );
};

export default Signup;
