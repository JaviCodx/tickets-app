import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import { useState, useEffect } from 'react';
import useRequest from '../../hooks/useRequest';
import Router from 'next/router';

const Signout = () => {
  const [doRequest, errors] = useRequest({
    url: '/api/users/signout',
    method: 'post',
    body: {},
    onSuccess: () => Router.push('/'),
  });

  useEffect(() => {
    doRequest();
  }, []);

  return (
    <Container>
      {' '}
      <Grid container direction="column">
        <Grid item>
          <Typography variant="h5"> Signin out...</Typography>
        </Grid>
        <Grid item>{errors}</Grid>
      </Grid>
    </Container>
  );
};

export default Signout;
