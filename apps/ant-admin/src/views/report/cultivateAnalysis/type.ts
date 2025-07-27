import type { BasicFetchResult } from '#/api/model';

export interface ListItem {
  age?: number;
}

export type ListResult = BasicFetchResult<ListItem[]>;
