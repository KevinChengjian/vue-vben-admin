export const TableColumn: any = [
  { title: '菌龄', field: 'age', align: 'center', minWidth: 50 },
];

export const TableColumnItem: any = [
  {
    title: '%s',
    field: '%c-mb_sn',
    headerAlign: 'center',
    children: [
      {
        title: '库内环境',
        field: '%c-kn',
        headerAlign: 'center',
        children: [
          {
            field: '%c-set',
            title: '设定',
            align: 'center',
            minWidth: 90,
            children: [
              {
                field: '%c-set_temperature',
                title: '库温',
                align: 'center',
                minWidth: 90,
              },
              {
                field: '%c-set_cd',
                title: 'CO2',
                align: 'center',
                minWidth: 90,
                cellRender: { name: 'number' },
              },
              {
                field: '%c-set_humidity',
                title: '湿度',
                align: 'center',
                minWidth: 90,
                cellRender: { name: 'number' },
              },
            ],
          },
          {
            field: '%c-actual',
            title: '实际',
            align: 'center',
            minWidth: 90,
            children: [
              {
                field: '%c-reality_temperature',
                title: '库温',
                align: 'center',
                minWidth: 90,
                cellRender: { name: 'number' },
              },
              {
                field: '%c-reality_cd',
                title: 'CO2',
                align: 'center',
                minWidth: 90,
              },
              {
                field: '%c-reality_humidity',
                title: '湿度',
                align: 'center',
                minWidth: 90,
                cellRender: { name: 'number' },
              },
            ],
          },
        ],
      },
      {
        title: '天气情况',
        field: '%c-weather_info',
        headerAlign: 'center',
        children: [
          {
            title: '高温',
            field: '%c-max_t',
            align: 'center',
            cellRender: { name: 'number' },
            minWidth: 75,
          },
          {
            title: '低温',
            field: '%c-min_t',
            align: 'center',
            cellRender: { name: 'number' },
            minWidth: 75,
          },
          {
            title: '湿度',
            field: '%c-humidity',
            align: 'center',
            cellRender: { name: 'number' },
            minWidth: 75,
          },
          {
            title: '天气',
            field: '%c-weather',
            align: 'center',
            minWidth: 75,
          },
        ],
      },
      {
        title: '菌包状态',
        field: '%c-tq',
        headerAlign: 'center',
        children: [
          {
            title: '巡库日期',
            field: '%c-patrol_at',
            align: 'center',
            minWidth: 90,
          },
          {
            title: '发菌',
            field: '%c-fhName',
            align: 'center',
            minWidth: 90,
          },
          {
            title: '包温',
            field: '%c-bag_t',
            align: 'center',
            minWidth: 90,
            cellRender: { name: 'number' },
          },
          {
            title: '后熟',
            field: '%c-postripeness',
            align: 'center',
            minWidth: 90,
          },
        ],
      },
    ],
  },
];
