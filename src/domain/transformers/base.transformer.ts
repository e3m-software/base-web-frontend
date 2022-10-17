import { BaseEntity } from '../entities';
import { makeArrayIds } from '../../infrastructure/helpers';
import { IBaseTransformerRepository } from '../repositories';
import { typeOf } from 'mathjs';
import moment from 'moment';

export abstract class BaseTransformer<
  PayloadEntity extends BaseEntity = BaseEntity
> implements IBaseTransformerRepository<PayloadEntity> {
  transformerGetIndex(payload: PayloadEntity[]): PayloadEntity[] {
    return payload;
  }
  transformerGetData(payload: PayloadEntity): PayloadEntity {
    return payload;
  }
  transformerCreate(payload: PayloadEntity): PayloadEntity {
    return payload;
  }
  transformerUpdate(payload: PayloadEntity): PayloadEntity {
    return payload;
  }
  transformerDuplicate(payload: PayloadEntity): PayloadEntity {
    return payload;
  }
  transformerFilterIndexTable(payload: any): any {
    const filterKeys = Object.keys(payload ?? {});
    const filterPayload: any = {};

    filterKeys.forEach(key => {
      const itemFilter = payload[key];
      if (itemFilter) {
        const itemType = typeOf(itemFilter);
        if (itemType === 'Array') {
          const firstData = itemFilter[0];
          const firstDataType = typeOf(firstData);
          if (firstData instanceof moment) {
            const newData = itemFilter.map((itemMoment: any) => {
              return itemMoment?.format();
            });
            Object.assign(filterPayload, { [`${key}`]: newData });
          } else if (firstDataType === 'Object') {
            Object.assign(filterPayload, {
              [`${key}`]: makeArrayIds({ data: itemFilter }),
            });
          } else {
            Object.assign(filterPayload, { [`${key}`]: itemFilter });
          }
        } else if (itemFilter instanceof moment) {
          const itemMoment: any = itemFilter;
          Object.assign(filterPayload, { [`${key}`]: itemMoment?.format() });
        } else if (itemType === 'Object') {
          Object.assign(filterPayload, {
            [`${key}`]: makeArrayIds({ data: itemFilter }),
          });
        } else {
          Object.assign(filterPayload, { [`${key}`]: itemFilter });
        }
      }
    });

    if (filterPayload?.updated_at) {
      const updatedAt = filterPayload.updated_at;
      Object.assign(filterPayload, {
        updated_from: updatedAt[0],
        updated_to: updatedAt[1],
        updated_at: [],
      });
    }

    if (filterPayload?.created_at) {
      const createdAt = filterPayload.created_at;
      Object.assign(filterPayload, {
        created_from: createdAt[0],
        created_to: createdAt[1],
        created_at: [],
      });
    }

    return filterPayload;
  }
}
