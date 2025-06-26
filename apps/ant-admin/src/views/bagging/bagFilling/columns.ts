import { Dict } from '#/api';

export const TableColumn: any = [
  { title: '序号', align: 'center', type: 'seq', minWidth: 60 },
  {
    title: '制包编号',
    field: 'make_bag_sn',
    align: 'center',
    minWidth: 150,
  },
  {
    title: '配方',
    field: 'formula_name',
    align: 'center',
    minWidth: 120,
  },
  {
    title: '装袋机器',
    field: 'machine_id',
    align: 'center',
    cellRender: { name: 'dict', code: Dict.KeyEnum.BAG_MACHINE },
    minWidth: 120,
  },
  {
    title: '装袋数量',
    field: 'num',
    align: 'center',
    minWidth: 105,
    cellRender: { name: 'number' },
  },
  {
    title: '菌棒重量',
    field: 'weight',
    align: 'center',
    minWidth: 105,
    cellRender: { name: 'number' },
  },
  {
    title: '中孔深度',
    field: 'depth',
    align: 'center',
    minWidth: 105,
    cellRender: { name: 'number' },
  },
  {
    title: '菌棒高度',
    field: 'height',
    align: 'center',
    minWidth: 105,
    cellRender: { name: 'number' },
  },
  {
    title: '菌包松紧度',
    field: 'price',
    align: 'center',
    minWidth: 120,
  },
  {
    title: '备注',
    field: 'remark',
    align: 'center',
    minWidth: 225,
  },
  {
    title: '创建时间',
    field: 'created_at',
    align: 'center',
    minWidth: 135,
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
