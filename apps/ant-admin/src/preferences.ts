import { defineOverridesPreferences } from '@vben/preferences';

/**
 * @description 项目配置文件
 * 只需要覆盖项目中的一部分配置，不需要的配置不用覆盖，会自动使用默认配置
 * !!! 更改配置后请清空缓存，否则可能不生效
 */
export const overridesPreferences = defineOverridesPreferences({
  // overrides
  app: {
    accessMode: 'backend',
    name: import.meta.env.VITE_APP_TITLE,
    layout: 'sidebar-mixed-nav',
    enableCheckUpdates: false,
  },
  theme: {
    mode: 'light',
    radius: '0.2',
  },
  sidebar: {
    width: 140,
    mixedWidth: 75,
    fixedButton: false,
  },
  copyright: {
    companyName: '杭州临安农新生物科技有限公司',
    companySiteLink: '',
  },
});
