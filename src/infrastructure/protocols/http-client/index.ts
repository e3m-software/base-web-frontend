import { authHelper } from '../../helpers';
import { ErrorRequest } from '../error-handlings';
import { HttpRequestProps, HttpClientRepository } from '../repositories';
import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';

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

  async request(props: HttpRequestProps): Promise<R> {
    const {
      useAuthSchema = true,
      authURL = '/auth/login',
      params,
      token,
    } = props;

    axios.interceptors.request.use(request =>
      this.setRequestToken(request, token)
    );

    try {
      const response: AxiosResponse = await axios.request<R>({ ...params });
      const data = response.data;
      const status = response.status;
      return { data, status } as any;
    } catch (e) {
      const error = e as AxiosError<any>;
      const errorResponse: AxiosResponse = error?.response;
      const errorData = errorResponse?.data;
      const status = errorResponse?.status;
      const message = errorData?.message ?? errorData;

      if (status === 401 && useAuthSchema) {
        await authHelper.clearStorageLogout();
        const urlBeforeLogin = window.location.href;
        await localStorage.setItem('url_before_login', urlBeforeLogin);
        window.location.replace(authURL);
      }

      throw new ErrorRequest(errorData, message, status);
    }
  }
}
