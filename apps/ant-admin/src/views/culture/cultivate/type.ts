import type { BasicFetchResult } from '#/api/model';

export interface ListItem {
  id: number;
  mb_sn: string;
  location: string;
  vr_mb_sn: string;
  put_num: number;
  out_num: number;
  bad_num: number;
  out_at: string;
  make_bag_sn: string;
  warehouse_id: string;
  upper_moisture: number;
  middle_moisture: number;
  lower_moisture: number;
  upper_ph: number;
  middle_ph: number;
  lower_ph: number;
  upper_weight: number;
  middle_weight: number;
  lower_weight: number;
  upper_height: number;
  middle_height: number;
  strain_age: number;
  nickname: string;
  user_id: number;
  remark: string;
  created_at: string;
  updated_at: string;
  bl_num: number;
  out_over: number;
}

export type ListResult = BasicFetchResult<ListItem[]>;
