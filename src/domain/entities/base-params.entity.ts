export interface BaseParamsEntity {
  q?: string;
  search?: string;
  q_index?: string;
  page?: number | string;
  limit?: number | string;
  ids?: string[];
  with_child?: boolean;
  [key: string]: any;
}
