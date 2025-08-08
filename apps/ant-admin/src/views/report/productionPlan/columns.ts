import { Dict } from '#/api';

export const TableColumn: any = [
  {
    title: '日期',
    field: 'day',
    align: 'center',
    minWidth: 90,
  },
  {
    title: '做陪养基',
    field: 'mc',
    align: 'center',
    minWidth: 80,
  },
  {
    title: '接瓶',
    field: 'bottled_num',
    align: 'center',
    minWidth: 80,
  },
  {
    field: 'variety_id',
    title: '品种',
    align: 'center',
    minWidth: 90,
    cellRender: { name: 'dict', code: Dict.KeyEnum.STRAIN_CATEGORY },
  },
  {
    title: '做罐',
    field: 'make_can',
    align: 'center',
    minWidth: 80,
  },
  {
    title: '接罐',
    field: 'vc_can',
    align: 'center',
    minWidth: 80,
  },
  {
    title: '生产',
    field: 'production',
    align: 'center',
    minWidth: 80,
  },
  {
    title: '生产接种',
    field: 'production_vc',
    align: 'center',
    minWidth: 160,
  },
  {
    title: '备注',
    field: 'remark',
    align: 'center',
    minWidth: 160,
  },
  {
    title: '操作',
    field: 'action',
    align: 'center',
    minWidth: 110,
    fixed: 'right',
    slots: { default: 'action' },
  },
];
