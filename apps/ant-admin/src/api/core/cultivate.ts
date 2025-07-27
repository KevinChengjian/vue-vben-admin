import { requestClient } from '#/api/request';

export namespace Cultivate {
  export interface QueryParams {
    keyword?: string;
  }

  export interface Item {
    id: number;
    formula_id: number;
    variety_id: string;
    warehouse_id: string;
    can_no: string;
    mb_sn: string;
    label: string;
    value: string;
    num: number;
  }

  /**
   * 养菌房菌包编号含购买菌包编号
   * @returns any
   */
  export async function list(params?: QueryParams) {
    return requestClient.get<Item[]>('/admin/cultivate/mb-sn', {
      params,
    });
  }
}
