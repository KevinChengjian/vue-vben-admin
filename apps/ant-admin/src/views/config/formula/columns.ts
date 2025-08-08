import { Dict } from '#/api';

export const TableColumn: any = [
  { title: '序号', align: 'center', type: 'seq', width: 70 },
  { title: '名称', field: 'name', align: 'center', minWidth: 140 },
  {
    title: '状态',
    field: 'status',
    align: 'center',
    cellRender: { name: 'dict', code: Dict.KeyEnum.STATUS },
    minWidth: 50,
  },
  { title: '原料', field: 'material_txt', align: 'center', minWidth: 350 },
  { title: '备注', field: 'remark', align: 'center', minWidth: 150 },
  {
    title: '水份',
    field: 'moisture',
    align: 'center',
    cellRender: { name: 'percent' },
    minWidth: 50,
  },
  {
    title: '排序',
    field: 'sorting',
    align: 'center',
    minWidth: 50,
  },

  { title: '创建人', field: 'nickname', align: 'center', minWidth: 60 },
  { title: '创建时间', field: 'created_at', align: 'center', minWidth: 120 },
  {
    title: '操作',
    field: 'action',
    align: 'center',
    width: 160,
    fixed: 'right',
    slots: { default: 'action' },
  },
];
