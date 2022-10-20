import { AxiosRequestConfig } from 'axios';

export interface HttpRequestProps {
  params: AxiosRequestConfig;
  useAuthSchema?: boolean;
  authURL?: string;
  token?: string;
}

export interface HttpClientRepository<R = any> {
  request: (props: HttpRequestProps) => Promise<R>;
}
