import { requestClient } from '#/api/request';

export namespace Vaccination {
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
   * 制包编号列表
   * @returns any
   */
  export async function list(params?: QueryParams) {
    return requestClient.get<Item[]>('/admin/vaccination-record/vr-mb-sn', {
      params,
    });
  }

  /**
   * 外来菌包编号列表
   * @returns any
   */
  export async function splist(params?: QueryParams) {
    return requestClient.get<Item[]>('/admin/strain-purchase/mb-sn', {
      params,
    });
  }
}
