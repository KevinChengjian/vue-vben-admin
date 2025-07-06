import type { BasicFetchResult } from '#/api/model';

export interface ListItem {
  id: number;
  mb_sn: string;
  identification_at: string;
  can_no: number;
  variety_id: string;
  hour: string;
  ph: number;
  concentration: number;
  result: string;
  user_id: number;
  remark: string;
  created_at: string;
  updated_at: string;
}

export type ListResult = BasicFetchResult<ListItem[]>;
