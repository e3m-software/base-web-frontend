import { BaseMethodEntity, BaseURLEntity } from '../entities';

export const defaultMethod: BaseMethodEntity = {
  getIndexMethod: 'GET',
  getDataMethod: 'GET',
  createMethod: 'POST',
  updateMethod: 'PUT',

  deleteMethod: 'DELETE',
  batchDeleteMethod: 'DELETE',

  confirmProcessDataMethod: 'PATCH',
  batchConfirmProcessDataMethod: 'PUT',

  cancelProcessDataMethod: 'PATCH',
  batchCancelProcessDataMethod: 'PUT',

  activateMethod: 'PATCH',
  batchActivateMethod: 'PUT',

  deactivateMethod: 'PATCH',
  batchDeactivateMethod: 'PUT',

  confirmProcessTransactionMethod: 'PATCH',
  batchConfirmProcessTransactionMethod: 'PUT',

  cancelProcessTransactionMethod: 'PATCH',
  batchCancelProcessTransactionMethod: 'PUT',

  rollbackProcessTransactionMethod: 'PATCH',
  batchRollbackProcessTransactionMethod: 'PUT',
};

export function makeDefaultURL(apiUrl: string): BaseURLEntity {
  return {
    getIndexUrl: `${apiUrl}`,
    getDataUrl: `${apiUrl}/:id`,
    createUrl: `${apiUrl}`,
    updateUrl: `${apiUrl}/:id`,

    deleteUrl: `${apiUrl}/:id`,
    batchDeleteUrl: `${apiUrl}/batch-delete`,

    activateUrl: `${apiUrl}/:id/activate`,
    batchActivateUrl: `${apiUrl}/batch-activate`,

    deactivateUrl: `${apiUrl}/:id/deactivate`,
    batchDeactivateUrl: `${apiUrl}/batch-deactivate`,

    confirmProcessDataUrl: `${apiUrl}/:id/confirm-request`,
    batchConfirmProcessDataUrl: `${apiUrl}/batch-confirm-request`,

    cancelProcessDataUrl: `${apiUrl}/:id/cancel`,
    batchCancelProcessDataUrl: `${apiUrl}/batch-cancel`,

    confirmProcessTransactionUrl: `${apiUrl}/:id/confirm-process`,
    batchConfirmProcessTransactionUrl: `${apiUrl}/batch-confirm-process`,

    cancelProcessTransactionUrl: `${apiUrl}/:id/confirm-cancel`,
    batchCancelProcessTransactionUrl: `${apiUrl}/batch-confirm-cancel`,

    rollbackProcessTransactionUrl: `${apiUrl}/:id/confirm-rollback`,
    batchRollbackProcessTransactionUrl: `${apiUrl}/batch-confirm-rollback`,
  };
}
