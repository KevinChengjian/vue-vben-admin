import type { BasicFetchResult } from '#/api/model';

export interface ListItem {
  id: number;
  make_bag_sn: string;
  formula_id: number;
  formula_name?: string;
  machine_id: number | string;
  num: number;
  weight: number;
  depth: number;
  height: number;
  dt: string;
  remark: string;
  created_at: string;
  updated_at: string;
}

export type ListResult = BasicFetchResult<ListItem[]>;
