import { requestClient } from '#/api/request';

export namespace Formula {
  export interface Item {
    id: number;
    name: string;
    label: string;
    value: number;
  }

  /**
   * 配方名列表
   * @returns any
   */
  export async function list() {
    return requestClient.get<Item[]>('/admin/formula/all');
  }
}
