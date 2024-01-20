import axios, { AxiosError, AxiosInstance, AxiosRequestConfig, InternalAxiosRequestConfig } from 'axios';
import { REACT_APP_API_URL } from '../consts';

const axiosConfig: AxiosRequestConfig = {
    baseURL: REACT_APP_API_URL
};

const $host: AxiosInstance = axios.create(axiosConfig);
const $authhost: AxiosInstance = axios.create(axiosConfig);

const authInterceptor = (config: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.authorization = `Bearer ${token}`;
    }
    return config;
};

const errorHandler = (error: AxiosError) => {
    if (error.response) {
      const statusCode = error.response.status;

      if (statusCode === 401) {
        alert('Немає доступу до контенту');
      } else if (statusCode === 404) {
        alert('Помилка серверу 404 (нічого не знайдено)');
      } else {
        alert('Невідома помилка');
      }
    } else if (error.request) {
      alert('Немає відповіді від серверу');
    } else {
      alert('Error setting up the request');
    }

    return Promise.reject(error);
  };

$authhost.interceptors.request.use(authInterceptor);
$host.interceptors.response.use(undefined, errorHandler);

export {
    $host,
    $authhost
};