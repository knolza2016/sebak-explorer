import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import stringFormatter from '../util/formatters/string.formatter';
import dateFormatter from '../util/formatters/date.formatter';
import { currencyFormatter } from '../util/formatters';
import MediaQuery from 'react-responsive';

class OperationsTable extends Component {
  getFormattedType(type) {
    switch (type) {
      case 'create-account':
        return 'Create account'
      case 'payment':
        return 'Payment'
      case 'collect-tx-fee':
        return 'Collect transaction fee'
      case 'inflation':
        return "Inflation"
      case 'unfreezing-request':
        return "Unfreezing request"
      default:
        return type;
    }
  }
  getOperationAsSentence(operation) {
    switch (operation.type) {
      case 'create-account':
        return (
          <Fragment>
            <Link to={`/accounts/${operation.source}`} className="link">
              {stringFormatter.truncate(operation.source, 10, '...')}
            </Link> created account <Link to={`/accounts/${operation.target}`} className="link">
              {stringFormatter.truncate(operation.target, 10, '...')}
            </Link> with balance of {currencyFormatter.formatAsBos(operation.amount)} BOS in transaction <Link to={`/transactions/${operation.transaction_hash}`} className="link">
              {stringFormatter.truncate(operation.transaction_hash, 10, '...')}
            </Link> on {dateFormatter.formatAsDatetime(operation.date)}
          </Fragment>
        )
      case 'payment':
        return (
          <Fragment>
            <Link to={`/accounts/${operation.source}`} className="link">
              {stringFormatter.truncate(operation.source, 10, '...')}
            </Link> paid {currencyFormatter.formatAsBos(operation.amount)} BOS to <Link to={`/accounts/${operation.target}`} className="link">
              {stringFormatter.truncate(operation.target, 10, '...')}
            </Link> in transaction <Link to={`/transactions/${operation.transaction_hash}`} className="link">
              {stringFormatter.truncate(operation.transaction_hash, 10, '...')}
            </Link> on {dateFormatter.formatAsDatetime(operation.date)}
          </Fragment>
        )
      case 'collect-tx-fee':
        return (
          <Fragment>
            <Link to={`/accounts/${operation.source}`} className="link">
              {stringFormatter.truncate(operation.source, 10, '...')}
            </Link> collected transaction fee of {currencyFormatter.formatAsBos(operation.amount)} BOS for <Link to={`/accounts/${operation.target}`} className="link">
              {stringFormatter.truncate(operation.target, 10, '...')}
            </Link> in transaction <Link to={`/transactions/${operation.transaction_hash}`} className="link">
              {stringFormatter.truncate(operation.transaction_hash, 10, '...')}
            </Link> on {dateFormatter.formatAsDatetime(operation.date)}
          </Fragment>
        )
      case 'inflation':
        return (
          <Fragment>
            <Link to={`/accounts/${operation.source}`} className="link">
              {stringFormatter.truncate(operation.source, 10, '...')}
            </Link> inflated supply with {currencyFormatter.formatAsBos(operation.amount)} BOS to <Link to={`/accounts/${operation.target}`} className="link">
              {stringFormatter.truncate(operation.target, 10, '...')}
            </Link> in transaction <Link to={`/transactions/${operation.transaction_hash}`} className="link">
              {stringFormatter.truncate(operation.transaction_hash, 10, '...')}
            </Link> on {dateFormatter.formatAsDatetime(operation.date)}
          </Fragment>
        )
      case 'unfreezing-request':
        return (
          <Fragment>
            <Link to={`/accounts/${operation.source}`} className="link">
              {stringFormatter.truncate(operation.source, 10, '...')}
            </Link> requested unfreezing in transaction <Link to={`/transactions/${operation.transaction_hash}`} className="link">
              {stringFormatter.truncate(operation.transaction_hash, 10, '...')}
            </Link> on {dateFormatter.formatAsDatetime(operation.date)}
          </Fragment>
        )
      default:
        return operation.type;
    }
  }
  render() {
    return (
      <table className="table">
        <tbody>
          <MediaQuery maxWidth={768}>
            {
              this.props.operations.map((operation) => (
              <tr className="table__content" key={operation.hash}>
                <td className="table__item">
                  {this.getOperationAsSentence(operation)}
                </td>
              </tr>
              ))
            }
          </MediaQuery>
          <MediaQuery minWidth={769}>
            <tr className="table__header">
              <th className="table__item" width="15%">Transaction</th>
              <th className="table__item" width="15%">From</th>
              <th className="table__item" width="15%">To</th>
              <th className="table__item" width="18%">Type</th>
              <th className="table__item" width="18%">Date</th>
              <th className="table__item  table__number" width="19%">Amount</th>
            </tr>
            {this.props.operations.map((operation) => (
              <tr className="table__content" key={operation.hash}>
                <td className="table__item">
                  <Link to={`/transactions/${operation.transaction_hash}`} className="link">
                    {stringFormatter.truncate(operation.transaction_hash, 10, '...')}
                  </Link>
                </td>
                <td className="table__item">
                  <Link to={`/accounts/${operation.source}`} className="link">
                    {stringFormatter.truncate(operation.source, 10, '...')}
                  </Link>
                </td>
                <td className="table__item">
                  <Link to={`/accounts/${operation.target}`} className="link">
                    {stringFormatter.truncate(operation.target, 10, '...')}
                  </Link>
                </td>
                <td className="table__item">{this.getFormattedType(operation.type)}</td>
                <td className="table__item">{dateFormatter.formatAsDatetime(operation.date)}</td>
                <td className="table__item table__number">{isNaN(operation.amount) ? '' : `${currencyFormatter.formatAsBos(operation.amount)} BOS`}</td>
              </tr>
            ))}
          </MediaQuery>
        </tbody>
      </table>
    );
  }
}

export default OperationsTable;
