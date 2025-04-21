import type { TableColumnType } from 'ant-design-vue';

import type { PositionItem } from './type';

export const PositionColumn: TableColumnType<PositionItem>[] = [
  { title: '职务名称', dataIndex: 'name', align: 'left' },
  { title: '职务编码', dataIndex: 'code', align: 'center' },
  { title: '状态', dataIndex: 'status', align: 'center' },
  { title: '排序', dataIndex: 'sorting', align: 'center' },
  { title: '备注', dataIndex: 'remark', align: 'center' },
  {
    title: '操作',
    dataIndex: 'action',
    align: 'center',
    width: '200px',
    fixed: 'right',
  },
];
