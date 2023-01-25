import { CommonRemoteDataServices } from '../../data/data-services';
import { IBaseDataServicesRepository } from '../repositories';
import { BaseEntity, BaseDataServicesConstructorEntity } from '../entities';

export function makeCommonDataServices<E extends BaseEntity = BaseEntity>(
  params: BaseDataServicesConstructorEntity
): IBaseDataServicesRepository<E> {
  return new CommonRemoteDataServices<E>(params);
}
