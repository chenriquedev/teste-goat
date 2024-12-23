import { AxiosResponse } from "axios";
import api from "./config";

const get = <T>(
  url: string,
  params?: object,
  baseURL?: string,
  token?: string
): Promise<AxiosResponse<T>> =>  {
  return api(baseURL, token).get<T>(url, {params});
};

const post = <T>(
  url: string,
  body: object,
  params?: object,
  baseURL?: string,
): Promise<AxiosResponse<T>| void> => {
  return api(baseURL).post<T>(url, body, {params});
}

const put = <T>(
  url: string,
  body: object,
  params?: object,
  baseURL?: string,
): Promise<AxiosResponse<T>| void> => {
  return api(baseURL).put<T>(url, body, {params});
}

const deleteR = <T>(
  url: string,
  baseURL?: string,
): Promise<AxiosResponse> => {
  return api(baseURL).delete<T>(url);
}

export {get, post, put, deleteR}