import type { BasicFetchResult } from '#/api/model';
import type { Status } from '#/enums/StatusEnum';

export interface RoleItem {
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

export interface RuleItem {
  id: number;
  pid: number;
  title: string;
  type: string;
  status: Status;
  children: RuleItem[];
}

export type ListResult = BasicFetchResult<RoleItem[]>;
