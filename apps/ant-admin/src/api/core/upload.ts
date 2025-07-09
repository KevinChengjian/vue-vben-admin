import { requestClient } from '#/api/request';

export namespace Resource {
  export interface FileItem {
    id: number;
    url: string;
  }

  export interface Props {
    file?: FileItem[];
    multiple?: boolean;
    max?: number;
    edit?: boolean;
  }

  /**
   * 图片上传
   */
  export async function uploadApi(params: any, config: any = {}) {
    return requestClient.upload<FileItem>(
      '/admin/upload/image',
      params,
      config,
    );
  }

  /**
   * 图片列表
   */
  export async function fileListApi(params: any) {
    return requestClient.post<FileItem[]>('/admin/upload/urls', params);
  }
}
