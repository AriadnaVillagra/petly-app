// src/shared/http/apiClient.ts

// Axios is a HTTP client library for making requests to APIs. It provides a simple and intuitive API for sending HTTP requests and handling responses.
// In this file, we create a reusable API client that can be used across the application to make HTTP requests to the booking provider's API.
// The client is configured with a base URL and includes an interceptor to automatically attach the authentication token to each request.

import axios, { AxiosInstance } from 'axios';
import { getAuthToken } from '../auth/getAuthToken';

export function createApiClient(baseURL: string): AxiosInstance {
  const client = axios.create({
    baseURL,
    timeout: 10000,
  });

  client.interceptors.request.use(async config => {
    const token = await getAuthToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  });

  return client;
}
