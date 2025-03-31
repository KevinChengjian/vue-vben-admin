import { Dict } from '#/api';

export const UserColumn: any = [
  { title: '序号', align: 'center', type: 'seq', width: 70 },
  { title: '用户名称', field: 'nickname', align: 'center' },
  { title: '登录账号', field: 'username', align: 'center' },
  { title: '手机号码', field: 'phone', align: 'center' },
  { title: '邮箱', field: 'email', align: 'center' },
  {
    title: '状态',
    field: 'status',
    align: 'center',
    cellRender: { name: 'dict', code: Dict.KeyEnum.STATUS },
  },
  { title: '所在部门', field: 'deptName', align: 'center' },
  { title: '所在岗位', field: 'positionName', align: 'center' },
  {
    title: '操作',
    field: 'action',
    align: 'center',
    width: 160,
    fixed: 'right',
    slots: { default: 'action' },
  },
];
