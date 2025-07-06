import type { TableColumnType } from 'ant-design-vue';

import type { DictValueItem } from './value.type';

export const DictValueColumn: TableColumnType<DictValueItem>[] = [
  { title: '字典编码', dataIndex: 'code', align: 'center', width: '12%' },
  { title: '数据名', dataIndex: 'label', align: 'center', width: '12%' },
  {
    title: '数据值',
    dataIndex: 'value',
    align: 'center',
    width: '12%',
    sorter: true,
  },
  { title: '状态', dataIndex: 'status', align: 'center', width: '12%' },
  // { title: '默认', dataIndex: 'default', align: 'center', width: '12%' },
  {
    title: '排序',
    dataIndex: 'sorting',
    align: 'center',
    width: '12%',
    sorter: true,
  },
  { title: '备注', dataIndex: 'remark', align: 'center', width: '15%' },
  { title: '操作', dataIndex: 'action', align: 'center', width: '13%' },
];
