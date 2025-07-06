import type { BasicFetchResult } from '#/api/model';

export interface MaterialInItem {
  id: number;
  mch_id: number;
  name: string;
  pid: number;
  status: number;
  status_text: string;
  sorting: number;
  remark: string;
  created_at: string;
  updated_at: string;
}

export type ListResult = BasicFetchResult<MaterialInItem[]>;

export interface BatchMaterialItem {
  material_id: number | string;
  material: string;
  spec_id: null | number | string;
  num: number | undefined;
  unit_id: null | number | string;
  price: number | undefined;
  amount: number | undefined;
  remark: string;
}
