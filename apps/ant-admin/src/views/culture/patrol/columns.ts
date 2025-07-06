import { Dict } from '#/api';

export const TableColumn: any = [
  { title: '序号', align: 'center', type: 'seq', minWidth: 60 },
  {
    title: '巡库日期',
    field: 'patrol_at',
    align: 'center',
    minWidth: 120,
  },
  {
    title: '菌包编号',
    field: 'mb_sn',
    align: 'center',
    minWidth: 120,
  },
  {
    title: '养菌房',
    field: 'warehouse_id',
    align: 'center',
    cellRender: { name: 'dict', code: Dict.KeyEnum.STRAIN_HOUSE },
    minWidth: 90,
  },

  {
    title: '库内设定',
    field: 'house',
    headerAlign: 'center',
    children: [
      {
        title: '库温(℃)',
        field: 'set_temperature',
        align: 'center',
        cellRender: { name: 'number' },
        minWidth: 75,
      },
      {
        title: '二氧化碳',
        field: 'set_cd',
        align: 'center',
        cellRender: { name: 'number' },
        minWidth: 75,
      },
      {
        title: '湿度',
        field: 'set_humidity',
        align: 'center',
        cellRender: { name: 'number' },
        minWidth: 75,
      },
    ],
  },
  {
    title: '库内实测',
    field: 'reality',
    headerAlign: 'center',
    children: [
      {
        title: '库温(℃)',
        field: 'reality_temperature',
        align: 'center',
        cellRender: { name: 'number' },
        minWidth: 75,
      },
      {
        title: '二氧化碳',
        field: 'reality_cd',
        align: 'center',
        cellRender: { name: 'number' },
        minWidth: 75,
      },
      {
        title: '湿度',
        field: 'reality_humidity',
        align: 'center',
        cellRender: { name: 'number' },
        minWidth: 75,
      },
    ],
  },
  {
    title: '天气情况',
    field: 'weather_info',
    headerAlign: 'center',
    children: [
      {
        title: '高温',
        field: 'max_t',
        align: 'center',
        cellRender: { name: 'number' },
        minWidth: 75,
      },

      {
        title: '低温',
        field: 'min_t',
        align: 'center',
        cellRender: { name: 'number' },
        minWidth: 75,
      },
      {
        title: '湿度',
        field: 'humidity',
        align: 'center',
        cellRender: { name: 'number' },
        minWidth: 75,
      },
      {
        title: '天气',
        field: 'weather',
        align: 'center',
        minWidth: 75,
      },
    ],
  },
  {
    title: '发菌',
    field: 'fh_id',
    align: 'center',
    cellRender: { name: 'dict', code: Dict.KeyEnum.STRAIN_STATE },
    minWidth: 90,
  },
  {
    title: '保温',
    field: 'bag_t',
    align: 'center',
    minWidth: 90,
  },
  {
    title: '菌龄',
    field: 'strain_age',
    align: 'center',
    minWidth: 90,
  },
  {
    title: '后熟',
    field: 'postripeness',
    align: 'center',
    minWidth: 90,
  },
  {
    title: '巡库人员',
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
