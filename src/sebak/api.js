import axios from 'axios'

const SEBAK_API_BASE = process.env.REACT_APP_SEBAK_API_BASE;

export function getAccount(publicKey, params = {}) {
  // todo make API smart based on _links content
  return axios.get(`${SEBAK_API_BASE}/api/v1/accounts/${publicKey}`, {
    params: {
      limit: params.limit,
      cursor: params.cursor,
      order: params.order
    }
  })
}

export function getOperationsForAccount(publicKey, params = {}) {
  // todo make API smart based on _links content
  return axios.get(`${SEBAK_API_BASE}/api/v1/accounts/${publicKey}/operations`, {
    params: {
      limit: params.limit,
      cursor: params.cursor,
      order: params.order
    }
  })
}

export function getTransactionsForAccount(publicKey, params = {}) {
  // todo make API smart based on _links content
  return axios.get(`${SEBAK_API_BASE}/api/v1/accounts/${publicKey}/transactions`, {
    params: {
      limit: params.limit,
      cursor: params.cursor,
      order: params.order
    }
  })
}

export function getTransactions(params = {}) {
  // todo make API smart based on _links content
  return new Promise(
    async function (resolve, reject) {
      const res = await axios.get(`${SEBAK_API_BASE}/api/v1/transactions`, {
        params: {
          limit: params.limit,
          cursor: params.cursor,
          order: params.order
        }
      })

      resolve(getLinkObject(res));
    }
  );
}

export function getTransaction(transactionHash, params = {}) {
  // todo make API smart based on _links content
  return axios.get(`${SEBAK_API_BASE}/api/v1/transactions/${transactionHash}`, {
    params: {
      limit: params.limit,
      cursor: params.cursor,
      order: params.order
    }
  })
}

export function getOperationsForTransaction(transactionHash, params = {}) {
  // todo make API smart based on _links content
  return axios.get(`${SEBAK_API_BASE}/api/v1/transactions/${transactionHash}/operations`, {
    params: {
      limit: params.limit,
      cursor: params.cursor,
      order: params.order
    }
  })
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
