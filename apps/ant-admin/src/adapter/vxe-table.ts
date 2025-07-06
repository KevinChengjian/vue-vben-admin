import type { Dict } from '#/api';

import { h } from 'vue';

import { setupVbenVxeTable, useVbenVxeGrid } from '@vben/plugins/vxe-table';

import DictLabel from '#/components/dict/dict-label.vue';
import { format } from '#/utils/money';

import { useVbenForm } from './form';

setupVbenVxeTable({
  configVxeTable: (vxeUI) => {
    vxeUI.setConfig({
      grid: {
        align: 'center',
        border: 'inner',
        columnConfig: {
          resizable: true,
        },
        rowConfig: {
          isHover: true,
        },
        minHeight: 850,
        formConfig: {
          // 全局禁用vxe-table的表单配置，使用formOptions
          enabled: false,
        },
        sortConfig: {
          remote: true,
        },
        proxyConfig: {
          autoLoad: true,
          response: {
            result: 'list',
            total: 'total',
            list: 'list',
          },
          showActiveMsg: true,
          showResponseMsg: false,
        },
        round: false,
        showOverflow: true,
        size: 'medium',
      },
    });

    // 渲染字典
    vxeUI.renderer.add('dict', {
      renderTableDefault(_renderOpts: any, params) {
        const { column, row } = params;
        return h(DictLabel, {
          value: row[column.field],
          code: _renderOpts?.code as Dict.KeyEnum,
        });
      },
    });

    // 百分比渲染
    vxeUI.renderer.add('percent', {
      renderTableDefault(_renderOpts: any, params) {
        const { column, row } = params;
        return h(
          'span',
          // { class: ['text-primary'] },
          `${format(Number.parseFloat(row[column.field]))}%`,
        );
      },
    });

    // 数字千分位渲染
    vxeUI.renderer.add('number', {
      renderTableDefault(_renderOpts: any, params) {
        const { column, row } = params;
        return h(
          'span',
          // { class: ['text-primary'] },
          format(Number.parseFloat(row[column.field])),
        );
      },
    });

    // 金额渲染
    vxeUI.renderer.add('money', {
      renderTableDefault(_renderOpts: any, params) {
        const { column, row } = params;
        return h(
          'span',
          { class: ['text-primary'] },
          format(Number.parseFloat(row[column.field]), 2),
        );
      },
    });
  },
  useVbenForm,
});

export { useVbenVxeGrid };

export type * from '@vben/plugins/vxe-table';
