const sebakTransformer = {
  transformTransaction,
  transformAccount,
  transformOperation
}

export default sebakTransformer;

const currencyDivisor = 10000000;

function transformTransaction(transaction) {
  return {
    date: transaction.created,
    hash: transaction.hash,
    block: transaction.block,
    operationCount: transaction.operation_count
  }
}

function transformAccount(account) {
  return {
    address: account.address,
    balance: account.balance / currencyDivisor
  }
}

function transformOperation(operation) {
  return {
    hash: operation.hash,
    source: operation.source,
    target: operation.body.target,
    type: operation.type,
    date: operation.confirmed,
    amount: operation.body.amount / currencyDivisor
  };
}
