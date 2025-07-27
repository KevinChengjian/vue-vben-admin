import type { BasicFetchResult } from '#/api/model';

export interface ListItem {
  out_at: string;
  variety_id: string;
  formulaName: string;
  warehouse_id: string;
  num: number;
  strain_age: number;
  room_id: string;
  remark: string;
}

export type ListResult = BasicFetchResult<ListItem[]>;
