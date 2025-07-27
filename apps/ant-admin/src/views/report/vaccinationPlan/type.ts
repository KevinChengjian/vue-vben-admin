import type { BasicFetchResult } from '#/api/model';

export interface ListItem {
  id?: number;
  day?: number;
  plan_at?: string;
  bucket_num?: number;
  plan_num?: number;
  plan_fid?: string;
  plan_variety_id?: string;
  plan_type?: string;
  reality_num?: number;
  reality_fid?: number;
  variety_id?: string;
  reality_at?: string;
  put_num?: number;
  vaccination_num?: number;
  remark?: string;
}

export type ListResult = BasicFetchResult<ListItem[]>;
