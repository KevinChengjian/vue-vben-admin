import { Dict } from '#/api';

export const TableColumn: any = [
  // { title: '序号', align: 'center', type: 'seq', minWidth: 60 },
  {
    title: '日期',
    field: 'out_at',
    align: 'center',
    minWidth: 100,
  },
  {
    title: '菌包编号',
    field: 'mb_sn',
    align: 'center',
    minWidth: 240,
    slots: { default: 'mb_sn' },
  },
  {
    title: '出菇编号',
    field: 'fruiting_sn',
    align: 'center',
    minWidth: 150,
    slots: { default: 'fruiting_sn' },
  },
  {
    title: '品种',
    field: 'variety_id',
    align: 'center',
    cellRender: { name: 'dict', code: Dict.KeyEnum.STRAIN_CATEGORY },
    minWidth: 100,
  },
  {
    title: '配方',
    field: 'formulaName',
    align: 'center',
    minWidth: 100,
  },
  {
    title: '养菌房',
    field: 'warehouse',
    align: 'center',
    slots: { default: 'warehouse' },
    minWidth: 120,
  },
  {
    title: '出库',
    field: 'out',
    headerAlign: 'center',
    children: [
      {
        title: '数量',
        field: 'num',
        align: 'center',
        cellRender: { name: 'number' },
        minWidth: 120,
      },
      {
        title: '养菌期',
        field: 'strain_age',
        align: 'center',
        cellRender: { name: 'number' },
        minWidth: 120,
      },
      {
        title: '出菇房',
        field: 'room_id',
        align: 'center',
        cellRender: { name: 'dict', code: Dict.KeyEnum.FRUITING_HOUSE },
        minWidth: 120,
      },
    ],
  },
  {
    title: '备注',
    field: 'remark',
    align: 'center',
    minWidth: 180,
  },
];
