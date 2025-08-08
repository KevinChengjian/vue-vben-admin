import type { BasicFetchResult } from '#/api/model';

export interface ListItem {
  id: number;
  material_id: number;
  material?: string;
  spec_id?: string;
  spec?: string;
  unit_id: string;
  unit: string;
  in_num: number;
  in_money: number;
  out_num: number;
  out_money: number;
  reality_num: number;
  inventory: number;
  amount: number;
  created_at: string;
  updated_at: string;
  remark?: string;
}

export type ListResult = BasicFetchResult<ListItem[]>;
