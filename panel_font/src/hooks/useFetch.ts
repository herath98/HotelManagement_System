/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useCallback } from 'react';
import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';

import Cookies from 'js-cookie';
import alert from '../utils/alert';

// Use import.meta.env instead of process.env
const BASE_URL = import.meta.env.VITE_BASE_URL || '';
const DEFAULT_ERROR_MESSAGE = 'An unexpected error occurred.';

interface FetchOptions {
  method?: 'GET' | 'POST';
  accessToken?: string;
  data?: any;
  silent?: boolean;
  successMessage?: string;
  config?: AxiosRequestConfig;
  contentType?: string;
}

interface FetchResponse {
  code?: number;
  success?: boolean;
  message?: string;
  [key: string]: any;
}

const useFetch = (endpoint: string, options: FetchOptions = {}) => {
  const [data, setData] = useState<FetchResponse | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [responseCode, setResponseCode] = useState<number | null>(null);

  const fetchData = useCallback(async (overrideOptions: FetchOptions = {}) => {
    const {
      method = 'GET',
      accessToken,
      data: requestData,
      silent = false,
      successMessage,
      config,
      contentType = 'application/json',
    } = { ...options, ...overrideOptions };

    setLoading(true);
    setError(null);

    try {
      let response: AxiosResponse<FetchResponse>;

      const headers = {
        Authorization: accessToken ? `Bearer ${accessToken}` : undefined,
        ...config?.headers,
      };

      if (method === 'GET') {
        response = await axios.get(`${BASE_URL}${endpoint}`, {
          params: requestData,
          headers,
          ...config,
        });
      } else {
        const finalHeaders = { 
          'Content-Type': contentType,
          ...headers 
        };
        
        // Don't stringify if using FormData
        const finalData = contentType === 'multipart/form-data' 
          ? requestData 
          : requestData; // Remove JSON.stringify here
      
        response = await axios.post(`${BASE_URL}${endpoint}`, finalData, {
          headers: finalHeaders,
          ...config,
        });
      }

      setResponseCode(response.status);
      const responseData = response.data;

      if (responseData.code) {
        setResponseCode(responseData.code);
      }

      if (responseData.success) {
        setData(responseData);
        if (!silent) {
            alert.success(successMessage || responseData.message || '');
        }
      } else {
        if (responseData.code === 401 && endpoint === '/chat/ask/question') {
          window.location.href = '/';
        } else if (responseData.code === 403) {
          Cookies.remove('accessToken');
          window.location.href = '/';
        } else {
          setData(responseData);
          if (!silent) {
            handleError(responseData.message, responseData.code);
          }
        }
      }
    } catch (error: any) {
      setResponseCode(error.response?.status || 500);
      handleError(error.message);
    } finally {
      setLoading(false);
    }
  }, [endpoint, options]);

  const handleError = (message: string = DEFAULT_ERROR_MESSAGE, code?: number) => {
    if (code === 401) {
      Cookies.remove('accessToken');
      window.location.reload();
    } else {
      setError(message);
      alert.warn(message || DEFAULT_ERROR_MESSAGE || "unexpected Error");
    }
  };

  return { data, loading, error, responseCode, fetchData };
};

export default useFetch;
