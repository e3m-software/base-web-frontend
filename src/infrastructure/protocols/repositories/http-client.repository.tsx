import { AxiosRequestConfig, AxiosResponse } from 'axios';

export interface HttpRequestProps {
  params: AxiosRequestConfig;
  useAuthSchema?: boolean;
  authURL?: string;
  token?: string;
  interceptorRequest?(params: AxiosRequestConfig): any;
  interceptorResponse?(params: AxiosResponse): any;
  unauthorizedSchema?(params: AxiosResponse): void;
}

export interface HttpClientRepository<R = any> {
  request: (props: HttpRequestProps) => Promise<R>;
}
