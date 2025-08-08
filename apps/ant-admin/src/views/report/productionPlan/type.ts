import type { BasicFetchResult } from '#/api/model';

export interface ListItem {
  id?: number;
  day?: number;
  plan_at?: string;
  mc?: string;
  bottled_num?: string;
  variety_id?: string;
  make_can?: string;
  vc_can?: string;
  production?: string;
  production_vc?: string;
  remark?: string;
}

export type ListResult = BasicFetchResult<ListItem[]>;
