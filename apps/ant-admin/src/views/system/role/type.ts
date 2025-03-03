import type { BasicFetchResult } from '#/api/model';

export interface RoleItem {
  id: number;
  mch_id: number;
  name: string;
  code: string;
  pid: number;
  status: number;
  status_text: string;
  sorting: number;
  remark: string;
  created_at: string;
  updated_at: string;
}

export type ListResult = BasicFetchResult<RoleItem[]>;
