import { BaseEntity } from '../entities';
import { CommonTransformer } from '../transformers';
import { IBaseTransformerRepository } from '../repositories';

export function makeCommonTransformer<
  E extends BaseEntity = BaseEntity
>(): IBaseTransformerRepository<E> {
  return new CommonTransformer<E>();
}
