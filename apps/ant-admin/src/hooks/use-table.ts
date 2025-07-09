import type { VbenFormProps } from '#/adapter/form';
import type { VxeGridProps } from '#/adapter/vxe-table';

import { useVbenVxeGrid } from '#/adapter/vxe-table';

interface Props extends VxeGridProps<any> {
  colums: any[];
  api: any;
  searhcSchema?: any;
  defaultQuery?: any;
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
    pagerConfig: {
      pageSize: 10,
      total: 0,
      currentPage: 1,
      pageSizes: [10, 15, 20, 30, 40, 50, 100],
    },
    seqConfig: {
      seqMethod({ $table, rowIndex }) {
        const pageSize = $table.xeGrid?.reactData.tablePage.pageSize || 15;
        const currentPage = $table.xeGrid?.reactData.tablePage.currentPage || 1;
        return (currentPage - 1) * pageSize + rowIndex + 1;
      },
    },
    proxyConfig: {
      ajax: {
        query: async ({ page, sort }, formValues) => {
          return await props.api({
            page: page.currentPage,
            pageSize: page.pageSize,
            sortField: sort.field,
            sortOrder: sort.order === 'asc' ? 'ascend' : 'descend',
            ...props.defaultQuery,
            ...formValues,
          });
        },
      },
      sort: true,
    },
    ...props,
  };

  return useVbenVxeGrid({ formOptions, gridOptions });
}
