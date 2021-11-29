import axios from 'axios';
import { useState } from 'react';
import Alert from '@mui/material/Alert';

interface Error {
  message: string;
  fields?: string[];
}

const useRequest = ({
  url,
  method,
  body,
  onSuccess,
}: {
  url: string;
  method: 'post' | 'put' | 'delete' | 'get';
  body: {};
  onSuccess: (data: any) => void;
}) => {
  const [errors, setErrors] = useState<JSX.Element | null>(null);

  const doRequest = async () => {
    try {
      setErrors(null);
      const response = await axios[method](url, body);

      if (onSuccess) {
        onSuccess(response.data);
      }
      return response.data;
    } catch (err) {
      const errors = err.response.data.errors as Error[];
      setErrors(
        <Alert severity="error" sx={{ my: 2 }}>
          {
            <ul>
              {errors.map((err) => (
                <li key={err.message}>{err.message}</li>
              ))}
            </ul>
          }
        </Alert>
      );
    }
  };

  return [doRequest, errors] as const;
};

export default useRequest;
