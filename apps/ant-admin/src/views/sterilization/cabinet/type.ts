import type { BasicFetchResult } from '#/api/model';

export interface ListItem {
  id: number;
  mb_id: number;
  make_bag_sn: string;
  ark_id: number;
  set_sterilization_time: string;
  sterilization_time: string;
  temperature: number;
  program: string;
  tp: string;
  user_id: number;
  remark: string;
  creator_id: number;
  created_at: string;
  updated_at: string;
}

export type ListResult = BasicFetchResult<ListItem[]>;
