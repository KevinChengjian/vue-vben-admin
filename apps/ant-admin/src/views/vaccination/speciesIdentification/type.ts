import type { BasicFetchResult } from '#/api/model';

export interface ListItem {
  id: number;
  make_bag_sn: string;
  ark_id: string;
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
  lower_height: number;
  nickname: string;
  user_id: number;
  remark: string;
  created_at: string;
  updated_at: string;
}

export type ListResult = BasicFetchResult<ListItem[]>;
