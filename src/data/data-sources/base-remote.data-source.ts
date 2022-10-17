import {
  HttpClient,
  ErrorRequest,
  HttpClientRepository,
} from '../../infrastructure/protocols';
import { IBaseDataSourceRepository } from '../../domain/repositories';
import {
  BaseEntity,
  BaseParamsEntity,
  BaseResponseEntity,
  BaseResponseIndexEntity,
  BaseManagerParamsEntity,
  BaseResponseBatchDataEntity,
  BaseDataSourceConstructorEntity,
} from '../..//domain/entities';

export abstract class BaseRemoteDataSource<E extends BaseEntity = BaseEntity>
  implements IBaseDataSourceRepository<E> {
  protected baseUrl: string;
  protected apiUrl: string;
  protected getIndexUrl: string;
  protected getDataUrl: string;
  protected createUrl: string;
  protected updateUrl: string;

  protected deleteUrl: string;
  protected batchDeleteUrl: string;

  protected confirmProcessDataUrl: string;
  protected batchConfirmProcessDataUrl: string;

  protected cancelProcessDataUrl: string;
  protected batchCancelProcessDataUrl: string;

  protected activateUrl: string;
  protected batchActivateUrl: string;

  protected deactivateUrl: string;
  protected batchDeactivateUrl: string;

  protected confirmProcessTransactionUrl?: string;
  protected batchConfirmProcessTransactionUrl?: string;

  protected cancelProcessTransactionUrl?: string;
  protected batchCancelProcessTransactionUrl?: string;

  protected rollbackProcessTransactionUrl?: string;
  protected batchRollbackProcessTransactionUrl?: string;

  protected requestHttpClient: HttpClientRepository<
    BaseResponseEntity<E>
  > = new HttpClient<BaseResponseEntity<E>>();

  constructor(params: BaseDataSourceConstructorEntity) {
    this.baseUrl = params.baseUrl ?? process.env.REACT_APP_BASE_URL;
    this.apiUrl = params.apiUrl;
    this.getIndexUrl = params.getIndexUrl ?? params.apiUrl;
    this.getDataUrl = params.getDataUrl ?? params.apiUrl;
    this.createUrl = params.createUrl ?? params.apiUrl;
    this.updateUrl = params.updateUrl ?? params.apiUrl;

    this.deleteUrl = params.deleteUrl ?? params.apiUrl;
    this.batchDeleteUrl =
      params.batchDeleteUrl ?? `${params.apiUrl}/batch-delete`;

    this.confirmProcessDataUrl = params.confirmProcessDataUrl ?? params.apiUrl;
    this.batchConfirmProcessDataUrl =
      params.batchConfirmProcessDataUrl ??
      `${params.apiUrl}/batch-confirm-request`;

    this.cancelProcessDataUrl = params.cancelProcessDataUrl ?? params.apiUrl;
    this.batchCancelProcessDataUrl =
      params.batchCancelProcessDataUrl ??
      `${params.apiUrl}/batch-cancel-request`;

    this.activateUrl = params.activateUrl ?? params.apiUrl;
    this.batchActivateUrl =
      params.batchActivateUrl ?? `${params.apiUrl}/batch-activate`;

    this.deactivateUrl = params.deactivateUrl ?? params.apiUrl;
    this.batchDeactivateUrl =
      params.batchDeactivateUrl ?? `${params.apiUrl}/batch-deactivate`;

    this.confirmProcessTransactionUrl =
      params.confirmProcessTransactionUrl ?? params.apiUrl;
    this.batchConfirmProcessTransactionUrl =
      params.batchConfirmProcessTransactionUrl ??
      `${params.apiUrl}/batch-confirm-transaction`;

    this.cancelProcessTransactionUrl =
      params.cancelProcessTransactionUrl ?? params.apiUrl;
    this.batchCancelProcessTransactionUrl =
      params.batchCancelProcessTransactionUrl ??
      `${params.apiUrl}/batch-cancel-transaction`;

    this.rollbackProcessTransactionUrl =
      params.rollbackProcessTransactionUrl ?? params.apiUrl;
    this.batchRollbackProcessTransactionUrl =
      params.batchRollbackProcessTransactionUrl ??
      `${params.apiUrl}/batch-rollback-transaction`;
  }

  protected makeParams(params: BaseParamsEntity): any {
    return params;
  }

  protected makeApiUrl(url: string, baseUrl?: string): string {
    return `${baseUrl ?? this.baseUrl}${url}`;
  }

  protected handleError(error: any): any {
    const { message: messages, statusCode } = error;
    const message: any = messages
      ? Array.isArray(messages)
        ? messages
        : [messages]
      : ['Unexpected Error'];
    return {
      message,
      statusCode,
    };
  }

  protected makeIds(payload: E[]): string[] {
    const ids: string[] = [];
    for (const entity of payload) {
      ids.push(entity.id.toString());
    }
    return ids;
  }

  protected makeId(payload: E): string {
    return payload.id;
  }

  async handleGetIndex(
    manager: BaseManagerParamsEntity<BaseResponseIndexEntity<E>>
  ): Promise<void> {
    const { params, onSuccess, onFailed, token } = manager;
    try {
      const response: any = await this.requestHttpClient.request(
        {
          url: this.makeApiUrl(this.getIndexUrl),
          method: 'GET',
          params: this.makeParams(params),
        },
        token
      );
      const { message, data } = response as BaseResponseEntity<
        BaseResponseIndexEntity<E>
      >;
      onSuccess({ response: data ?? message ?? response });
    } catch (error) {
      const { message, statusCode } = this.handleError(error) as ErrorRequest;
      onFailed({ message, statusCode });
    }
  }

  async handleGetData(
    id: string,
    manager: BaseManagerParamsEntity<E>
  ): Promise<void> {
    const { params, onSuccess, onFailed, token } = manager;
    try {
      const response: any = await this.requestHttpClient.request(
        {
          url: this.makeApiUrl(`${this.getDataUrl}/${id}`),
          method: 'GET',
          params: this.makeParams(params),
        },
        token
      );
      const { message } = response as BaseResponseEntity<E>;
      onSuccess({ response: message });
    } catch (error) {
      const { message, statusCode } = this.handleError(error) as ErrorRequest;
      onFailed({ message, statusCode });
    }
  }

  async handleCreate(
    payload: E,
    manager: BaseManagerParamsEntity<E>
  ): Promise<void> {
    const { params, onSuccess, onFailed, token } = manager;
    try {
      const response: any = await this.requestHttpClient.request(
        {
          url: this.makeApiUrl(this.createUrl),
          method: 'POST',
          params: this.makeParams(params),
          data: payload,
          headers: {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json',
            Accept: '*/*',
          },
        },
        token
      );
      const { message, data } = response as BaseResponseEntity<E>;
      onSuccess({ response: data ?? message ?? response });
    } catch (error) {
      const { message, statusCode } = this.handleError(error) as ErrorRequest;
      onFailed({ message, statusCode });
    }
  }

  async handleUpdate(
    id: string,
    payload: E,
    manager: BaseManagerParamsEntity<E>
  ): Promise<void> {
    const { params, onSuccess, onFailed, token } = manager;
    try {
      const response: any = await this.requestHttpClient.request(
        {
          url: this.makeApiUrl(`${this.updateUrl}/${id}`),
          method: 'PUT',
          params: this.makeParams(params),
          data: payload,
          headers: {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json',
            Accept: '*/*',
          },
        },
        token
      );
      const { message, data } = response as BaseResponseEntity<E>;
      onSuccess({ response: data ?? message ?? response });
    } catch (error) {
      const { message, statusCode } = this.handleError(error) as ErrorRequest;
      onFailed({ message, statusCode });
    }
  }

  async handleDelete(
    payload: E,
    manager: BaseManagerParamsEntity<E>
  ): Promise<void> {
    const { params, onSuccess, onFailed, token } = manager;
    const id = this.makeId(payload);
    try {
      const response: any = await this.requestHttpClient.request(
        {
          url: this.makeApiUrl(`${this.deleteUrl}/${id}`),
          method: 'DELETE',
          params: this.makeParams(params),
        },
        token
      );
      const { message, data } = response as BaseResponseEntity<E>;
      onSuccess({ response: data ?? message ?? response });
    } catch (error) {
      const { message, statusCode } = this.handleError(error) as ErrorRequest;
      onFailed({ message, statusCode });
    }
  }

  async handleBatchDelete(
    payload: E[],
    manager: BaseManagerParamsEntity<BaseResponseBatchDataEntity>
  ): Promise<void> {
    const { params = {}, onSuccess, onFailed, token } = manager;
    try {
      const response: any = await this.requestHttpClient.request(
        {
          url: this.makeApiUrl(this.batchDeleteUrl),
          method: 'DELETE',
          params: this.makeParams(params),
          data: { ids: this.makeIds(payload) },
        },
        token
      );
      const { message, data } = response as BaseResponseEntity<
        BaseResponseBatchDataEntity
      >;
      onSuccess({ response: data ?? message ?? response });
    } catch (error) {
      const { message, statusCode } = this.handleError(error) as ErrorRequest;
      onFailed({ message, statusCode });
    }
  }

  async handleConfirmProcessData(
    payload: E,
    manager: BaseManagerParamsEntity<E>
  ): Promise<void> {
    const { params, onSuccess, onFailed, token } = manager;
    const id = this.makeId(payload);
    try {
      const response: any = await this.requestHttpClient.request(
        {
          url: this.makeApiUrl(
            `${this.confirmProcessDataUrl}/${id}/confirm-request`
          ),
          method: 'PUT',
          params: this.makeParams(params),
        },
        token
      );
      const { message, data } = response as BaseResponseEntity<E>;
      onSuccess({ response: data ?? message ?? response });
    } catch (error) {
      const { message, statusCode } = this.handleError(error) as ErrorRequest;
      onFailed({ message, statusCode });
    }
  }

  async handleBatchConfirmProcessData(
    payload: E[],
    manager: BaseManagerParamsEntity<BaseResponseBatchDataEntity>
  ): Promise<void> {
    const { params = {}, onSuccess, onFailed, token } = manager;
    try {
      const response: any = await this.requestHttpClient.request(
        {
          url: this.makeApiUrl(this.batchConfirmProcessDataUrl),
          method: 'PUT',
          params: this.makeParams(params),
          data: { ids: this.makeIds(payload) },
        },
        token
      );
      const { message, data } = response as BaseResponseEntity<
        BaseResponseBatchDataEntity
      >;
      onSuccess({ response: data ?? message ?? response });
    } catch (error) {
      const { message, statusCode } = this.handleError(error) as ErrorRequest;
      onFailed({ message, statusCode });
    }
  }

  async handleCancelProcessData(
    payload: E,
    manager: BaseManagerParamsEntity<E>
  ): Promise<void> {
    const { params, onSuccess, onFailed, token } = manager;
    const id = this.makeId(payload);
    try {
      const response: any = await this.requestHttpClient.request(
        {
          url: this.makeApiUrl(`${this.cancelProcessDataUrl}/${id}/cancel`),
          method: 'PUT',
          params: this.makeParams(params),
        },
        token
      );
      const { message, data } = response as BaseResponseEntity<E>;
      onSuccess({ response: data ?? message ?? response });
    } catch (error) {
      const { message, statusCode } = this.handleError(error) as ErrorRequest;
      onFailed({ message, statusCode });
    }
  }

  async handleBatchCancelProcessData(
    payload: E[],
    manager: BaseManagerParamsEntity<BaseResponseBatchDataEntity>
  ): Promise<void> {
    const { params = {}, onSuccess, onFailed, token } = manager;
    try {
      const response: any = await this.requestHttpClient.request(
        {
          url: this.makeApiUrl(this.batchCancelProcessDataUrl),
          method: 'PUT',
          params: this.makeParams(params),
          data: { ids: this.makeIds(payload) },
        },
        token
      );
      const { message, data } = response as BaseResponseEntity<
        BaseResponseBatchDataEntity
      >;
      onSuccess({ response: data ?? message ?? response });
    } catch (error) {
      const { message, statusCode } = this.handleError(error) as ErrorRequest;
      onFailed({ message, statusCode });
    }
  }

  async handleActivate(
    payload: E,
    manager: BaseManagerParamsEntity<E>
  ): Promise<void> {
    const { params, onSuccess, onFailed, token } = manager;
    const id = this.makeId(payload);
    try {
      const response: any = await this.requestHttpClient.request(
        {
          url: this.makeApiUrl(`${this.activateUrl}/${id}/activate`),
          method: 'PATCH',
          params: this.makeParams(params),
        },
        token
      );
      const { message, data } = response as BaseResponseEntity<E>;
      onSuccess({ response: data ?? message ?? response });
    } catch (error) {
      const { message, statusCode } = this.handleError(error) as ErrorRequest;
      onFailed({ message, statusCode });
    }
  }

  async handleDeactivate(
    payload: E,
    manager: BaseManagerParamsEntity<E>
  ): Promise<void> {
    const { params, onSuccess, onFailed, token } = manager;
    const id = this.makeId(payload);
    try {
      const response: any = await this.requestHttpClient.request(
        {
          url: this.makeApiUrl(`${this.deactivateUrl}/${id}/deactivate`),
          method: 'PATCH',
          params: this.makeParams(params),
        },
        token
      );
      const { message, data } = response as BaseResponseEntity<E>;
      onSuccess({ response: data ?? message ?? response });
    } catch (error) {
      const { message, statusCode } = this.handleError(error) as ErrorRequest;
      onFailed({ message, statusCode });
    }
  }

  async handleBatchActivate(
    payload: E[],
    manager: BaseManagerParamsEntity<BaseResponseBatchDataEntity>
  ): Promise<void> {
    const { params = {}, onSuccess, onFailed, token } = manager;
    try {
      const response: any = await this.requestHttpClient.request(
        {
          url: this.makeApiUrl(this.batchActivateUrl),
          method: 'PUT',
          params: this.makeParams(params),
          data: { ids: this.makeIds(payload) },
        },
        token
      );
      const { message, data } = response as BaseResponseEntity<
        BaseResponseBatchDataEntity
      >;
      onSuccess({ response: data ?? message ?? response });
    } catch (error) {
      const { message, statusCode } = this.handleError(error) as ErrorRequest;
      onFailed({ message, statusCode });
    }
  }

  async handleBatchDeactivate(
    payload: E[],
    manager: BaseManagerParamsEntity<BaseResponseBatchDataEntity>
  ): Promise<void> {
    const { params = {}, onSuccess, onFailed, token } = manager;
    try {
      const response: any = await this.requestHttpClient.request(
        {
          url: this.makeApiUrl(this.batchDeactivateUrl),
          method: 'PUT',
          params: this.makeParams(params),
          data: { ids: this.makeIds(payload) },
        },
        token
      );
      const { message, data } = response as BaseResponseEntity<
        BaseResponseBatchDataEntity
      >;
      onSuccess({ response: data ?? message ?? response });
    } catch (error) {
      const { message, statusCode } = this.handleError(error) as ErrorRequest;
      onFailed({ message, statusCode });
    }
  }

  async handleConfirmProcessTransaction(
    payload: E,
    manager: BaseManagerParamsEntity<E>
  ): Promise<void> {
    const { params, onSuccess, onFailed, token } = manager;
    const id = this.makeId(payload);
    try {
      const response: any = await this.requestHttpClient.request(
        {
          url: this.makeApiUrl(
            `${this.confirmProcessTransactionUrl}/${id}/confirm/process`
          ),
          method: 'PUT',
          params: this.makeParams(params),
        },
        token
      );
      const { message, data } = response as BaseResponseEntity<E>;
      onSuccess({ response: data ?? message ?? response });
    } catch (error) {
      const { message, statusCode } = this.handleError(error) as ErrorRequest;
      onFailed({ message, statusCode });
    }
  }

  async handleBatchConfirmProcessTransaction(
    payload: E[],
    manager: BaseManagerParamsEntity<BaseResponseBatchDataEntity>
  ): Promise<void> {
    const { params = {}, onSuccess, onFailed, token } = manager;
    try {
      const response: any = await this.requestHttpClient.request(
        {
          url: this.makeApiUrl(this.batchConfirmProcessTransactionUrl),
          method: 'PUT',
          params: this.makeParams(params),
          data: { ids: this.makeIds(payload) },
        },
        token
      );
      const { message, data } = response as BaseResponseEntity<
        BaseResponseBatchDataEntity
      >;
      onSuccess({ response: data ?? message ?? response });
    } catch (error) {
      const { message, statusCode } = this.handleError(error) as ErrorRequest;
      onFailed({ message, statusCode });
    }
  }

  async handleCancelProcessTransaction(
    payload: E,
    manager: BaseManagerParamsEntity<E>
  ): Promise<void> {
    const { params, onSuccess, onFailed, token } = manager;
    const id = this.makeId(payload);
    try {
      const response: any = await this.requestHttpClient.request(
        {
          url: this.makeApiUrl(
            `${this.cancelProcessTransactionUrl}/${id}/confirm/cancel`
          ),
          method: 'PUT',
          params: this.makeParams(params),
        },
        token
      );
      const { message, data } = response as BaseResponseEntity<E>;
      onSuccess({ response: data ?? message ?? response });
    } catch (error) {
      const { message, statusCode } = this.handleError(error) as ErrorRequest;
      onFailed({ message, statusCode });
    }
  }

  async handleBatchCancelProcessTransaction(
    payload: E[],
    manager: BaseManagerParamsEntity<BaseResponseBatchDataEntity>
  ): Promise<void> {
    const { params = {}, onSuccess, onFailed, token } = manager;
    try {
      const response: any = await this.requestHttpClient.request(
        {
          url: this.makeApiUrl(this.batchCancelProcessTransactionUrl),
          method: 'PUT',
          params: this.makeParams(params),
          data: { ids: this.makeIds(payload) },
        },
        token
      );
      const { message, data } = response as BaseResponseEntity<
        BaseResponseBatchDataEntity
      >;
      onSuccess({ response: data ?? message ?? response });
    } catch (error) {
      const { message, statusCode } = this.handleError(error) as ErrorRequest;
      onFailed({ message, statusCode });
    }
  }

  async handleRollbackProcessTransaction(
    payload: E,
    manager: BaseManagerParamsEntity<E>
  ): Promise<void> {
    const { params, onSuccess, onFailed, token } = manager;
    const id = this.makeId(payload);
    try {
      const response: any = await this.requestHttpClient.request(
        {
          url: this.makeApiUrl(
            `${this.rollbackProcessTransactionUrl}/${id}/confirm/rollback`
          ),
          method: 'PUT',
          params: this.makeParams(params),
        },
        token
      );
      const { message, data } = response as BaseResponseEntity<E>;
      onSuccess({ response: data ?? message ?? response });
    } catch (error) {
      const { message, statusCode } = this.handleError(error) as ErrorRequest;
      onFailed({ message, statusCode });
    }
  }

  async handleBatchRollbackProcessTransaction(
    payload: E[],
    manager: BaseManagerParamsEntity<BaseResponseBatchDataEntity>
  ): Promise<void> {
    const { params = {}, onSuccess, onFailed, token } = manager;
    try {
      const response: any = await this.requestHttpClient.request(
        {
          url: this.makeApiUrl(this.batchRollbackProcessTransactionUrl),
          method: 'PUT',
          params: this.makeParams(params),
          data: { ids: this.makeIds(payload) },
        },
        token
      );
      const { message, data } = response as BaseResponseEntity<
        BaseResponseBatchDataEntity
      >;
      onSuccess({ response: data ?? message ?? response });
    } catch (error) {
      const { message, statusCode } = this.handleError(error) as ErrorRequest;
      onFailed({ message, statusCode });
    }
  }

  async handleCustomRequest(
    manager: BaseManagerParamsEntity<BaseResponseIndexEntity<E>>
  ): Promise<void> {
    const { onSuccess, onFailed, token, paramRequest } = manager;
    try {
      const response: any = await this.requestHttpClient.request(
        paramRequest,
        token
      );
      const { message, data } = response as BaseResponseEntity<
        BaseResponseIndexEntity<E>
      >;
      onSuccess({ response: data ?? message ?? response });
    } catch (error) {
      const { message, statusCode } = this.handleError(error) as ErrorRequest;
      onFailed({ message, statusCode });
    }
  }
}
