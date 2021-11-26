import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import { useState } from 'react';
import axios from 'axios';

interface apiError {
  message: string;
  fields?: string[];
}

const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState([]);

  const handleSubmit = async (e: React.SyntheticEvent): Promise<any> => {
    e.preventDefault();
    console.log(email, password);
    try {
      const res = await axios.post('/api/users/signup', {
        email,
        password,
      });
      console.log(res.data);
      setEmail('');
      setPassword('');
    } catch (err) {
      setErrors(err.response.data.errors);
    }
  };
  return (
    <Container>
      <Typography gutterBottom variant="h4">
        Sign Up
      </Typography>
      <form noValidate autoComplete="off" onSubmit={handleSubmit}>
        <Grid container direction="column">
          <Grid item>
            <TextField
              onChange={(e) => setEmail(e.target.value)}
              required
              id="outlined-required"
              label="Email"
              value={email}
              type="email"
              fullWidth
            />
          </Grid>
          <Grid item>
            <TextField
              onChange={(e) => setPassword(e.target.value)}
              required
              id="outlined-required"
              label="Password"
              value={password}
              type="password"
              fullWidth
              margin="normal"
            />
          </Grid>
          <Grid item>
            <Button type="submit" variant="contained">
              Submit
            </Button>
          </Grid>
        </Grid>
      </form>
    </Container>
  );
};

export default Signup;
