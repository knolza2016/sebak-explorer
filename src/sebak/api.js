import axios from 'axios'

const sebakApi = {
  getAccount,
  getOperationsForAccount,
  getTransactionsForAccount,
  getTransactions,
  getTransaction,
  getOperationsForTransaction,
  getNetInformation
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
      const res = await axios.get(`${SEBAK_API_BASE}/api/v1/transactions`, {
        params: params
      })

      resolve(getLinkObject(res));
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

function getNetInformation() {
  return axios.get(`${SEBAK_API_BASE}`)
}

function getLink(endpoint) {
  return new Promise(
    async function (resolve, reject) {
      const res = await axios.get(endpoint);
      resolve(getLinkObject(res));
    }
  );
}

function getLinkObject(response) {
  return {
    data: response.data._embedded.records,
    next: function () {
      return getLink(`${SEBAK_API_BASE}${response.data._links.next.href}`);
    },
    previous: function () {
      return getLink(`${SEBAK_API_BASE}${response.data._links.prev.href}`);
    }
  }
}
