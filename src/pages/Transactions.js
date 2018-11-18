import React, { Component } from 'react';
import moment from 'moment';
import * as sebak from '../sebak/service';

class Transactions extends Component {
  constructor(props) {
    super(props);
    this.state = {
      transactions: []
    }
  }
  async componentDidMount() {
    const transactions = await sebak.getTransactions({
      limit: 10,
      reverse: true
    });

    this.setState({
      transactions: transactions
    });
  }
  getFormattedDate(date) {
    const momentDate = moment(date);
    momentDate.locale(navigator.language || navigator.userLanguage);
    return `${momentDate.format('L')}, ${momentDate.format('LTS')}`;
  }
  render() {
    return (
      <div>
        <table className="table">
          <tbody>
            <tr className="table__header">
              <th className="table__item">Hash</th>
              <th className="table__item">Date</th>
              <th className="table__item table__number">Operations</th>
            </tr>
            {this.state.transactions.map((transaction) => (
              <tr className="table__content" key={transaction.hash}>
                <td className="table__item">{transaction.hash}</td>
                <td className="table__item">{this.getFormattedDate(transaction.date)}</td>
                <td className="table__item table__number">{transaction.operationCount}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}

export default Transactions;
