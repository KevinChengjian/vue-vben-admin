export const TableColumn: any = [
  { title: '序号', align: 'center', type: 'seq', width: 70 },
  { title: '名称', field: 'material', align: 'center' },
  // { title: '规格', field: 'spec', align: 'center' },
  { title: '单位', field: 'unit', align: 'center' },

  {
    title: '库存',
    field: 'store',
    headerAlign: 'center',
    children: [
      { title: '盘库', field: 'reality_num', align: 'center' },
      { title: '库存', field: 'inventory', align: 'center' },
      {
        title: '库存金额(元)',
        field: 'amount',
        align: 'center',
        cellRender: { name: 'money' },
      },
    ],
  },

  {
    title: '入库',
    field: 'in',
    headerAlign: 'center',
    children: [
      {
        title: '期初库存',
        field: 'surplus',
        align: 'center',
        cellRender: { name: 'number' },
      },
      {
        title: '期初金额(元)',
        field: 'surplus_money',
        align: 'center',
        cellRender: { name: 'number' },
      },
      {
        title: '入库数量',
        field: 'in_num',
        align: 'center',
        cellRender: { name: 'number' },
      },
      {
        title: '入库金额(元)',
        field: 'in_money',
        align: 'center',
        cellRender: { name: 'money' },
      },
    ],
  },
  {
    title: '出库',
    field: 'out',
    headerAlign: 'center',
    children: [
      {
        title: '出库数量',
        field: 'out_num',
        align: 'center',
        cellRender: { name: 'number' },
      },
      {
        title: '出库金额(元)',
        field: 'out_money',
        align: 'center',
        cellRender: { name: 'money' },
      },
    ],
  },
];
