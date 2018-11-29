const sebakTransformer = {
  transformTransaction,
  transformAccount,
  transformOperation,
  transformBlock,
  transformFrozenAccount
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
    transaction_hash: operation.tx_hash,
    source: operation.source,
    target: operation.body.target,
    type: operation.type,
    date: operation.confirmed,
    amount: operation.body.amount / currencyDivisor
  };
}

function transformBlock(block) {
  return {
    hash: block.hash,
    height: block.height,
    date: block.confirmed
  };
}

function transformFrozenAccount(frozenAccount) {
  return {
    freezeBlockHeight: frozenAccount.create_block_height,
    unfreezingBlockHeight: frozenAccount.unfreezing_block_height,
    unfreezingRemainingBlocks: frozenAccount.unfreezing_remaining_blocks,
    amount: frozenAccount.amount / currencyDivisor,
    address: frozenAccount.address,
    parentAddress: frozenAccount.linked,
    state: frozenAccount.state
  };
}
