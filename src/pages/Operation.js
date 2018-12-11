import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import sebakService from '../sebak/service';
import Card from '../components/Card';
import LoadingIndicator from '../components/LoadingIndicator';
import OutputText from '../components/OutputText';
import NotFound from '../pages/NotFound';
import { currencyFormatter, dateFormatter, typeFormatter } from '../util/formatters';

class Transaction extends Component {
  state = {
    operation: undefined
  }
  async componentDidMount() {
    const { hash } = this.props.match.params;
    const transactionHash = hash.split("-")[1];

    sebakService.getTransaction(transactionHash)
      .then(this.getOperation)
      .then(this.setOperationOnState)
      .catch(this.showErrorPage);
  }
  getOperation = async (transaction) => {
    const { hash } = this.props.match.params;
    return this.getOperationByHash(await sebakService.getOperationsForTransaction(transaction, { limit: 100 }), hash)
  }
  getOperationByHash = async (operations, hash) => {
    const operation = operations.data.find(operation => operation.hash === hash);
    return operation ? operation : this.getOperationByHash(await operations.next(), hash);
  }
  setOperationOnState = operation => {
    this.setState({
      operation
    });
  }
  showErrorPage = error => {
    if (error.response.status !== 200) {
      this.setState({
        notFound: true
      });
    }
  }
  render() {
    const { operation, notFound } = this.state;

    if(notFound) {
      return <NotFound/>
    }

    return (
      <Fragment>
        <Card title="Operation">
          {
            !operation &&
            <LoadingIndicator/>
          }
          {
            operation &&
            <Fragment>
              <OutputText label="Hash" value={operation.hash}/>
              <OutputText label="Transaction">
                <Link to={`/transactions/${operation.transactionHash}`} className="link">
                  {operation.transactionHash}
                </Link>
              </OutputText>
              <OutputText label="Type" value={typeFormatter.formatOperationType(operation.type)}/>
              <OutputText label="Date" value={dateFormatter.formatAsDatetime(operation.date)}/>
              <OutputText label="From">
                <Link to={`/accounts/${operation.source}`} className="link">
                  {operation.source}
                </Link>
              </OutputText>
              { operation.type !== 'unfreezing-request' &&
                <Fragment>
                  <OutputText label="To">
                    <Link to={`/accounts/${operation.target}`} className="link">
                      {operation.target}
                    </Link>
                  </OutputText>
                  <OutputText label="Amount" value={`${currencyFormatter.formatAsBos(operation.amount)} BOS`}/>
                </Fragment>
              }
            </Fragment>
          }
        </Card>
      </Fragment>
    );
  }
}

export default Transaction;
