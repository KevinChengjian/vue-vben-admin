import { requestClient } from '#/api/request';

export namespace MakeBag {
  export interface QueryParams {
    keyword?: string;
  }

  export interface Item {
    id: number;
    formula_id: number;
    make_bag_sn: string;
    label: string;
    value: string;
  }

  /**
   * 制包编号列表
   * @returns any
   */
  export async function list(params?: QueryParams) {
    return requestClient.get<Item[]>('/admin/substrate-mixing/all', {
      params,
    });
  }
}
