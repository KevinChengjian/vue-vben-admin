import { Dict } from '#/api';

export const TableColumn: any = [
  { title: '序号', align: 'center', type: 'seq', minWidth: 60 },
  {
    title: '菌包编号',
    field: 'mb_sn',
    align: 'center',
    minWidth: 200,
  },
  {
    title: '接种日期',
    field: 'vaccination_at',
    align: 'center',
    minWidth: 110,
  },
  {
    title: '菌龄',
    field: 'strain_age',
    align: 'center',
    minWidth: 90,
  },
  {
    title: '配方',
    field: 'formulaName',
    align: 'center',
    minWidth: 100,
  },
  {
    title: '品种',
    field: 'variety_id',
    align: 'center',
    cellRender: { name: 'dict', code: Dict.KeyEnum.STRAIN_CATEGORY },
    minWidth: 90,
  },
  {
    title: '水份/%',
    field: 'moisture',
    headerAlign: 'center',
    children: [
      {
        title: '上',
        field: 'upper_moisture',
        align: 'center',
        cellRender: { name: 'percent' },
        minWidth: 80,
      },
      {
        title: '中',
        field: 'middle_moisture',
        align: 'center',
        cellRender: { name: 'percent' },
        minWidth: 80,
      },
      {
        title: '下',
        field: 'lower_moisture',
        align: 'center',
        cellRender: { name: 'percent' },
        minWidth: 80,
      },
    ],
  },
  {
    title: 'PH',
    field: 'ph',
    headerAlign: 'center',
    children: [
      {
        title: '上',
        field: 'upper_ph',
        align: 'center',
        cellRender: { name: 'number' },
        minWidth: 80,
      },
      {
        title: '中',
        field: 'middle_ph',
        align: 'center',
        cellRender: { name: 'number' },
        minWidth: 80,
      },
      {
        title: '下',
        field: 'lower_ph',
        align: 'center',
        cellRender: { name: 'number' },
        minWidth: 80,
      },
    ],
  },
  {
    title: '记录人员',
    field: 'nickname',
    align: 'center',
    minWidth: 90,
  },
  {
    title: '备注',
    field: 'remark',
    align: 'center',
    minWidth: 150,
  },
  {
    title: '检测日期',
    field: 'check_at',
    align: 'center',
    minWidth: 90,
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
