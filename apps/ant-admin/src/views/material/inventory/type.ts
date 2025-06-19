import type { BasicFetchResult } from '#/api/model';

export interface UserItem {
  id: number;
  mch_id: number;
  name: string;
  pid: number;
  status: number;
  status_text: string;
  sorting: number;
  remark: string;
  created_at: string;
  updated_at: string;
}

export type ListResult = BasicFetchResult<UserItem[]>;
