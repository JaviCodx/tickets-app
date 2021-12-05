import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import { useState } from 'react';
import useRequest from '../../hooks/useRequest';
import Router from 'next/router';

const Signin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [doRequest, errors] = useRequest({
    url: '/api/users/signin',
    method: 'post',
    body: { email, password },
    onSuccess: () => Router.push('/'),
  });

  const handleSubmit = async (e: React.SyntheticEvent): Promise<any> => {
    e.preventDefault();
    doRequest();
  };
  return (
    <Container>
      <Typography gutterBottom variant="h4">
        Sign In
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
          <Grid item>{errors}</Grid>
          <Grid item>
            <Button type="submit" variant="contained">
              Sign in
            </Button>
          </Grid>
        </Grid>
      </form>
    </Container>
  );
};

export default Signin;
