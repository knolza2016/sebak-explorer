import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import dateFormatter from '../util/formatters/date.formatter';
import stringFormatter from '../util/formatters/string.formatter';
import sebakService from '../sebak/service';
import Card from '../components/Card';
import LoadingIndicator from '../components/LoadingIndicator';
import ActionButton from '../components/ActionButton';
import MediaQuery from 'react-responsive';

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
