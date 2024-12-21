import axios, {
  AxiosError,
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from "axios";

const apiConfig = (baseUrl: string): AxiosRequestConfig => {
  return {
    baseURL: baseUrl,
  };
}

const initAxios = (config: AxiosRequestConfig, token?: string): AxiosInstance => {
  const defineInstance = axios.create(config);
  defineInstance.interceptors.request.use(
    (request: InternalAxiosRequestConfig) => request
  );

  defineInstance.interceptors.response.use(
    (response: AxiosResponse) => response,
    (error: AxiosError) => Promise.reject(error)
  );

  return defineInstance;
}

const api = (baseURL: string = "/api", token?: string) => {
  return initAxios(apiConfig(baseURL), token);
}

export default api;
