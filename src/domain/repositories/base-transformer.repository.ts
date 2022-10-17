import { BaseEntity } from '../entities';

export interface IBaseTransformerRepository<
  PayloadEntity extends BaseEntity = BaseEntity
> {
  transformerGetIndex(payload: PayloadEntity[]): PayloadEntity[];
  transformerGetData(payload: PayloadEntity): PayloadEntity;
  transformerCreate(payload: PayloadEntity): PayloadEntity;
  transformerUpdate(payload: PayloadEntity): PayloadEntity;
  transformerDuplicate(payload: PayloadEntity): PayloadEntity;
  transformerFilterIndexTable(payload: any): any;
}
