import { Dict } from '#/api';

export const TableColumn: any = [
  {
    title: '日期',
    field: 'day',
    align: 'center',
    minWidth: 90,
  },
  {
    title: '拌料桶数',
    field: 'bucket_num',
    align: 'center',
    minWidth: 100,
  },
  {
    title: '计划制包',
    field: 'plan',
    headerAlign: 'center',
    children: [
      {
        field: 'plan_num',
        title: '数量',
        align: 'center',
        minWidth: 90,
      },
      {
        field: 'formulaName',
        title: '配方',
        align: 'center',
        minWidth: 90,
      },
      {
        field: 'plan_variety_id',
        title: '接种',
        align: 'center',
        minWidth: 90,
        cellRender: { name: 'dict', code: Dict.KeyEnum.STRAIN_CATEGORY },
      },
      {
        field: 'plan_type',
        title: '常规/试验',
        align: 'center',
        cellRender: { name: 'dict', code: Dict.KeyEnum.VACCINATION_TYPE },
        minWidth: 90,
      },
    ],
  },
  {
    title: '实际生产',
    field: 'reality',
    headerAlign: 'center',
    children: [
      {
        field: 'reality_num',
        title: '数量',
        align: 'center',
        minWidth: 90,
      },
      {
        field: 'realityFormulaName',
        title: '配方',
        minWidth: 90,
      },
      {
        field: 'variety_id',
        title: '接种',
        minWidth: 90,
        cellRender: { name: 'dict', code: Dict.KeyEnum.STRAIN_CATEGORY },
      },
      {
        field: 'reality_at',
        title: '接种日期',
        align: 'center',
        minWidth: 90,
      },
      {
        field: 'put_num',
        title: '入库',
        align: 'center',
        minWidth: 90,
      },
      {
        field: 'vaccination_num',
        title: '库房接种数量',
        align: 'center',
        minWidth: 120,
      },
    ],
  },
  {
    title: '备注',
    field: 'remark',
    align: 'center',
    minWidth: 270,
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
