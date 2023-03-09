import {
  HttpClient,
  HttpClientRepository,
} from '../../infrastructure/protocols';
import { IBaseDataServicesRepository } from '../../domain/repositories';
import {
  BaseEntity,
  BaseManagerParamsEntity,
  BaseDataServicesConstructorEntity,
  BaseResponseEntity,
  BaseURLEntity,
  BaseMethodEntity,
} from '../../domain/entities';
import { defaultMethod, makeDefaultURL } from '../../domain/constant';

const HeaderPost = {
  'Access-Control-Allow-Origin': '*',
  'Content-Type': 'application/json',
  Accept: '*/*',
};
export abstract class BaseRemoteDataServices<E extends BaseEntity = BaseEntity>
  implements IBaseDataServicesRepository<E> {
  protected baseUrl: string;
  protected URLs: BaseURLEntity;
  protected methods: BaseMethodEntity;
  protected useAuthSchema: boolean;
  protected authURL: string;

  protected requestHttpClient: HttpClientRepository<
    BaseResponseEntity
  > = new HttpClient<BaseResponseEntity>();

  constructor(params: BaseDataServicesConstructorEntity) {
    this.baseUrl = params.baseUrl ?? process.env.REACT_APP_BASE_URL;
    this.URLs = {
      ...(makeDefaultURL(params.apiUrl ?? '') ?? {}),
      ...(params.urls ?? {}),
    };
    this.methods = {
      ...(defaultMethod ?? {}),
      ...(params.methods ?? {}),
    };
  }

  protected makeApiUrl(variable = {} as any, url = '' as string): string {
    return url
      .split('/')
      .map((item: string) => {
        if (item.includes(':')) return variable[item.slice(1)];
        return item;
      })
      .join('/');
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

  //custom request
  async handleCustomRequest(manager: BaseManagerParamsEntity): Promise<void> {
    try {
      const response: any = await this.requestHttpClient.request({
        params: {
          baseURL: this.baseUrl,
          ...(manager.requestConfig ?? {}),
        },
      });
      if (manager.onSuccess) manager.onSuccess(response as BaseResponseEntity);
    } catch (error) {
      if (manager.onFailed) manager.onFailed(error as BaseResponseEntity);
    }
  }

  async handleGetList(manager: BaseManagerParamsEntity): Promise<void> {
    try {
      const response = await this.requestHttpClient.request({
        params: {
          baseURL: this.baseUrl,
          url: this.makeApiUrl(manager.variableURL, this.URLs.getIndexUrl),
          method: this.methods.getIndexMethod,
          params: manager.params,
          ...(manager.requestConfig ?? {}),
        },
      });
      if (manager.onSuccess) manager.onSuccess(response as BaseResponseEntity);
    } catch (error) {
      if (manager.onFailed) manager.onFailed(error as BaseResponseEntity);
    }
  }

  async handleGetOne(manager: BaseManagerParamsEntity): Promise<void> {
    try {
      const response: any = await this.requestHttpClient.request({
        params: {
          baseURL: this.baseUrl,
          url: this.makeApiUrl(manager.variableURL, this.URLs.getDataUrl),
          params: manager.params,
          method: this.methods.getDataMethod,
          ...(manager.requestConfig ?? {}),
        },
      });

      if (manager.onSuccess) manager.onSuccess(response as BaseResponseEntity);
    } catch (error) {
      if (manager.onFailed) manager.onFailed(error as BaseResponseEntity);
    }
  }

  async handleCreate(manager: BaseManagerParamsEntity): Promise<void> {
    try {
      const response: any = await this.requestHttpClient.request({
        params: {
          baseURL: this.baseUrl,
          url: this.makeApiUrl(manager.variableURL, this.URLs.createUrl),
          params: manager.params,
          data: manager.payload,
          headers: HeaderPost,
          method: this.methods.createMethod,
          ...(manager.requestConfig ?? {}),
        },
      });

      if (manager.onSuccess) manager.onSuccess(response as BaseResponseEntity);
    } catch (error) {
      if (manager.onFailed) manager.onFailed(error as BaseResponseEntity);
    }
  }

  async handleUpdate(manager: BaseManagerParamsEntity): Promise<void> {
    try {
      const response: any = await this.requestHttpClient.request({
        params: {
          baseURL: this.baseUrl,
          url: this.makeApiUrl(manager.variableURL, this.URLs.updateUrl),
          params: manager.params,
          data: manager.payload,
          headers: HeaderPost,
          method: this.methods.updateMethod,
          ...(manager.requestConfig ?? {}),
        },
      });
      if (manager.onSuccess) manager.onSuccess(response as BaseResponseEntity);
    } catch (error) {
      if (manager.onFailed) manager.onFailed(error as BaseResponseEntity);
    }
  }

  async handleDelete(manager: BaseManagerParamsEntity): Promise<void> {
    try {
      const response: any = await this.requestHttpClient.request({
        params: {
          baseURL: this.baseUrl,
          url: this.makeApiUrl(
            {
              id: this.makeId(manager.payload),
              ...(manager.variableURL ?? {}),
            },
            this.URLs.deleteUrl
          ),
          params: manager.params,
          method: this.methods.deleteMethod,
          ...(manager.requestConfig ?? {}),
        },
      });
      if (manager.onSuccess) manager.onSuccess(response as BaseResponseEntity);
    } catch (error) {
      if (manager.onFailed) manager.onFailed(error as BaseResponseEntity);
    }
  }

  async handleBatchDelete(manager: BaseManagerParamsEntity): Promise<void> {
    try {
      const response: any = await this.requestHttpClient.request({
        params: {
          baseURL: this.baseUrl,
          url: this.makeApiUrl(manager.variableURL, this.URLs.batchDeleteUrl),
          method: this.methods.batchDeleteMethod,
          params: manager.params,
          data: { ids: this.makeIds(manager.payload) },
          ...(manager.requestConfig ?? {}),
        },
      });
      if (manager.onSuccess) manager.onSuccess(response as BaseResponseEntity);
    } catch (error) {
      if (manager.onFailed) manager.onFailed(error as BaseResponseEntity);
    }
  }

  // confirm process data
  async handleConfirmProcessData(
    manager: BaseManagerParamsEntity
  ): Promise<void> {
    try {
      const response: any = await this.requestHttpClient.request({
        params: {
          baseURL: this.baseUrl,
          url: this.makeApiUrl(
            {
              id: this.makeId(manager.payload),
              ...(manager.variableURL ?? {}),
            },
            this.URLs.confirmProcessDataUrl
          ),
          method: this.methods.confirmProcessDataMethod,
          params: manager.params,
          ...(manager.requestConfig ?? {}),
        },
      });
      if (manager.onSuccess) manager.onSuccess(response as BaseResponseEntity);
    } catch (error) {
      if (manager.onFailed) manager.onFailed(error as BaseResponseEntity);
    }
  }

  async handleBatchConfirmProcessData(
    manager: BaseManagerParamsEntity
  ): Promise<void> {
    try {
      const response: any = await this.requestHttpClient.request({
        params: {
          baseURL: this.baseUrl,
          url: this.makeApiUrl(
            manager.variableURL,
            this.URLs.batchConfirmProcessDataUrl
          ),
          method: this.methods.batchConfirmProcessDataMethod,
          params: manager.params,
          data: { ids: this.makeIds(manager.payload) },
          ...(manager.requestConfig ?? {}),
        },
      });
      if (manager.onSuccess) manager.onSuccess(response as BaseResponseEntity);
    } catch (error) {
      if (manager.onFailed) manager.onFailed(error as BaseResponseEntity);
    }
  }

  //handle activate
  async handleActivate(manager: BaseManagerParamsEntity): Promise<void> {
    try {
      const response: any = await this.requestHttpClient.request({
        params: {
          baseURL: this.baseUrl,
          url: this.makeApiUrl(
            {
              id: this.makeId(manager.payload),
              ...(manager.variableURL ?? {}),
            },
            this.URLs.activateUrl
          ),
          method: this.methods.activateMethod,
          params: manager.params,
          ...(manager.requestConfig ?? {}),
        },
      });
      if (manager.onSuccess) manager.onSuccess(response as BaseResponseEntity);
    } catch (error) {
      if (manager.onFailed) manager.onFailed(error as BaseResponseEntity);
    }
  }

  async handleBatchActivate(manager: BaseManagerParamsEntity): Promise<void> {
    try {
      const response: any = await this.requestHttpClient.request({
        params: {
          baseURL: this.baseUrl,
          url: this.makeApiUrl(manager.variableURL, this.URLs.batchActivateUrl),
          method: this.methods.batchActivateMethod,
          params: manager.params,
          data: { ids: this.makeIds(manager.payload) },
          ...(manager.requestConfig ?? {}),
        },
      });
      if (manager.onSuccess) manager.onSuccess(response as BaseResponseEntity);
    } catch (error) {
      if (manager.onFailed) manager.onFailed(error as BaseResponseEntity);
    }
  }

  //handle deactivate
  async handleDeactivate(manager: BaseManagerParamsEntity): Promise<void> {
    try {
      const response: any = await this.requestHttpClient.request({
        params: {
          baseURL: this.baseUrl,
          url: this.makeApiUrl(
            {
              id: this.makeId(manager.payload),
              ...(manager.variableURL ?? {}),
            },
            this.URLs.deactivateUrl
          ),
          method: this.methods.deactivateMethod,
          params: manager.params,
          ...(manager.requestConfig ?? {}),
        },
      });
      if (manager.onSuccess) manager.onSuccess(response as BaseResponseEntity);
    } catch (error) {
      if (manager.onFailed) manager.onFailed(error as BaseResponseEntity);
    }
  }

  async handleBatchDeactivate(manager: BaseManagerParamsEntity): Promise<void> {
    try {
      const response: any = await this.requestHttpClient.request({
        params: {
          baseURL: this.baseUrl,
          url: this.makeApiUrl(
            manager.variableURL,
            this.URLs.batchDeactivateUrl
          ),
          method: this.methods.batchDeactivateMethod,
          params: manager.params,
          data: { ids: this.makeIds(manager.payload) },
          ...(manager.requestConfig ?? {}),
        },
      });
      if (manager.onSuccess) manager.onSuccess(response as BaseResponseEntity);
    } catch (error) {
      if (manager.onFailed) manager.onFailed(error as BaseResponseEntity);
    }
  }

  //cancel process data
  async handleCancelProcessData(
    manager: BaseManagerParamsEntity
  ): Promise<void> {
    try {
      const response: any = await this.requestHttpClient.request({
        params: {
          baseURL: this.baseUrl,
          url: this.makeApiUrl(
            {
              id: this.makeId(manager.payload),
              ...(manager.variableURL ?? {}),
            },
            this.URLs.cancelProcessDataUrl
          ),
          method: this.methods.cancelProcessDataMethod,
          params: manager.params,
          ...(manager.requestConfig ?? {}),
        },
      });
      if (manager.onSuccess) manager.onSuccess(response as BaseResponseEntity);
    } catch (error) {
      if (manager.onFailed) manager.onFailed(error as BaseResponseEntity);
    }
  }

  async handleBatchCancelProcessData(
    manager: BaseManagerParamsEntity
  ): Promise<void> {
    try {
      const response: any = await this.requestHttpClient.request({
        params: {
          baseURL: this.baseUrl,
          url: this.makeApiUrl(
            manager.variableURL,
            this.URLs.batchCancelProcessDataUrl
          ),
          method: this.methods.batchCancelProcessDataMethod,
          params: manager.params,
          data: { ids: this.makeIds(manager.payload) },
          ...(manager.requestConfig ?? {}),
        },
      });
      if (manager.onSuccess) manager.onSuccess(response as BaseResponseEntity);
    } catch (error) {
      if (manager.onFailed) manager.onFailed(error as BaseResponseEntity);
    }
  }

  // confirm process transaction

  async handleConfirmProcessTransaction(
    manager: BaseManagerParamsEntity
  ): Promise<void> {
    try {
      const response: any = await this.requestHttpClient.request({
        params: {
          baseURL: this.baseUrl,
          url: this.makeApiUrl(
            {
              id: this.makeId(manager.payload),
              ...(manager.variableURL ?? {}),
            },
            this.URLs.confirmProcessTransactionUrl
          ),
          method: this.methods.confirmProcessTransactionMethod,
          params: manager.params,
          ...(manager.requestConfig ?? {}),
        },
      });
      if (manager.onSuccess) manager.onSuccess(response as BaseResponseEntity);
    } catch (error) {
      if (manager.onFailed) manager.onFailed(error as BaseResponseEntity);
    }
  }

  async handleBatchConfirmProcessTransaction(
    manager: BaseManagerParamsEntity
  ): Promise<void> {
    try {
      const response: any = await this.requestHttpClient.request({
        params: {
          baseURL: this.baseUrl,
          url: this.makeApiUrl(
            manager.variableURL,
            this.URLs.batchConfirmProcessTransactionUrl
          ),
          method: this.methods.batchConfirmProcessTransactionMethod,
          params: manager.params,
          data: { ids: this.makeIds(manager.payload) },
          ...(manager.requestConfig ?? {}),
        },
      });
      if (manager.onSuccess) manager.onSuccess(response as BaseResponseEntity);
    } catch (error) {
      if (manager.onFailed) manager.onFailed(error as BaseResponseEntity);
    }
  }

  // cancel process transaction

  async handleCancelProcessTransaction(
    manager: BaseManagerParamsEntity
  ): Promise<void> {
    try {
      const response: any = await this.requestHttpClient.request({
        params: {
          baseURL: this.baseUrl,
          url: this.makeApiUrl(
            {
              id: this.makeId(manager.payload),
              ...(manager.variableURL ?? {}),
            },
            this.URLs.cancelProcessTransactionUrl
          ),
          method: this.methods.cancelProcessTransactionMethod,
          params: manager.params,
          ...(manager.requestConfig ?? {}),
        },
      });
      if (manager.onSuccess) manager.onSuccess(response as BaseResponseEntity);
    } catch (error) {
      if (manager.onFailed) manager.onFailed(error as BaseResponseEntity);
    }
  }

  async handleBatchCancelProcessTransaction(
    manager: BaseManagerParamsEntity
  ): Promise<void> {
    try {
      const response: any = await this.requestHttpClient.request({
        params: {
          baseURL: this.baseUrl,
          url: this.makeApiUrl(
            manager.variableURL,
            this.URLs.batchCancelProcessTransactionUrl
          ),
          method: this.methods.batchCancelProcessTransactionMethod,
          params: manager.params,
          data: { ids: this.makeIds(manager.payload) },
          ...(manager.requestConfig ?? {}),
        },
      });
      if (manager.onSuccess) manager.onSuccess(response as BaseResponseEntity);
    } catch (error) {
      if (manager.onFailed) manager.onFailed(error as BaseResponseEntity);
    }
  }

  //rollback transaction
  async handleRollbackProcessTransaction(
    manager: BaseManagerParamsEntity
  ): Promise<void> {
    try {
      const response: any = await this.requestHttpClient.request({
        params: {
          baseURL: this.baseUrl,
          url: this.makeApiUrl(
            {
              id: this.makeId(manager.payload),
              ...(manager.variableURL ?? {}),
            },
            this.URLs.rollbackProcessTransactionUrl
          ),
          method: this.methods.rollbackProcessTransactionMethod,
          params: manager.params,
          ...(manager.requestConfig ?? {}),
        },
      });
      if (manager.onSuccess) manager.onSuccess(response as BaseResponseEntity);
    } catch (error) {
      if (manager.onFailed) manager.onFailed(error as BaseResponseEntity);
    }
  }

  async handleBatchRollbackProcessTransaction(
    manager: BaseManagerParamsEntity
  ): Promise<void> {
    try {
      const response: any = await this.requestHttpClient.request({
        params: {
          baseURL: this.baseUrl,
          url: this.makeApiUrl(
            manager.variableURL,
            this.URLs.batchRollbackProcessTransactionUrl
          ),
          method: this.methods.batchRollbackProcessTransactionMethod,
          params: manager.params,
          data: { ids: this.makeIds(manager.payload) },
          ...(manager.requestConfig ?? {}),
        },
      });
      if (manager.onSuccess) manager.onSuccess(response as BaseResponseEntity);
    } catch (error) {
      if (manager.onFailed) manager.onFailed(error as BaseResponseEntity);
    }
  }
}
