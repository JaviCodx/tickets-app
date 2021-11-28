import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Alert from '@mui/material/Alert';

import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import { useState } from 'react';
import axios from 'axios';

interface Error {
  message: string;
  fields?: string[];
}

const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<Error[]>([]);

  const handleSubmit = async (e: React.SyntheticEvent): Promise<any> => {
    e.preventDefault();

    try {
      const res = await axios.post('/api/users/signup', {
        email,
        password,
      });

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
            {errors.length > 0 && (
              <Alert severity="error" sx={{ my: 2 }}>
                {
                  <ul>
                    {errors.map((err) => (
                      <li key={err.message}>{err.message}</li>
                    ))}
                  </ul>
                }
              </Alert>
            )}
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
