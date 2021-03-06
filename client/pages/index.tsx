import type { NextPage, GetServerSideProps } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import styles from '../styles/Home.module.css';
import buildClient from '../api/buildClient';
import Container from '@mui/material/Container';

type CurrentUser = null | { id: string; email: string };
interface CurrentUserResponse {
  data: { currentUser: CurrentUser };
}

interface Props {
  currentUser: CurrentUser;
}

const Home: NextPage<Props> = ({ currentUser }) => {
  return (
    <Container>
      {currentUser ? (
        <h1>You are signed in</h1>
      ) : (
        <h1>You are NOT signed in</h1>
      )}
    </Container>
  );
};

Home.getInitialProps = async (context) => {
  const { data } = (await buildClient(context).get(
    '/api/users/currentuser'
  )) as CurrentUserResponse;

  return data;
};

export default Home;
