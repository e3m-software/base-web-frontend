import { AxiosRequestConfig } from 'axios';

export interface HttpRequestProps {
  params: AxiosRequestConfig;
}

export interface HttpClientRepository<R = any> {
  request: (props: HttpRequestProps) => Promise<R>;
}
