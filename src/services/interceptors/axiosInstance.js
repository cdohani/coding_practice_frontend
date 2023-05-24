import axios from 'axios';
import { validationAlert } from 'services/methods/api';

// Create an instance of Axios with default configurations
const axiosInstance = axios.create({
  baseURL: 'http://127.0.0.1:8000/api/', // Replace with your API's base URL
  headers: {"Authorization" : `Bearer ${localStorage.getItem('access_token')}`}
});

// Add request interceptor
axiosInstance.interceptors.request.use(
  function (config) {

    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

// Add response interceptor
axiosInstance.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    if (error.response) {
      if (error.response.status === 404) {
        // Handle 404 error
      } else if (error.response.status === 403) {
        // Handle 403 error
      } else if (error.response.status === 500) {
        // Handle 500 error
      }

    
    }

    // Handle other errors or rejections
    return Promise.reject(error);
  }
);

export default axiosInstance;