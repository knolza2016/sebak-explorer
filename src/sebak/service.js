import * as sebak from './api';
import * as transformer from './transformer';

export function getTransactions(params = {}) {
  return new Promise(
    async function (resolve, reject) {
      try {
        const transactions = (await sebak.getTransactions(params)).data;
        const data = [];

        for (const transaction of transactions) {
          data.push(transformer.transformTransaction(transaction));
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
        const response = await sebak.getAccount(publicKey, params);
        resolve(transformer.transformAccount(response.data));
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
        const operations = getRecords(await sebak.getOperationsForAccount(publicKey, params));
        const data = [];

        for (const operation of operations) {
          const transaction = await sebak.getTransaction(operation.tx_hash);
          data.push(transformer.transformOperation(operation, transaction.data));
        }

        resolve(data);
      } catch (error) {
        reject(error);
      }
    }
  );
}

export function getOperationsByTransactionsForAccount(publicKey, params = {}) {
  return new Promise(
    async function (resolve, reject) {
      try {
        const transactions = getRecords(await sebak.getTransactionsForAccount(publicKey, params));
        const data = [];

        for (const transaction of transactions) {
          const operationsForAccount = getRecords(await sebak.getOperationsForTransaction(transaction.hash))
            .filter(operation => isOperationRelatedToAccount(operation, publicKey));

          for (const operation of operationsForAccount) {
            data.push(transformer.transformOperation(operation, transaction));
          }
        }

        resolve(data);
      } catch (error) {
        error.reject(error);
      }
    }
  );
}

function getRecords(response) {
  return response.data._embedded.records;
}

const isOperationRelatedToAccount = (operation, publicKey) => {
  return operation.source === publicKey || operation.body.target === publicKey;
}
