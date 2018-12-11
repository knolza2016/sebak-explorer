import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import { dateFormatter, stringFormatter } from '../util/formatters';
import MediaQuery from 'react-responsive';
import ActionButton from '../components/ActionButton';
import LoadingIndicator from '../components/LoadingIndicator';

class TransactionsTable extends Component {
  state = {
    transactions: undefined,
    currentPage: 0
  }
  componentWillReceiveProps(nextProps) {
    this.setState({
      transactions: nextProps.transactions
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
      transactions: undefined
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
      <Fragment>
        {
          !this.state.transactions &&
          <LoadingIndicator/>
        }
        {
          this.state.transactions &&
          <Fragment>
            <table className="table">
              <tbody>
                <MediaQuery maxWidth={768}>
                  {this.state.transactions.data.map((transaction) => (
                    <tr className="table__content" key={transaction.hash}>
                      <td className="table__item">
                          <Link to={`/transactions/${transaction.hash}`} className="link">
                            {stringFormatter.truncate(transaction.hash, 10, '...')}
                          </Link> confirmed {transaction.operationCount} operations on {dateFormatter.formatAsDatetime(transaction.date)}
                      </td>
                    </tr>
                  ))}
                </MediaQuery>
                <MediaQuery minWidth={769}>
                    <tr className="table__header">
                      <th className="table__item">Hash</th>
                      <th className="table__item" width="200px">Date</th>
                      <th className="table__item" width="100px">Operations</th>
                    </tr>
                    {this.state.transactions.data.map((transaction) => (
                      <tr className="table__content" key={transaction.hash}>
                        <td className="table__item">
                          <Link to={`/transactions/${transaction.hash}`} className="link">
                            {transaction.hash}
                          </Link>
                        </td>
                        <td className="table__item">{dateFormatter.formatAsDatetime(transaction.date)}</td>
                        <td className="table__item">{transaction.operationCount}</td>
                      </tr>
                    ))}
                </MediaQuery>
              </tbody>
            </table>
            {
              this.state.transactions.data.length >= 10 &&
              <div className="paginator">
                { this.state.currentPage > 0 && <ActionButton onClick={this.previousPage}>Previous page</ActionButton> }
                <ActionButton onClick={this.nextPage} style={this.state.currentPage === 0 ? {marginLeft: 'auto'} : {} }>Next page</ActionButton>
              </div>
            }
          </Fragment>
        }
      </Fragment>
    );
  }
}

export default TransactionsTable;
