export type PageActionEntity = 'create' | 'update' | 'duplicate' | 'detail';

export interface BaseEntity {
  id?: string;
  [key: string]: any;
}
