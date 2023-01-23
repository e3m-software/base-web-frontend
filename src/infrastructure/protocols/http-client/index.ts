import { authHelper } from '../../helpers';
import { ErrorRequest } from '../error-handlings';
import { HttpRequestProps, HttpClientRepository } from '../repositories';
import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';

export class HttpClient<R> implements HttpClientRepository<R> {
  async request(props: HttpRequestProps): Promise<R> {
    const { params } = props;

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
      throw new ErrorRequest(errorData, message, status);
    }
  }
}
