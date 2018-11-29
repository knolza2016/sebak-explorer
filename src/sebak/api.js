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
  getLink
}

export default sebakApi;

const SEBAK_API_BASE = process.env.REACT_APP_SEBAK_API_BASE;

function getAccount(publicKey, params = {}) {
  // todo make API smart based on _links content
  return axios.get(`${SEBAK_API_BASE}/api/v1/accounts/${publicKey}`, {
    params: params
  })
}

function getOperationsForAccount(publicKey, params = {}) {
  // todo make API smart based on _links content
  return axios.get(`${SEBAK_API_BASE}/api/v1/accounts/${publicKey}/operations`, {
    params: params
  })
}

function getTransactionsForAccount(publicKey, params = {}) {
  // todo make API smart based on _links content
  return axios.get(`${SEBAK_API_BASE}/api/v1/accounts/${publicKey}/transactions`, {
    params: params
  })
}

function getTransactions(params = {}) {
  // todo make API smart based on _links content
  return new Promise(
    async function (resolve, reject) {
      resolve(await axios.get(`${SEBAK_API_BASE}/api/v1/transactions`, {
        params: params
      }));
    }
  );
}

function getTransaction(transactionHash, params = {}) {
  // todo make API smart based on _links content
  return axios.get(`${SEBAK_API_BASE}/api/v1/transactions/${transactionHash}`, {
    params: params
  })
}

function getOperationsForTransaction(transactionHash, params = {}) {
  // todo make API smart based on _links content
  return axios.get(`${SEBAK_API_BASE}/api/v1/transactions/${transactionHash}/operations`, {
    params: params
  })
}

function getBlocks(params = {}) {
  // todo make API smart based on _links content
  return axios.get(`${SEBAK_API_BASE}/api/v1/blocks`, {
    params: params
  })
}

function getBlock(blockHash, params = {}) {
  // todo make API smart based on _links content
  return axios.get(`${SEBAK_API_BASE}/api/v1/blocks/${blockHash}`, {
    params: params
  })
}

function getNetInformation() {
  return axios.get(`${SEBAK_API_BASE}`)
}

function getLink(endpoint) {
  return axios.get(`${SEBAK_API_BASE}${endpoint}`);
}
