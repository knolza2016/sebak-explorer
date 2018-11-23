import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import stringFormatter from '../util/formatters/string.formatter';
import dateFormatter from '../util/formatters/date.formatter';

class OperationsTable extends Component {
  getFormattedType(type) {
    switch (type) {
      case 'create-account':
        return 'Create account'
      case 'payment':
        return 'Payment'
      default:
        return type;
    }
  }
  render() {
    return (
      <table className="table">
        <tbody>
          <tr className="table__header">
            <th className="table__item" width="13%">Hash</th>
            <th className="table__item" width="19%">From</th>
            <th className="table__item" width="19%">To</th>
            <th className="table__item" width="15%">Type</th>
            <th className="table__item" width="19%">Date</th>
            <th className="table__item  table__number" width="15%">Amount</th>
          </tr>
          {this.props.operations.map((operation) => (
            <tr className="table__content" key={operation.hash}>
              <td className="table__item">
                <Link to={`/operations/${operation.hash}`} className="table__link">
                  {stringFormatter.truncate(operation.hash, 10, '...')}
                </Link>
              </td>
              <td className="table__item">
                <Link to={`/accounts/${operation.source}`} className="table__link">
                  {stringFormatter.truncate(operation.source, 15, '...')}
                </Link>
              </td>
              <td className="table__item">
                <Link to={`/accounts/${operation.target}`} className="table__link">
                  {stringFormatter.truncate(operation.target, 15, '...')}
                </Link>
              </td>
              <td className="table__item">{this.getFormattedType(operation.type)}</td>
              <td className="table__item">{dateFormatter.formatAsDatetime(operation.date)}</td>
              <td className="table__item table__number">{operation.amount} BOS</td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  }
}

export default OperationsTable;
