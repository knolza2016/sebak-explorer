import axios from 'axios'

const API_BASE = process.env.REACT_APP_SEBAK_API_ENDPOINT;

function getLink(endpoint) {
  return new Promise(
    async function (resolve, reject) {
      const res = await axios.get(endpoint);
      resolve(getLinkObject(res));
    }
  );
}

function getLinkObject(res) {
  return {
    data: res.data._embedded.records,
    next: function () {
      return getLink(`${API_BASE}${res.data._links.next.href}`);
    },
    previous: function () {
      return getLink(`${API_BASE}${res.data._links.prev.href}`);
    }
  }
}

export function getAccount(id, params = {}) {
  return axios.get(`${API_BASE}/api/v1/accounts/${id}`, {
    params: {
      limit: params.limit,
      cursor: params.cursor,
      order: params.order
    }
  })
}

export function getOperationsForAccount(id, params = {}) {
  return axios.get(`${API_BASE}/api/v1/accounts/${id}/operations`, {
    params: {
      limit: params.limit,
      cursor: params.cursor,
      order: params.order
    }
  })
}

export function getTransactions(params = {}) {
  return new Promise(
    async function (resolve, reject) {
      const res = await axios.get(`${API_BASE}/api/v1/transactions`, {
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

export function getTransactionsForAccount(id, params = {}) {
  return axios.get(`${API_BASE}/api/v1/accounts/${id}/transactions`, {
    params: {
      limit: params.limit,
      cursor: params.cursor,
      order: params.order
    }
  })
}

export function getTransaction(hash, params = {}) {
  return axios.get(`${API_BASE}/api/v1/transactions/${hash}`, {
    params: {
      limit: params.limit,
      cursor: params.cursor,
      order: params.order
    }
  })
}

export function getOperationsForTransaction(hash, params = {}) {
  return axios.get(`${API_BASE}/api/v1/transactions/${hash}/operations`, {
    params: {
      limit: params.limit,
      cursor: params.cursor,
      order: params.order
    }
  })
}
