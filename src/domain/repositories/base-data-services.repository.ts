import { BaseManagerParamsEntity } from '../entities';

export interface IBaseDataServicesRepository<E> {
  handleCustomRequest(manager: BaseManagerParamsEntity): Promise<void>;

  //get data
  handleGetOne(manager: BaseManagerParamsEntity): Promise<void>;
  handleGetList(manager: BaseManagerParamsEntity): Promise<void>;

  //create and update
  handleCreate(manager: BaseManagerParamsEntity<E>): Promise<void>;
  handleUpdate(manager: BaseManagerParamsEntity<E>): Promise<void>;

  //delete
  handleDelete(manager: BaseManagerParamsEntity<E>): Promise<void>;
  handleBatchDelete(manager: BaseManagerParamsEntity<E[]>): Promise<void>;

  //confirm process data
  handleConfirmProcessData(manager: BaseManagerParamsEntity<E>): Promise<void>;
  handleBatchConfirmProcessData(
    manager: BaseManagerParamsEntity<E[]>
  ): Promise<void>;

  //cancel data
  handleCancelProcessData(manager: BaseManagerParamsEntity<E>): Promise<void>;
  handleBatchCancelProcessData(
    manager: BaseManagerParamsEntity<E[]>
  ): Promise<void>;

  //activate
  handleActivate(manager: BaseManagerParamsEntity<E>): Promise<void>;
  handleBatchActivate(manager: BaseManagerParamsEntity<E[]>): Promise<void>;

  //deactivate
  handleDeactivate(manager: BaseManagerParamsEntity<E>): Promise<void>;
  handleBatchDeactivate(manager: BaseManagerParamsEntity<E[]>): Promise<void>;

  //confirm process transaction
  handleConfirmProcessTransaction(
    manager: BaseManagerParamsEntity<E>
  ): Promise<void>;
  handleBatchConfirmProcessTransaction(
    manager: BaseManagerParamsEntity<E[]>
  ): Promise<void>;

  //confirm cancel transaction
  handleCancelProcessTransaction(
    manager: BaseManagerParamsEntity<E>
  ): Promise<void>;
  handleBatchCancelProcessTransaction(
    manager: BaseManagerParamsEntity<E[]>
  ): Promise<void>;

  //confirm rollback transaction
  handleRollbackProcessTransaction(
    manager: BaseManagerParamsEntity<E>
  ): Promise<void>;
  handleBatchRollbackProcessTransaction(
    manager: BaseManagerParamsEntity<E[]>
  ): Promise<void>;
}
