import type { BasicFetchResult } from '#/api/model';

export interface ListItem {
  id: number;
}

export type ListResult = BasicFetchResult<ListItem>;
