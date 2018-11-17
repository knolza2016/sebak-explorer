import * as sebak from './api';
import * as transformer from './transformer';

export function getTransactions(params = {}) {
  return new Promise(
    async function (resolve, reject) {
      const response = await sebak.getTransactions(params);
      const transactions = response.data;
      const data = [];

      for(const transaction of transactions) {
        data.push(transformer.transformTransaction(transaction));
      }

      resolve(data);
    }
  );
}

export function getAccount(id, params = {}) {
  return new Promise(
    async function (resolve, reject) {
      const response = await sebak.getAccount(id, params);
      resolve(transformer.transformAccount(response.data));
    }
  );
}

export function getOperationsForAccount(id, params = {}) {
  return new Promise(
    async function (resolve, reject) {
      const response = await sebak.getOperationsForAccount(id, params);
      const operations = response.data._embedded.records;
      const data = [];

      for(const operation of operations) {
        const transaction = await sebak.getTransaction(operation.tx_hash);
        data.push(transformer.transformOperation(operation, transaction.data));
      }

      resolve(data);
    }
  );
}

export function getOperationsByTransactionsForAccount(id, params = {}) {
  return new Promise(
    async function (resolve, reject) {
      const transactionsResponse = await sebak.getTransactionsForAccount(id, params);
      const transactions = transactionsResponse.data._embedded.records;
      const data = [];

      for(const transaction of transactions) {
        const operationsResponse = await sebak.getOperationsForTransaction(transaction.hash);
        const operations = operationsResponse.data._embedded.records;

        for(const operation of operations) {
          data.push(transformer.transformOperation(operation, transaction));
        }
      }

      resolve(data);
    }
  );
}
