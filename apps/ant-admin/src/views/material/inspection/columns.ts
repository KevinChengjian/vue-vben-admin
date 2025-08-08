import { Dict } from '#/api';

export const TableColumn: any = [
  { title: '序号', align: 'center', type: 'seq', minWidth: 60 },
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
    title: '检测人员',
    field: 'nickname',
    align: 'center',
    minWidth: 105,
  },
  {
    title: '检测时间',
    field: 'detection_at',
    align: 'center',
    minWidth: 120,
  },
  {
    title: '检测机器',
    field: 'machine_id',
    align: 'center',
    cellRender: { name: 'dict', code: Dict.KeyEnum.MATERIAL_MACHINE },
    minWidth: 105,
  },
  {
    title: '水份',
    field: 'moisture',
    align: 'center',
    minWidth: 120,
    cellRender: { name: 'percent' },
  },
  {
    title: 'PH',
    field: 'ph',
    align: 'center',
    minWidth: 120,
    cellRender: { name: 'number' },
  },
  {
    title: '含碳量/%',
    field: 'protein',
    align: 'center',
    minWidth: 120,
    cellRender: { name: 'percent' },
  },
  {
    title: '含氮量',
    field: 'nitrogen',
    align: 'center',
    minWidth: 120,
    cellRender: { name: 'percent' },
  },
  {
    title: '备注',
    field: 'remark',
    align: 'center',
    minWidth: 210,
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
