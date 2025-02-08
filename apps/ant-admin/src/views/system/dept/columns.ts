import type { TableColumnType } from 'ant-design-vue';

import type { DeptItem } from './dept.type';

export const DeptColumn: TableColumnType<DeptItem>[] = [
  { title: '组织名称', dataIndex: 'name', align: 'left', width: '24%' },
  { title: '组织编码', dataIndex: 'code', align: 'center', width: '11%' },
  { title: '组织类型', dataIndex: 'type_text', align: 'center', width: '11%' },
  {
    title: '负责人',
    dataIndex: 'director_text',
    align: 'center',
    width: '10%',
  },
  { title: '员工人数', dataIndex: 'user_num', align: 'center', width: '11%' },
  { title: '组织状态', dataIndex: 'status', align: 'center', width: '11%' },
  { title: '组织备注', dataIndex: 'remark', align: 'center', width: '11%' },
  { title: '操作', dataIndex: 'action', align: 'center', width: '11%' },
];
