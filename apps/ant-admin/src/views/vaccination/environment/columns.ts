import { Dict } from '#/api';

export const TableColumn: any = [
  { title: '序号', align: 'center', type: 'seq', minWidth: 60 },
  {
    title: '检测区域',
    field: 'region_id',
    align: 'center',
    cellRender: { name: 'dict', code: Dict.KeyEnum.ENV_REGION },
    minWidth: 120,
  },
  {
    title: '检测点位',
    field: 'point_id',
    align: 'center',
    cellRender: { name: 'dict', code: Dict.KeyEnum.ENV_POINT },
    minWidth: 120,
  },
  {
    title: '甩柜绿霉',
    field: 'sgl_mildew',
    align: 'center',
    minWidth: 105,
  },
  {
    title: '青霉',
    field: 'q_mildew',
    align: 'center',
    minWidth: 105,
  },
  {
    title: '链孢霉',
    field: 'lp_mildew',
    align: 'center',
    minWidth: 105,
  },
  {
    title: '跟霉',
    field: 'g_mildew',
    align: 'center',
    minWidth: 105,
  },
  {
    title: '毛霉',
    field: 'm_mildew',
    align: 'center',
    minWidth: 105,
  },
  {
    title: '黄曲霉',
    field: 'h_mildew',
    align: 'center',
    minWidth: 105,
  },
  {
    title: '备注',
    field: 'remark',
    align: 'center',
    minWidth: 195,
  },
  {
    title: '检测人员',
    field: 'nickname',
    align: 'center',
    minWidth: 120,
  },
  {
    title: '检测日期',
    field: 'check_at',
    align: 'center',
    minWidth: 135,
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
