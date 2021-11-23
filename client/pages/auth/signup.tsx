import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import { useState } from 'react';

const Signup = () => {
  const [email, setEmail] = useState('');
  return (
    <>
      <Box
        component="form"
        sx={{
          '& .MuiTextField-root': { m: 1, width: '25ch' },
        }}
        noValidate
        autoComplete="off"
      >
        <TextField
          onChange={(e) => setEmail(e.target.value)}
          required
          id="outlined-required"
          label="Required"
        />
      </Box>
    </>
  );
};

export default Signup;
