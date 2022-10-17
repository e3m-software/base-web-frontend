import { BaseEntity } from '../entities';
import { BaseTransformer } from '../transformers';

export class CommonTransformer<
  PayloadEntity extends BaseEntity = BaseEntity
> extends BaseTransformer<PayloadEntity> {}
