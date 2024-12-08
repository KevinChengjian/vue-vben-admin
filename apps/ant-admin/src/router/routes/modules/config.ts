import type { RouteRecordRaw } from 'vue-router';

import { BasicLayout } from '#/layouts';

const routes: RouteRecordRaw[] = [
  {
    component: BasicLayout,
    meta: {
      icon: 'lucide:area-chart',
      order: -1,
      title: '配置管理',
    },
    name: 'Config',
    path: '/config',
    children: [
      {
        name: 'Dict',
        path: '/config/dict',
        component: () => import('#/views/config/dict/index.vue'),
        meta: {
          icon: 'lucide:area-chart',
          title: '字典管理',
        },
      },
    ],
  },
];

export default routes;
