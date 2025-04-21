export const LoginColumn: any = [
  { title: '序号', align: 'center', type: 'seq', width: 70 },
  { title: '登录账号', field: 'username', align: 'center' },
  { title: '客户端IP', field: 'client_ip', align: 'center' },
  { title: '浏览器', field: 'browser', align: 'center' },
  { title: '操作系统', field: 'os_name', align: 'center' },
  { title: '登录地址', field: 'address', align: 'center' },
  { title: '登录时间', field: 'login_at', align: 'center' },
  {
    title: '登录状态',
    field: 'result_code',
    align: 'center',
    slots: { default: 'resultCode' },
  },
];
