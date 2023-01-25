import { BaseRemoteDataServices } from '../data-services';
import {
  BaseEntity,
  BaseDataServicesConstructorEntity,
} from '../../domain/entities';

export class CommonRemoteDataServices<
  E extends BaseEntity = BaseEntity
> extends BaseRemoteDataServices<E> {
  constructor(params: BaseDataServicesConstructorEntity) {
    super(params);
  }
}
