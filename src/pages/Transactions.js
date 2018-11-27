import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import dateFormatter from '../util/formatters/date.formatter';
import sebakService from '../sebak/service';
import Card from '../components/Card';
import LoadingIndicator from '../components/LoadingIndicator';

class Transactions extends Component {
  constructor(props) {
    super(props);
    this.state = {
      transactions: []
    }
  }
  async componentDidMount() {
    const transactions = await sebakService.getTransactions({
      reverse: true,
      limit: 100
    });

    this.setState({
      transactions: transactions
    });
  }
  render() {
    return (
      <Card title="Transactions">
        {
          this.state.transactions.length === 0 &&
          <LoadingIndicator/>
        }
        {
          this.state.transactions.length > 0 &&
          <table className="table">
            <tbody>
              <tr className="table__header">
                <th className="table__item" width="70%">Hash</th>
                <th className="table__item" width="20%">Date</th>
                <th className="table__item  table__number" width="10%">Operations</th>
              </tr>
              {this.state.transactions.map((transaction) => (
                <tr className="table__content" key={transaction.hash}>
                  <td className="table__item">
                    <Link to={`/transactions/${transaction.hash}`} className="table__link">
                      {transaction.hash}
                    </Link>
                  </td>
                  <td className="table__item">{dateFormatter.formatAsDatetime(transaction.date)}</td>
                  <td className="table__item table__number">{transaction.operationCount}</td>
                </tr>
              ))}
            </tbody>
          </table>
        }
      </Card>
    );
  }
}

export default Transactions;
