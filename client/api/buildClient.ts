import axios, { AxiosRequestHeaders } from 'axios';
import { NextPageContext } from 'next';

const buildRequest = ({ req }: NextPageContext) => {
  if (typeof window === 'undefined') {
    // We are on server side

    return axios.create({
      baseURL:
        'http://ingress-nginx-controller.ingress-nginx.svc.cluster.local',
      headers: req?.headers as AxiosRequestHeaders,
    });
  } else {
    return axios.create({});
  }
};

export default buildRequest;
