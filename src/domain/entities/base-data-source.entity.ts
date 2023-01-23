import { AxiosRequestConfig, AxiosResponse, Method } from 'axios';
import { BaseParamsEntity } from './base-params.entity';
import { BaseEntity } from './base.entity';

export interface ResponseErrorEntity {
  message?: Error | string | string[];
  status: number;
}

export interface ResponseSuccessEntity {
  data?: any;
  status: number;
}

export interface VariableURLEntity {
  [key: string]: string;
}

export interface BaseManagerParamsEntity<Entity extends BaseEntity = any> {
  token?: string;
  payload?: Entity;
  params?: BaseParamsEntity;
  variableURL?: VariableURLEntity;
  paramRequest?: AxiosRequestConfig;
  onFailed?(error: ResponseErrorEntity): void;
  onSuccess?(response: ResponseSuccessEntity): void;
}

export type BaseResponseEntity = ResponseSuccessEntity | ResponseErrorEntity;

export interface BaseURLEntity {
  getIndexUrl?: string;
  getDataUrl?: string;
  createUrl?: string;
  updateUrl?: string;

  deleteUrl?: string;
  batchDeleteUrl?: string;

  confirmProcessDataUrl?: string;
  batchConfirmProcessDataUrl?: string;

  cancelProcessDataUrl?: string;
  batchCancelProcessDataUrl?: string;

  activateUrl?: string;
  batchActivateUrl?: string;

  deactivateUrl?: string;
  batchDeactivateUrl?: string;

  confirmProcessTransactionUrl?: string;
  batchConfirmProcessTransactionUrl?: string;

  cancelProcessTransactionUrl?: string;
  batchCancelProcessTransactionUrl?: string;

  rollbackProcessTransactionUrl?: string;
  batchRollbackProcessTransactionUrl?: string;
}

export interface BaseMethodEntity {
  getIndexMethod?: Method;
  getDataMethod?: Method;
  createMethod?: Method;
  updateMethod?: Method;

  deleteMethod?: Method;
  batchDeleteMethod?: Method;

  confirmProcessDataMethod?: Method;
  batchConfirmProcessDataMethod?: Method;

  cancelProcessDataMethod?: Method;
  batchCancelProcessDataMethod?: Method;

  activateMethod?: Method;
  batchActivateMethod?: Method;

  deactivateMethod?: Method;
  batchDeactivateMethod?: Method;

  confirmProcessTransactionMethod?: Method;
  batchConfirmProcessTransactionMethod?: Method;

  cancelProcessTransactionMethod?: Method;
  batchCancelProcessTransactionMethod?: Method;

  rollbackProcessTransactionMethod?: Method;
  batchRollbackProcessTransactionMethod?: Method;
}

export interface BaseDataSourceConstructorEntity {
  urls?: BaseURLEntity;
  methods?: BaseMethodEntity;
  baseUrl?: string;
  apiUrl?: string;
}
