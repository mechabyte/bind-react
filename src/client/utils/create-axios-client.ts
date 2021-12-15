import type { AxiosRequestConfig } from 'axios';
import applyCaseMiddleware from 'axios-case-converter';
import axios from 'axios';

function createAxiosClient({
  baseURL,
  ...restConfig
}: AxiosRequestConfig) {
  const client = applyCaseMiddleware(
    axios.create({
      baseURL,
      ...restConfig,
    })
  );
  
  return client;
}

export default createAxiosClient;
