import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import dateFormatter from '../util/formatters/date.formatter';
import sebakService from '../sebak/service';
import Card from '../components/Card';
import LoadingIndicator from '../components/LoadingIndicator';
import ActionButton from '../components/ActionButton';

class Transactions extends Component {
  constructor(props) {
    super(props);
    this.state = {
      transactions: {
        data: []
      },
      currentPage: 0
    }
  }
  async componentDidMount() {
    const transactions = await sebakService.getTransactions({
      reverse: true,
      limit: 10
    });

    this.setState({
      transactions
    });
  }
  previousPage = () => {
    const { transactions, currentPage } = this.state;
    this.paginate(transactions.next(), currentPage - 1);
  }
  nextPage = () => {
    const { transactions, currentPage } = this.state;
    this.paginate(transactions.previous(), currentPage + 1);
  }
  paginate = (linkPromise, page) => {
    const { currentPage } = this.state;

    this.setState({
      transactions: {
        data: []
      }
    });

    linkPromise.then(transactions => {
      this.setState({
        transactions: page < currentPage  ? this._reverseOrder(transactions) : transactions,
        currentPage: page
      });
    });
  }
  _reverseOrder = (transactions) => {
    transactions.data = transactions.data.reverse()
    return transactions
  }
  render() {
    return (
      <Card title="Transactions">
        {
          this.state.transactions.data.length === 0 &&
          <LoadingIndicator/>
        }
        {
          this.state.transactions.data.length > 0 &&
          <Fragment>
            <table className="table">
              <tbody>
                <tr className="table__header">
                  <th className="table__item" width="70%">Hash</th>
                  <th className="table__item" width="20%">Date</th>
                  <th className="table__item  table__number" width="10%">Operations</th>
                </tr>
                {this.state.transactions.data.map((transaction) => (
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
            <div className="paginator">
              { this.state.currentPage > 0 && <ActionButton onClick={this.previousPage}>Previous page</ActionButton> }
              <ActionButton onClick={this.nextPage} style={this.state.currentPage === 0 ? {marginLeft: 'auto'} : {} }>Next page</ActionButton>
            </div>
          </Fragment>
        }
      </Card>
    );
  }
}

export default Transactions;
