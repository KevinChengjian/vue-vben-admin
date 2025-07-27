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
    field: 'vr_at',
    align: 'center',
    minWidth: 100,
  },
  {
    title: '菌龄',
    field: 'strain_age',
    align: 'center',
    minWidth: 100,
  },
  {
    title: '养菌房',
    field: 'warehouse_id',
    align: 'center',
    minWidth: 75,
    cellRender: { name: 'dict', code: Dict.KeyEnum.STRAIN_HOUSE },
  },
  {
    title: '菌种',
    field: 'variety_id',
    align: 'center',
    cellRender: { name: 'dict', code: Dict.KeyEnum.STRAIN_CATEGORY },
    minWidth: 105,
  },
  {
    title: '配方',
    field: 'formulaName',
    align: 'center',
    minWidth: 105,
  },
  {
    title: '含水量%',
    field: 'moisture',
    headerAlign: 'center',
    children: [
      {
        title: '上',
        field: 'upper_moisture',
        align: 'center',
        cellRender: { name: 'number' },
        minWidth: 75,
      },
      {
        title: '中',
        field: 'middle_moisture',
        align: 'center',
        cellRender: { name: 'number' },
        minWidth: 75,
      },
      {
        title: '下',
        field: 'lower_moisture',
        align: 'center',
        cellRender: { name: 'number' },
        minWidth: 75,
      },
    ],
  },
  {
    title: 'PH值',
    field: 'ph_value',
    headerAlign: 'center',
    children: [
      {
        title: '上',
        field: 'upper_ph',
        align: 'center',
        cellRender: { name: 'number' },
        minWidth: 75,
      },
      {
        title: '中',
        field: 'middle_ph',
        align: 'center',
        cellRender: { name: 'number' },
        minWidth: 75,
      },
      {
        title: '下',
        field: 'lower_ph',
        align: 'center',
        cellRender: { name: 'number' },
        minWidth: 75,
      },
    ],
  },

  {
    title: '出菇编号',
    field: 'fruiting_sn',
    align: 'center',
    minWidth: 105,
  },
  {
    title: '上架时间',
    field: 'put_at',
    align: 'center',
    minWidth: 105,
  },
  {
    title: '下架时间',
    field: 'out_at',
    align: 'center',
    minWidth: 105,
  },
  {
    title: '上架包数',
    field: 'co_put_num',
    align: 'center',
    minWidth: 105,
  },

  {
    title: '产量(斤)',
    field: 'cl',
    headerAlign: 'center',
    children: [
      {
        title: '总',
        field: 'co_amount',
        align: 'center',
        cellRender: { name: 'number' },
        minWidth: 75,
      },
      {
        title: 'A菇',
        field: 'co_a_amount',
        align: 'center',
        cellRender: { name: 'number' },
        minWidth: 75,
      },
    ],
  },
  {
    title: 'A菇率',
    field: 'co_a_rate',
    align: 'center',
    minWidth: 90,
    cellRender: { name: 'percent' },
  },
  {
    title: '产单包产量(斤)',
    field: 'dbcl',
    headerAlign: 'center',
    children: [
      {
        title: '总',
        field: 'co_sp_num',
        align: 'center',
        cellRender: { name: 'number' },
        minWidth: 75,
      },
      {
        title: 'A菇',
        field: 'co_asp_num',
        align: 'center',
        cellRender: { name: 'number' },
        minWidth: 75,
      },
    ],
  },
  {
    title: '实验',
    field: 'experiment',
    align: 'center',
    minWidth: 105,
  },
];
