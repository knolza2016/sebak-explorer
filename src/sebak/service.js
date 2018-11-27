import sebakApi from './api';
import sebakTransformer from './transformer';

const sebakService = {
  getAccount,
  getTransactions,
  getTransaction,
  getOperations,
  getOperationsForAccount,
  getOperationsForTransaction,
  getNetInformation
}

export default sebakService;

function getTransactions(params = {}) {
  return new Promise(
    async function (resolve, reject) {
      try {
        const transactions = (await sebakApi.getTransactions(params)).data;
        const data = [];

        for (const transaction of transactions) {
          data.push(sebakTransformer.transformTransaction(transaction));
        }

        resolve(data);
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
        const transactions = (await sebakApi.getTransactions(params)).data;
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

function getRecords(response) {
  return response.data._embedded.records;
}
