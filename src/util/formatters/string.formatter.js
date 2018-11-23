const stringFormatter = {
  truncate: function (string, amount, postfix = '') {
    return string.substring(0, amount) + postfix;
  }
}

export default stringFormatter;
