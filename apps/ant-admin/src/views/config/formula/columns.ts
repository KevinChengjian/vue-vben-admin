import { Dict } from '#/api';

export const TableColumn: any = [
  { title: '序号', align: 'center', type: 'seq', width: 70 },
  { title: '名称', field: 'name', align: 'center' },
  {
    title: '状态',
    field: 'status',
    align: 'center',
    cellRender: { name: 'dict', code: Dict.KeyEnum.STATUS },
  },
  { title: '备注', field: 'remark', align: 'center' },
  {
    title: '水份',
    field: 'moisture',
    align: 'center',
    cellRender: { name: 'percent' },
  },
  { title: '原料', field: 'material_txt', align: 'center' },
  { title: '创建人', field: 'nickname', align: 'center' },
  { title: '创建时间', field: 'created_at', align: 'center' },
  {
    title: '操作',
    field: 'action',
    align: 'center',
    width: 160,
    fixed: 'right',
    slots: { default: 'action' },
  },
];
