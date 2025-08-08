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
    title: '检测日期',
    field: 'check_at',
    align: 'center',
    minWidth: 120,
  },
  {
    title: '灭菌柜',
    field: 'ark_id',
    align: 'center',
    cellRender: { name: 'dict', code: Dict.KeyEnum.STERILIZER_CABINET },
    minWidth: 100,
  },
  {
    title: '水份/%',
    field: 'moisture',
    headerAlign: 'center',
    children: [
      {
        title: '前排',
        field: 'upper_moisture',
        align: 'center',
        cellRender: { name: 'number' },
        minWidth: 80,
      },
      {
        title: '中间',
        field: 'middle_moisture',
        align: 'center',
        cellRender: { name: 'number' },
        minWidth: 80,
      },
      {
        title: '后排',
        field: 'lower_moisture',
        align: 'center',
        cellRender: { name: 'number' },
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
        title: '前排',
        field: 'upper_ph',
        align: 'center',
        cellRender: { name: 'number' },
        minWidth: 80,
      },
      {
        title: '中间',
        field: 'middle_ph',
        align: 'center',
        cellRender: { name: 'number' },
        minWidth: 80,
      },
      {
        title: '后排',
        field: 'lower_ph',
        align: 'center',
        cellRender: { name: 'number' },
        minWidth: 80,
      },
    ],
  },
  {
    title: '重量/kg',
    field: 'weight',
    headerAlign: 'center',
    children: [
      {
        title: '前排',
        field: 'upper_weight',
        align: 'center',
        cellRender: { name: 'number' },
        minWidth: 80,
      },
      {
        title: '中间',
        field: 'middle_weight',
        align: 'center',
        cellRender: { name: 'number' },
        minWidth: 80,
      },
      {
        title: '后排',
        field: 'lower_weight',
        align: 'center',
        cellRender: { name: 'number' },
        minWidth: 80,
      },
    ],
  },
  {
    title: '高度/m',
    field: 'height',
    headerAlign: 'center',
    children: [
      {
        title: '前排',
        field: 'upper_height',
        align: 'center',
        cellRender: { name: 'number' },
        minWidth: 80,
      },

      {
        title: '中间',
        field: 'middle_height',
        align: 'center',
        cellRender: { name: 'number' },
        minWidth: 80,
      },
      {
        title: '后排',
        field: 'lower_height',
        align: 'center',
        cellRender: { name: 'number' },
        minWidth: 80,
      },
    ],
  },
  {
    title: '检测人员',
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
    title: '操作',
    field: 'action',
    align: 'center',
    minWidth: 120,
    fixed: 'right',
    slots: { default: 'action' },
  },
];
