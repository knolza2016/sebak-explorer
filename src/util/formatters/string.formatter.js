const stringFormatter = {
  truncate
}

export default stringFormatter;

function truncate(string, amount, postfix = '') {
  return string.substring(0, amount) + postfix;
}
