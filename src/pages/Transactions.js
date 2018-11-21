import React, { Component } from 'react';
import moment from 'moment';
import * as sebak from '../sebak/service';
import Card from '../components/Card';

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
      <Card title="Transactions">
        <table className="table">
          <tbody>
            <tr className="table__header">
              <th className="table__item" width="70%">Hash</th>
              <th className="table__item" width="20%">Date</th>
              <th className="table__item  table__number" width="10%">Operations</th>
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
      </Card>
    );
  }
}

export default Transactions;
