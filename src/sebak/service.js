import sebakApi from './api';
import sebakTransformer from './transformer';

const sebakService = {
  getAccount,
  getTransactions,
  getTransaction,
  getOperations,
  getOperationsForAccount,
  getOperationsForTransaction,
  getNetInformation,
  getBlocks,
  getBlock,
  getFrozenAccounts,
}

export default sebakService;

function getTransactions(params = {}) {
  return new Promise(
    async function (resolve, reject) {
      try {
        const transactions = (await sebakApi.getTransactions(params));
        resolve(getTransactionsObject(transactions));
      } catch (error) {
        reject(error);
      }
    }
  );
}

function getTransaction(transactionHash, params = {}) {
  return new Promise(
    async function (resolve, reject) {
      try {
        const response = await sebakApi.getTransaction(transactionHash, params);
        resolve(sebakTransformer.transformTransaction(response.data));
      } catch (error) {
        reject(error);
      }
    }
  );
}

function getAccount(publicKey, params = {}) {
  return new Promise(
    async function (resolve, reject) {
      try {
        const response = await sebakApi.getAccount(publicKey, params);
        resolve(sebakTransformer.transformAccount(response.data));
      } catch (error) {
        reject(error);
      }
    }
  );
}

function getOperationsForAccount(publicKey, params = {}) {
  return new Promise(
    async function (resolve, reject) {
      try {
        const operations = getRecords(await sebakApi.getOperationsForAccount(publicKey, params));
        const data = [];

        for (const operation of operations) {
          data.push(sebakTransformer.transformOperation(operation));
        }

        resolve(data);
      } catch (error) {
        reject(error);
      }
    }
  );
}

export function getOperationsForTransaction(transaction, params = {}) {
  return new Promise(
    async function (resolve, reject) {
      try {
        const operations = getRecords(await sebakApi.getOperationsForTransaction(transaction.hash, params));
        const data = [];

        for (const operation of operations) {
          data.push(sebakTransformer.transformOperation(operation));
        }

        resolve(data);
      } catch (error) {
        reject(error);
      }
    }
  );
}

export function getOperations(params = {}) {
  return new Promise(
    async function (resolve, reject) {
      try {
        const transactions = (await getTransactions(params)).data;
        const data = [];

        transactionsLoop:
          for (const transaction of transactions) {
            const operations = getRecords(await sebakApi.getOperationsForTransaction(transaction.hash));

            for (const operation of operations) {
              data.push(sebakTransformer.transformOperation(operation));

              if (data.length === params.limit) {
                break transactionsLoop;
              }
            }
          }

        resolve(data);
      } catch (error) {
        reject(error);
      }
    }
  );
}

export function getNetInformation() {
  return new Promise(
    async function (resolve, reject) {
      try {
        const netInformation = await sebakApi.getNetInformation();

        // todo transform data

        resolve(netInformation);
      } catch (error) {
        reject(error);
      }
    }
  );
}

function getBlocks(params = {}) {
  return new Promise(
    async function (resolve, reject) {
      try {
        const blocks = (await sebakApi.getBlocks(params));
        resolve(getBlocksObject(blocks));
      } catch (error) {
        reject(error);
      }
    }
  );
}

function getBlock(blockHash, params = {}) {
  return new Promise(
    async function (resolve, reject) {
      try {
        const response = await sebakApi.getBlock(blockHash, params);
        resolve(sebakTransformer.transformBlock(response.data));
      } catch (error) {
        reject(error);
      }
    }
  );
}

function getFrozenAccounts(params = {}) {
  return new Promise(
    async function (resolve, reject) {
      try {
        const frozenAccounts = (await sebakApi.getFrozenAccounts(params));
        resolve(getFrozenAccountsObject(frozenAccounts));
      } catch (error) {
        reject(error);
      }
    }
  );
}

function getRecords(response) {
  return response.data._embedded.records;
}

function getTransactionsObject(response) {
  const data = [];

  for (const transaction of response.data._embedded.records) {
    data.push(sebakTransformer.transformTransaction(transaction));
  }

  return {
    data,
    next: async function () {
      return getTransactionsObject(await sebakApi.getLink(`${response.data._links.next.href}`));
    },
    previous: async function () {
      return getTransactionsObject(await sebakApi.getLink(`${response.data._links.prev.href}`));
    }
  }
}

function getBlocksObject(response) {
  const data = [];

  for (const block of response.data._embedded.records) {
    data.push(sebakTransformer.transformBlock(block));
  }

  return {
    data,
    next: async function () {
      return getBlocksObject(await sebakApi.getLink(`${response.data._links.next.href}`));
    },
    previous: async function () {
      return getBlocksObject(await sebakApi.getLink(`${response.data._links.prev.href}`));
    }
  }
}

function getFrozenAccountsObject(response) {
  const data = [];

  for (const frozenAccount of response.data._embedded.records) {
    data.push(sebakTransformer.transformFrozenAccount(frozenAccount));
  }

  return {
    data,
    next: async function () {
      return getFrozenAccountsObject(await sebakApi.getLink(`${response.data._links.next.href}`));
    },
    previous: async function () {
      return getFrozenAccountsObject(await sebakApi.getLink(`${response.data._links.prev.href}`));
    }
  }
}
