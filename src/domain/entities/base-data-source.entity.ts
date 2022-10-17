import { AxiosRequestConfig } from 'axios';
import { BaseParamsEntity } from './base-params.entity';

interface ManagerFailedParamsEntity {
  message: Error | string | string[];
  statusCode: number;
}

interface ManagerSuccessParamsEntity<Entity> {
  response: Entity | Entity[];
}

export interface BaseManagerParamsEntity<Entity> {
  params?: BaseParamsEntity;
  onSuccess?(params: ManagerSuccessParamsEntity<Entity>): void;
  onFailed?(params: ManagerFailedParamsEntity): void;
  token?: string;
  paramRequest?: AxiosRequestConfig;
}

export interface BaseBatchMessage {
  id: string;
  message: string;
  [key: string]: any;
}
export interface BaseResponseBatchDataEntity {
  failed: BaseBatchMessage[];
  success: BaseBatchMessage[];
}

export interface BaseDataSourceConstructorEntity {
  baseUrl?: string;
  apiUrl: string;

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
