import { requestClient } from '#/api/request';

export namespace Fruiting {
  export interface QueryParams {
    keyword?: string;
  }

  export interface Item {
    fruiting_sn: string;
    room_id: string;
    label: string;
    value: string;
  }

  /**
   * 出菇编号列表
   * @returns any
   */
  export async function list(params?: QueryParams) {
    return requestClient.get<Item[]>('/admin/fruiting/fruiting-sn', {
      params,
    });
  }
}
