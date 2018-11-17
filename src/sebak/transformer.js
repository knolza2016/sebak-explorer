const currencyDivisor = 10000000;

export function transformTransaction(transaction) {
  return {
    date: transaction.created,
    hash: transaction.hash,
    block: transaction.block,
    operationCount: transaction.operation_count
  }
}

export function transformAccount(account) {
  return {
    address: account.address,
    balance: account.balance / currencyDivisor
  }
}

export function transformOperation(operation, transaction) {
  return {
    source: operation.source,
    target: operation.body.target,
    type: operation.type,
    date: transaction.created,
    amount: operation.body.amount / currencyDivisor
  };
}
