import { Dict } from '#/api';

export const TableColumn: any = [
  { title: '序号', align: 'center', type: 'seq', minWidth: 60 },
  {
    title: '制包编号',
    field: 'make_bag_sn',
    align: 'center',
    minWidth: 90,
  },
  {
    title: '原料编号',
    field: 'material_sn',
    align: 'center',
    minWidth: 120,
  },
  {
    title: '原料名称',
    field: 'material_id',
    align: 'center',
    cellRender: { name: 'dict', code: Dict.KeyEnum.MATERIAL },
    minWidth: 150,
  },
  {
    title: '规格',
    field: 'spec_id',
    align: 'center',
    cellRender: { name: 'dict', code: Dict.KeyEnum.MATERIAL_SPEC },
    minWidth: 105,
  },
  {
    title: '数量',
    field: 'num',
    align: 'center',
    minWidth: 105,
    cellRender: { name: 'number' },
  },
  {
    title: '单位',
    field: 'unit_id',
    align: 'center',
    cellRender: { name: 'dict', code: Dict.KeyEnum.UNIT },
    minWidth: 105,
  },
  {
    title: '单价(元)',
    field: 'price',
    align: 'center',
    cellRender: { name: 'money' },
    minWidth: 105,
  },
  {
    title: '合计金额(元)',
    field: 'amount',
    align: 'center',
    cellRender: { name: 'money' },
    minWidth: 120,
  },
  {
    title: '备注',
    field: 'remark',
    align: 'center',
    minWidth: 150,
  },
  {
    title: '出库时间',
    field: 'created_at',
    align: 'center',
    minWidth: 150,
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
