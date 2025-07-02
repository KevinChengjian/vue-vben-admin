import type { BasicFetchResult } from '#/api/model';

export interface ListItem {
  id: number;
  day: string;
  plan_at: string;
  bucket_num: number;
  plan_num: number;
  plan_fid: number;
  plan_variety_id: number;
  plan_type: string;
  reality_num: number;
  reality_fid: number;
  variety_id: string;
  reality_at: string;
  put_num: number;
  vaccination_num: number;
  remark: string;
  creator_id: number;
  created_at: string;
  updated_at: string;
}

export type ListResult = BasicFetchResult<ListItem[]>;
