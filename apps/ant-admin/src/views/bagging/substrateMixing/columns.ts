export const TableColumn: any = [
  { title: '序号', align: 'center', type: 'seq', minWidth: 60 },
  {
    title: '制包编号',
    field: 'make_bag_sn',
    align: 'center',
    minWidth: 150,
  },
  {
    title: '制包日期',
    field: 'make_at',
    align: 'center',
    minWidth: 150,
  },
  {
    title: '配方',
    field: 'formula_name',
    align: 'center',
    minWidth: 120,
  },
  {
    title: '罐数',
    field: 'can_num',
    align: 'center',
    minWidth: 105,
    cellRender: { name: 'number' },
  },
  {
    title: '检测人员',
    field: 'nickname',
    align: 'center',
    minWidth: 105,
  },
  {
    title: '备注',
    field: 'remark',
    align: 'center',
    minWidth: 180,
  },
  // {
  //   title: '创建时间',
  //   field: 'created_at',
  //   align: 'center',
  //   minWidth: 135,
  // },
  {
    title: '操作',
    field: 'action',
    align: 'center',
    minWidth: 120,
    fixed: 'right',
    slots: { default: 'action' },
  },
];
