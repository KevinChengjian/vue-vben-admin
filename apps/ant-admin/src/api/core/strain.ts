import { requestClient } from '#/api/request';

export namespace Strain {
  export interface QueryParams {
    keyword?: string;
  }

  export interface Item {
    id: number;
    strain_sn: string;
    can_no: string;
    variety_id: string;
    variety: string;
    identify_variety_id: string;
    hour: number;
    label: string;
    value: string;
  }

  /**
   * 制包编号列表
   * @returns any
   */
  export async function list(params?: QueryParams) {
    return requestClient.get<Item[]>('/admin/strain/all', {
      params,
    });
  }
}
