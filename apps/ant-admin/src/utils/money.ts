export function format(value: number) {
  return value.toLocaleString('zh-CN', {
    style: 'percent',
    currency: 'CNY',
  });
}
