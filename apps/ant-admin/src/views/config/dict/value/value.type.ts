import type { BasicFetchResult } from '#/api/model';

export interface DictValueItem {
  id: number;
  key_id: number;
  code: string;
  label: string;
  value: string;
  status: number;
  default: number;
  sorting: number;
  remark: string;
}

export type ListResult = BasicFetchResult<DictValueItem[]>;
