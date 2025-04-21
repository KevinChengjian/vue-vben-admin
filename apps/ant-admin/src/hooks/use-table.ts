import type { VbenFormProps } from '#/adapter/form';
import type { VxeGridProps } from '#/adapter/vxe-table';

import { useVbenVxeGrid } from '#/adapter/vxe-table';

interface Props {
  colums: any[];
  api: any;
  searhcSchema?: any;
}

export function useTable(props: Props) {
  const formOptions: VbenFormProps = {
    wrapperClass: 'grid-cols-4',
    // 默认展开
    collapsed: false,
    schema: props.searhcSchema || [],
    // 控制表单是否显示折叠按钮
    showCollapseButton: false,
    // 是否在字段值改变时提交表单
    submitOnChange: false,
    // 按下回车时是否提交表单
    submitOnEnter: true,
    commonConfig: {
      labelWidth: 80,
    },
  };

  const gridOptions: VxeGridProps<any> = {
    columns: props.colums || [],
    keepSource: true,
    pagerConfig: {},
    proxyConfig: {
      ajax: {
        query: async ({ page }, formValues) => {
          return await props.api({
            page: page.currentPage,
            pageSize: page.pageSize,
            ...formValues,
          });
        },
      },
    },
  };

  return useVbenVxeGrid({ formOptions, gridOptions });
}
