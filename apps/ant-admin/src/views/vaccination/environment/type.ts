import type { BasicFetchResult } from '#/api/model';

export interface ListItem {
  id: number;
  region_id: string;
  point_id: string;
  sgl_mildew: string;
  q_mildew: string;
  lp_mildew: string;
  g_mildew: string;
  m_mildew: string;
  h_mildew: string;
  user_id: number;
  nickname: string;
  remark: string;
  creator_id: number;
  created_at: string;
  updated_at: string;
}

export type ListResult = BasicFetchResult<ListItem[]>;
