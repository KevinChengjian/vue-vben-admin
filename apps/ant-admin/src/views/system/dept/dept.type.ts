import type { BasicFetchResult } from '#/api/model';

export interface DeptItem {
  id: number;
  mch_id: number;
  name: string;
  code: string;
  type: number;
  pid: number;
  status: number;
  status_text: string;
  director_id: number;
  director_text: string;
  sorting: number;
  remark: string;
  created_at: string;
  updated_at: string;
}

export type ListResult = BasicFetchResult<DeptItem[]>;
