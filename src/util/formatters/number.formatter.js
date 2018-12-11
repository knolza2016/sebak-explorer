import numbro from 'numbro';

export {
  format
}

function format(number, config) {
  const defaultConfig = {
    thousandSeparated: true,
    mantissa: 2,
    optionalMantissa: true,
    trimMantissa: true
  }

  return numbro(number).format({
    ...defaultConfig,
    ...config
  })
}
