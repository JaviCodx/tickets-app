import axios from 'axios';
import { useState } from 'react';
import Alert from '@mui/material/Alert';

const useRequest = ({
  url,
  method,
  body,
}: {
  url: string;
  method: 'post' | 'put' | 'delete' | 'get';
  body: {};
}) => {
  const [errors, setErrors] = useState(null);

  const doRequest = async () => {
    try {
      const response = await axios[method](url, body);
      return response.data;
    } catch (err) {
      setErrors(errors);
    }
  };

  return [doRequest, errors];
};

export default useRequest;
