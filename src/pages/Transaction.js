import React, { Component } from 'react';
import sebakService from '../sebak/service';
import Card from '../components/Card';
import OperationsTable from '../components/OperationsTable';
import LoadingIndicator from '../components/LoadingIndicator';
import dateFormatter from '../util/formatters/date.formatter';
import NotFound from '../pages/NotFound';

class Account extends Component {
  constructor(props) {
    super(props);
    this.state = {
      transaction: {
      }
    }
  }
  async componentDidMount() {
    const { hash } = this.props.match.params;

    sebakService.getTransaction(hash)
      .then(this.setTransactionOnState)
      .then(transaction => sebakService.getOperationsForTransaction(transaction))
      .then(this.setOperationsOnState)
      .catch(this.showErrorPage);
  }
  setTransactionOnState = transaction => {
    this.setState({
      transaction: transaction
    });

    return transaction;
  }
  setOperationsOnState = res => {
    this.setState(previousState => ({
      transaction: {
        ...previousState.transaction,
        operations: res
      }
    }));
  }
  showErrorPage = error => {
    if (error.response.status !== 200) {
      this.setState({
        notFound: true
      });
    }
  }
  render() {
    if(this.state.notFound) {
      return <NotFound/>
    }

    return (
      <React.Fragment>
        <Card title="Transaction">
          {
            !this.state.transaction.hash &&
            <LoadingIndicator/>
          }
          {
            this.state.transaction.hash &&
            <div>
              Hash: {this.state.transaction.hash}
              <br/>
              Date: {dateFormatter.formatAsDatetime(this.state.transaction.date)}
              <br/>
              Block: {this.state.transaction.block}
            </div>
          }
        </Card>
        <Card title="Operations">
          {
            !this.state.transaction.operations &&
            <LoadingIndicator/>
          }
          {
            this.state.transaction.operations &&
            <OperationsTable operations={this.state.transaction.operations}></OperationsTable>
          }
        </Card>
      </React.Fragment>
    );
  }
}

export default Account;
