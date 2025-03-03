import type { TableColumnType } from 'ant-design-vue';

import type { DeptItem } from './dept.type';

export const DeptColumn: TableColumnType<DeptItem>[] = [
  { title: '组织名称', dataIndex: 'name', align: 'left', width: '25%' },
  { title: '组织编码', dataIndex: 'code', align: 'center', width: '12' },
  { title: '组织类型', dataIndex: 'type', align: 'center', width: '12' },
  {
    title: '负责人',
    dataIndex: 'director_text',
    align: 'center',
    width: '8',
  },
  // { title: '人数', dataIndex: 'user_num', align: 'center', width: '%' },
  { title: '状态', dataIndex: 'status', align: 'center', width: '8' },
  { title: '排序', dataIndex: 'sorting', align: 'center', width: '8' },
  { title: '备注', dataIndex: 'remark', align: 'center', width: '12' },
  {
    title: '操作',
    dataIndex: 'action',
    align: 'center',
    width: '200px',
    fixed: 'right',
  },
];
