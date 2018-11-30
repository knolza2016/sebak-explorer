const stringFormatter = {
  truncate
}

export default stringFormatter;

function truncate(string, amount, postfix = '') {
  if(string) {
    return string.substring(0, amount) + postfix;
  }

  return string;
}
