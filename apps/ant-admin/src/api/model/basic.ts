export interface BasicPageParams {
  page: number;
  pageSize: number;
}

export interface BasicFetchResult<T> {
  data?: T;
  count?: number;
  page?: number;
  pageSize?: number;
}
