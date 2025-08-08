import { Dict } from '#/api';

export const TableColumn: any = [
  { title: '序号', align: 'center', type: 'seq', minWidth: 60 },
  {
    title: '菌种编号',
    field: 'strain_sn',
    align: 'center',
    minWidth: 140,
  },
  {
    title: '罐号',
    field: 'can_no',
    align: 'center',
    minWidth: 80,
    cellRender: { name: 'dict', code: Dict.KeyEnum.STRAIN_CAN_NO },
  },
  {
    title: '培养日期',
    field: 'cultivate_at',
    align: 'center',
    minWidth: 120,
  },
  {
    title: '品种',
    field: 'identify_variety_id',
    align: 'center',
    minWidth: 105,
    cellRender: { name: 'dict', code: Dict.KeyEnum.STRAIN_CATEGORY },
  },
  {
    title: '培养时间/h',
    field: 'hour',
    align: 'center',
    minWidth: 90,
    cellRender: { name: 'number' },
  },
  {
    title: '菌种状态',
    field: 'state',
    align: 'center',
    minWidth: 150,
  },
  {
    title: '有无杂菌',
    field: 'varied_id',
    align: 'center',
    minWidth: 105,
    cellRender: { name: 'dict', code: Dict.KeyEnum.STRAIN_VARIED },
  },
  {
    title: '备注',
    field: 'remark',
    align: 'center',
    minWidth: 145,
  },
  {
    title: '操作',
    field: 'action',
    align: 'center',
    minWidth: 160,
    fixed: 'right',
    slots: { default: 'action' },
  },
];
