import axios, { AxiosError, AxiosInstance, AxiosResponse } from "axios";
import { getToken } from "./token";

const request: AxiosInstance = axios.create({
  baseURL: "http://127.0.0.1:4523/m1/4549877-0-default/",
  timeout: 5000,
});

// 请求拦截器
request.interceptors.request.use(
  (config) => {
    const token = getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  }
);

// 响应拦截器
request.interceptors.response.use(
  (response: AxiosResponse) => {
    return response.data;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  }
);

export { request };
