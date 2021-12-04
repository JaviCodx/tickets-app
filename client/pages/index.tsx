import type { NextPage, GetServerSideProps } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import styles from '../styles/Home.module.css';
import axios from 'axios';

interface CurrentUserResponse {
  data: { currentUser: null };
}

interface Props {
  currentUser?: null | {};
}

const Home: NextPage<Props> = ({ currentUser }) => {
  console.log(currentUser);
  return <div>Helloo World</div>;
};

Home.getInitialProps = async () => {
  if (typeof window === 'undefined') {
    const response = await axios
      .get(
        'http://ingress-nginx-controller.ingress-nginx.svc.cluster.local/api/users/currentuser',
        {
          headers: {
            Host: 'tickets-app.dev',
          },
        }
      )
      .catch((err) => console.log(err.message));

    const { data } = response as CurrentUserResponse;

    return data;
  } else {
    const response = await axios
      .get('/api/users/currentuser')
      .catch((err) => console.log(err));

    const { data } = response as CurrentUserResponse;

    return data;
  }
};

export default Home;
