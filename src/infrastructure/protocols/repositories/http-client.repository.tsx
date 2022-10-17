import { AxiosRequestConfig } from 'axios';

export interface HttpClientRepository<R = any> {
  request: (params: AxiosRequestConfig, token?: string) => Promise<R>;
}
