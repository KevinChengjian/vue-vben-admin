import { requestClient } from '#/api/request';

export namespace Material {
  export interface QueryParams {
    keyword?: string;
  }

  /**
   * 获取原料编号列表
   * @param params
   */
  export async function materialSnList(params?: QueryParams) {
    return requestClient.get<{ label: string; value: string }[]>(
      '/admin/material-in/material-sn-list',
      {
        params,
      },
    );
  }

  /**
   * 生产原料编号
   */
  export async function materialSn() {
    return requestClient.get<string>('/admin/material-in/material-sn');
  }

  /**
   * 获取编号下的原料
   */
  export async function materialIds(params?: QueryParams) {
    return requestClient.get<string>('/admin/material-in/material-ids', {
      params,
    });
  }
}
