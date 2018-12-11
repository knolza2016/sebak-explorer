import numbro from 'numbro';

export {
  formatAsBos
}

function formatAsBos(amount) {
  return numbro(amount).format({
    thousandSeparated: true,
    optionalMantissa: true,
    mantissa: 7,
    trimMantissa: true
  })
}
