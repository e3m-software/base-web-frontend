import {
  BaseManagerParamsEntity,
  BaseResponseIndexEntity,
  BaseResponseBatchDataEntity,
} from '../entities';

export interface IBaseDataSourceRepository<E> {
  //get data
  handleGetData(id: string, manager: BaseManagerParamsEntity<E>): Promise<void>;
  handleGetIndex(
    manager: BaseManagerParamsEntity<BaseResponseIndexEntity<E>>
  ): Promise<void>;

  //create and update
  handleCreate(payload: E, manager: BaseManagerParamsEntity<E>): Promise<void>;
  handleUpdate(
    id: string,
    payload: E,
    manager: BaseManagerParamsEntity<E>
  ): Promise<void>;

  //delete
  handleDelete(payload: E, manager: BaseManagerParamsEntity<E>): Promise<void>;
  handleBatchDelete(
    payload: E[],
    manager: BaseManagerParamsEntity<BaseResponseBatchDataEntity>
  ): Promise<void>;

  //confirm process data
  handleConfirmProcessData(
    payload: E,
    manager: BaseManagerParamsEntity<E>
  ): Promise<void>;
  handleBatchConfirmProcessData(
    payload: E[],
    manager: BaseManagerParamsEntity<BaseResponseBatchDataEntity>
  ): Promise<void>;

  //cancel data
  handleCancelProcessData(
    payload: E,
    manager: BaseManagerParamsEntity<E>
  ): Promise<void>;
  handleBatchCancelProcessData(
    payload: E[],
    manager: BaseManagerParamsEntity<BaseResponseBatchDataEntity>
  ): Promise<void>;

  //activate
  handleActivate(
    payload: E,
    manager: BaseManagerParamsEntity<E>
  ): Promise<void>;
  handleBatchActivate(
    payload: E[],
    manager: BaseManagerParamsEntity<BaseResponseBatchDataEntity>
  ): Promise<void>;

  //deactivate
  handleDeactivate(
    payload: E,
    manager: BaseManagerParamsEntity<E>
  ): Promise<void>;
  handleBatchDeactivate(
    payload: E[],
    manager: BaseManagerParamsEntity<BaseResponseBatchDataEntity>
  ): Promise<void>;

  //confirm process transaction
  handleConfirmProcessTransaction(
    payload: E,
    manager: BaseManagerParamsEntity<E>
  ): Promise<void>;
  handleBatchConfirmProcessTransaction(
    payload: E[],
    manager: BaseManagerParamsEntity<BaseResponseBatchDataEntity>
  ): Promise<void>;

  //confirm cancel transaction
  handleCancelProcessTransaction(
    payload: E,
    manager: BaseManagerParamsEntity<E>
  ): Promise<void>;
  handleBatchCancelProcessTransaction(
    payload: E[],
    manager: BaseManagerParamsEntity<BaseResponseBatchDataEntity>
  ): Promise<void>;

  //confirm rollback transaction
  handleRollbackProcessTransaction(
    payload: E,
    manager: BaseManagerParamsEntity<E>
  ): Promise<void>;
  handleBatchRollbackProcessTransaction(
    payload: E[],
    manager: BaseManagerParamsEntity<BaseResponseBatchDataEntity>
  ): Promise<void>;

  handleCustomRequest(
    manager: BaseManagerParamsEntity<BaseResponseIndexEntity<E>>
  ): Promise<void>;
}
