export const TableColumn: any = [
  { title: '序号', align: 'center', type: 'seq', minWidth: 60 },
  {
    title: '养菌房',
    field: 'label',
    align: 'center',
    minWidth: 120,
    slots: { default: 'label' },
  },
  {
    title: '批次数',
    field: 'mb_sn_num',
    align: 'center',
    minWidth: 120,
    slots: { default: 'mb_sn_num' },
  },
  {
    title: '接种日期',
    field: 'vr_min_at',
    align: 'center',
    minWidth: 120,
  },
  {
    title: '总数量',
    field: 'put_total',
    align: 'center',
    minWidth: 120,
  },
  {
    title: '剩余量',
    field: 'bl_total',
    align: 'center',
    minWidth: 120,
  },
];
