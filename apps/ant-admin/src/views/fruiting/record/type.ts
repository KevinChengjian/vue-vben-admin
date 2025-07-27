import type { BasicFetchResult } from '#/api/model';

export interface ListItem {
  id: number;
  fruiting_sn: string;
  roomName: string;
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

export interface Profit {
  fid: number;
  sale_a_price: number;
  sale_a_amount: number;
  sale_a1_price: number;
  sale_a1_amount: number;
  sale_c_price: number;
  sale_c_amount: number;
  sale_amount: number;

  cost_amount: number;
  cost_bag_rate: number; // 包成本系数
  cost_bag_amount: number; // 包成本 数量 * 系数

  cost_cg_rate: number; // 出菇系数
  cost_cg_amount: number; // 出菇成本 数量 * 系数

  cost_a_rate: number; // A菇采摘系数
  cost_a_amount: number; // A菇采摘成本

  cost_c_rate: number; // C菇采摘系数
  cost_c_amount: number; // C菇采摘成本

  cost_cz_price: number; // 单包采摘成本
  cost_sp_price: number; // 合计单包成本

  profit: number;
  profit_sp: number;
}

export interface Summary {
  id: 0;
  experiment: string;
  summarize: string;
  strain_info: string;
  fruiting_info: string;
  improvement: string;
  cz_sf: string;
  cz_dx: string;
  resource_id: number | string;
}
