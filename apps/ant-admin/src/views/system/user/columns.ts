import { Dict } from '#/api';

export const UserColumn: any = [
  { title: '序号', align: 'center', type: 'seq', minWidth: 60 },
  { title: '用户名称', field: 'nickname', align: 'center', minWidth: 150 },
  { title: '登录账号', field: 'username', align: 'center', minWidth: 150 },
  { title: '手机号码', field: 'phone', align: 'center', minWidth: 150 },
  { title: '邮箱', field: 'email', align: 'center', minWidth: 150 },
  {
    title: '状态',
    field: 'status',
    align: 'center',
    cellRender: { name: 'dict', code: Dict.KeyEnum.STATUS },
    minWidth: 150,
  },
  { title: '部门', field: 'deptName', align: 'center', minWidth: 150 },
  { title: '岗位', field: 'positionName', align: 'center', minWidth: 135 },
  { title: '备注', field: 'remark', align: 'center', minWidth: 150 },
  {
    title: '操作',
    field: 'action',
    align: 'center',
    fixed: 'right',
    slots: { default: 'action' },
    minWidth: 165,
  },
];
