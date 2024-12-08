import type { TableColumnType } from 'ant-design-vue';

import type { DeptItem } from './dept.type';

export const DeptColumn: TableColumnType<DeptItem>[] = [
  { title: '组织名称', dataIndex: 'name', align: 'center' },
  { title: '组织编码', dataIndex: 'code', align: 'center' },
  { title: '组织类型', dataIndex: 'type_text', align: 'center' },
  { title: '负责人', dataIndex: 'director_text', align: 'center' },
  { title: '员工人数', dataIndex: 'user_num', align: 'center' },
  { title: '组织状态', dataIndex: 'user_num', align: 'center' },
  { title: '组织备注', dataIndex: 'remark', align: 'center' },
];
