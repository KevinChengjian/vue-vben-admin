import type { BasicFetchResult } from '#/api/model';

export interface LogActionItem {
  id: number;
  type: number;
  nickname: string;
  user_id: number;
  menu_id: number;
  menu_name: string;
  action_id: number;
  action_name: string;
  method: string;
  client_ip: string;
  address: string;
  operation_at: string;
  uri: string;
  result_code: number;
}

export type ListResult = BasicFetchResult<LogActionItem[]>;
