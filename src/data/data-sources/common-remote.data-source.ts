import { BaseRemoteDataSource } from '../data-sources';
import {
  BaseEntity,
  BaseDataSourceConstructorEntity,
} from '../../domain/entities';

export class CommonRemoteDataSource<
  E extends BaseEntity = BaseEntity
> extends BaseRemoteDataSource<E> {
  constructor(params: BaseDataSourceConstructorEntity) {
    super(params);
  }
}
