import { createVNode } from 'vue';

import { CircleAlert } from '@vben/icons';

import { message, Modal } from 'ant-design-vue';

interface DeleteProps<T> {
  api: any;
  key?: string;
  title?: string;
  desc?: string;
  callback: (params: T) => void;
}

export function useDelete<T>(props: DeleteProps<T>) {
  /**
   * 删除确认
   * @param params
   * @param record
   */
  function destory(params: any, record: T) {
    Modal.confirm({
      title: createVNode(
        'span',
        {
          class: `!text-destructive`,
        },
        props.title || `删除${props.key || '提示'}`,
      ),
      content: createVNode(
        'span',
        { class: `!text-destructive` },
        props.desc || `${props.key || '数据'}删除后不可恢复，是否确认删除？`,
      ),
      icon: createVNode(CircleAlert, {
        class: 'anticon anticon-exclamation-circle !text-destructive',
      }),
      cancelText: '取消',
      okText: '确认删除',
      okButtonProps: {
        type: 'primary',
        danger: true,
      },
      onOk: async () => {
        await props.api(params);
        message.success('删除成功');
        props.callback(record);
      },
    });
  }
  return { destory };
}
