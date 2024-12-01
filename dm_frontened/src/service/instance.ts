import axios from 'axios';
import { localBaseUrl } from '../shared/api.config';

// Create an Axios instance
export const baseInstance = axios.create({
  baseURL: localBaseUrl ,
  headers: {
    'Content-Type': 'application/json', 
  },
});

baseInstance.interceptors.request.use(
  (config) => {
    console.log('Request sent with:', config);
    return config;
  },
  (error) => {
    console.error('Request error:', error);
    return Promise.reject(error);
  }
);

// Response interceptor
baseInstance.interceptors.response.use(
  (response) => {
    console.log('Response received:', response);
    return response;
  },
  (error) => {
    console.error('Response error:', error);
    return Promise.reject(error);
  }
);
