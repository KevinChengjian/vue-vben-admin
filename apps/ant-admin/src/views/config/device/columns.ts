import { Dict } from '#/api';

export const TableColumn: any = [
  { title: '序号', align: 'center', type: 'seq', width: 70 },
  { title: '名称', field: 'alias', align: 'center' },
  { title: '序列号', field: 'box_no', align: 'center' },
  {
    title: '养菌房',
    field: 'sh_id',
    align: 'center',
    cellRender: { name: 'dict', code: Dict.KeyEnum.STRAIN_HOUSE },
  },
  {
    title: '设备状态',
    field: 'state',
    align: 'center',
    slots: { default: 'state' },
  },
  { title: '备注', field: 'remark', align: 'center' },

  {
    title: '操作',
    field: 'action',
    align: 'center',
    width: 160,
    fixed: 'right',
    slots: { default: 'action' },
  },
];
