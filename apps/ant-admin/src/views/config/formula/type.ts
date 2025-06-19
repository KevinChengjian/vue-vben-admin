import type { BasicFetchResult } from '#/api/model';

export interface FormulaMaterialItem {
  id: number;
  fid: number;
  mid: number;
  name?: string;
  ratio: number;
  remark?: string;
}

export interface FormulaItem {
  id: number;
  name: string;
  status: number;
  remark: string;
  nickname: string;
  creator_id: string;
  materials: FormulaMaterialItem[];
  material_txt: '';
  created_at: string;
  updated_at: string;
  deleted_at: number;
}

export type ListResult = BasicFetchResult<FormulaItem[]>;
