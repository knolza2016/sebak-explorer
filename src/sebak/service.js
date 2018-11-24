import sebakApi from './api';
import sebakTransformer from './transformer';

const sebakService = {
  getAccount,
  getTransactions,
  getOperationsForAccount
}

export default sebakService;

export function getTransactions(params = {}) {
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

export function getAccount(publicKey, params = {}) {
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

export function getOperationsForAccount(publicKey, params = {}) {
  return new Promise(
    async function (resolve, reject) {
      try {
        const operations = getRecords(await sebakApi.getOperationsForAccount(publicKey, params));
        const data = [];

        for (const operation of operations) {
          const transaction = await sebakApi.getTransaction(operation.tx_hash);
          data.push(sebakTransformer.transformOperation(operation, transaction.data));
        }

        resolve(data);
      } catch (error) {
        reject(error);
      }
    }
  );
}

function getRecords(response) {
  return response.data._embedded.records;
}
