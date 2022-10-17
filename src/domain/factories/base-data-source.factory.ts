import { CommonRemoteDataSource } from '../../data/data-sources';
import { IBaseDataSourceRepository } from '../../domain/repositories';
import {
  BaseEntity,
  BaseDataSourceConstructorEntity,
} from '../../domain/entities';

export function makeCommonDataSource<E extends BaseEntity = BaseEntity>(
  params: BaseDataSourceConstructorEntity
): IBaseDataSourceRepository<E> {
  return new CommonRemoteDataSource<E>(params);
}
