export function format(value: number, decimal: number = 0) {
  const option: any = { currency: 'CNY' };
  if (decimal > 0) {
    option.minimumFractionDigits = decimal;
  }

  return value.toLocaleString('zh-CN', option);
}
