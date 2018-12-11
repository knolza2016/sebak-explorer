export {
  truncate
}

function truncate(string, amount, postfix = '') {
  if (string) {
    return string.substring(0, amount) + postfix;
  }

  return string;
}
