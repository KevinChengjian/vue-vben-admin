import type { BasicFetchResult } from '#/api/model';

export interface DictKeyItem {
  id: number;
  name: string;
  code: string;
  num: number;
  sorting: number;
  status: number;
  remark: string;
  created_at: string;
  updated_at: string;
}

export type ListResult = BasicFetchResult<DictKeyItem[]>;
