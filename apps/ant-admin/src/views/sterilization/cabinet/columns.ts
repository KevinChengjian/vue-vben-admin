import { Dict } from '#/api';

export const TableColumn: any = [
  { title: '序号', align: 'center', type: 'seq', minWidth: 60 },
  {
    title: '制包编号',
    field: 'make_bag_sn',
    align: 'center',
    minWidth: 160,
  },
  {
    title: '灭菌日期',
    field: 'check_at',
    align: 'center',
    minWidth: 120,
  },
  {
    title: '灭菌柜',
    field: 'ark_id',
    align: 'center',
    cellRender: { name: 'dict', code: Dict.KeyEnum.STERILIZER_CABINET },
    minWidth: 120,
  },
  {
    title: '灭菌时间/h',
    field: 'set_sterilization_time',
    align: 'center',
    minWidth: 120,
  },
  {
    title: '实际灭菌时间/h',
    field: 'sterilization_time',
    align: 'center',
    minWidth: 120,
  },
  {
    title: '灭菌温度/℃',
    field: 'temperature',
    align: 'center',
    cellRender: { name: 'number' },
    minWidth: 120,
  },
  {
    title: '灭菌程序',
    field: 'program',
    align: 'center',
    minWidth: 120,
  },
  {
    title: '温度压力/MPa',
    field: 'tp',
    align: 'center',
    cellRender: { name: 'number' },
    minWidth: 120,
  },
  {
    title: '检测人员',
    field: 'nickname',
    align: 'center',
    minWidth: 120,
  },
  {
    title: '备注',
    field: 'remark',
    align: 'center',
    minWidth: 180,
  },

  {
    title: '操作',
    field: 'action',
    align: 'center',
    minWidth: 120,
    fixed: 'right',
    slots: { default: 'action' },
  },
];
