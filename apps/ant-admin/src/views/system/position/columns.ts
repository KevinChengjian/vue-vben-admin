import type { TableColumnType } from 'ant-design-vue';

import type { PositionItem } from './type';

export const PositionColumn: TableColumnType<PositionItem>[] = [
  { title: '职务名称', dataIndex: 'name', align: 'left', width: '15' },
  { title: '职务编码', dataIndex: 'code', align: 'center', width: '10' },
  { title: '状态', dataIndex: 'status', align: 'center', width: '10' },
  { title: '排序', dataIndex: 'sorting', align: 'center', width: '10' },
  { title: '备注', dataIndex: 'remark', align: 'center', width: '10' },
  {
    title: '操作',
    dataIndex: 'action',
    align: 'center',
    width: '200px',
    fixed: 'right',
  },
];
