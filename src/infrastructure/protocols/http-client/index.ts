import axios, { AxiosError, AxiosRequestConfig } from 'axios';
import { authHelper } from '../../helpers';
import { ErrorRequest } from '../error-handlings';
import { HttpClientRepository } from '../repositories';

export class HttpClient<R> implements HttpClientRepository<R> {
  setRequestToken = (
    request: AxiosRequestConfig,
    authToken: string
  ): AxiosRequestConfig => {
    const token = authToken ?? authHelper.getAuthToken();
    if (!token) return request;
    request.headers.Authorization = `Bearer ${token}`;
    return request;
  };

  async request(params: AxiosRequestConfig, token: string): Promise<R> {
    axios.interceptors.request.use(request =>
      this.setRequestToken(request, token)
    );
    try {
      const { data } = await axios.request<R>({ ...params });
      return data;
    } catch (e) {
      const error = e as AxiosError<any>;
      const { message, statusCode, data } = error?.response?.data ?? {
        message: 'Unexpected Error',
      };
      const skipAuth = process.env.REACT_APP_SKIP_AUTH ?? 'NO';
      const loginUrl = process.env.REACT_APP_LOGIN_URL ?? '/auth/login';
      const statusResponse = statusCode ?? error.response?.status;

      if (statusResponse === 401 && skipAuth === 'NO') {
        await authHelper.clearStorageLogout();
        const urlBeforeLogin = window.location.href;
        await localStorage.setItem('url_before_login', urlBeforeLogin);
        window.location.replace(loginUrl);
      }
      throw new ErrorRequest(data, message, statusCode);
    }
  }
}

export const requestHttpClient = new HttpClient().request;
