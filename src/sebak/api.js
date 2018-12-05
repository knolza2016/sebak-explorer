import axios from 'axios'

const sebakApi = {
  getAccount,
  getOperationsForAccount,
  getTransactionsForAccount,
  getTransactions,
  getTransaction,
  getOperationsForTransaction,
  getNetInformation,
  getBlocks,
  getBlock,
  getFrozenAccounts,
  getFrozenAccountsForAccount,
  getLink
}

export default sebakApi;

const SEBAK_API_BASE = process.env.REACT_APP_SEBAK_API_BASE;

function getAccount(publicKey, params = {}) {
  return axios.get(`${SEBAK_API_BASE}/api/v1/accounts/${publicKey}`, {
    params: params
  })
}

function getOperationsForAccount(publicKey, params = {}) {
  return axios.get(`${SEBAK_API_BASE}/api/v1/accounts/${publicKey}/operations`, {
    params: params
  })
}

function getTransactionsForAccount(publicKey, params = {}) {
  return axios.get(`${SEBAK_API_BASE}/api/v1/accounts/${publicKey}/transactions`, {
    params: params
  })
}

function getTransactions(params = {}) {
  return axios.get(`${SEBAK_API_BASE}/api/v1/transactions`, {
        params: params
  })
}

function getTransaction(transactionHash, params = {}) {
  return axios.get(`${SEBAK_API_BASE}/api/v1/transactions/${transactionHash}`, {
    params: params
  })
}

function getOperationsForTransaction(transactionHash, params = {}) {
  return axios.get(`${SEBAK_API_BASE}/api/v1/transactions/${transactionHash}/operations`, {
    params: params
  })
}

function getBlocks(params = {}) {
  return axios.get(`${SEBAK_API_BASE}/api/v1/blocks`, {
    params: params
  })
}

function getBlock(blockHash, params = {}) {
  return axios.get(`${SEBAK_API_BASE}/api/v1/blocks/${blockHash}`, {
    params: params
  })
}

function getFrozenAccounts(params = {}) {
  return axios.get(`${SEBAK_API_BASE}/api/v1/frozen-accounts`, {
    params: params
  })
}

function getFrozenAccountsForAccount(publicKey, params = {}) {
  return axios.get(`${SEBAK_API_BASE}/api/v1/accounts/${publicKey}/frozen-accounts`, {
    params: params
  })
}

function getNetInformation() {
  return axios.get(`${SEBAK_API_BASE}`)
}

function getLink(endpoint) {
  return axios.get(`${SEBAK_API_BASE}${endpoint}`);
}
