import type { BasicFetchResult } from '#/api/model';

export interface ListItem {
  id: number;
  mb_sn: string;
  observe_at: string;
  strain_age: number;
  hour: string;
  can_no: number;
  variety_id: string;
  smell: string;
  state: string;
  wind_speed: string;
  temperature: number;
  varied: number | string;
  remark: string;
  created_at: string;
  updated_at: string;
}

export type ListResult = BasicFetchResult<ListItem[]>;
