import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import sebakService from '../sebak/service';
import Card from '../components/Card';
import OperationsTable from '../components/OperationsTable';
import LoadingIndicator from '../components/LoadingIndicator';
import OutputText from '../components/OutputText';
import { dateFormatter } from '../util/formatters';
import NotFound from '../pages/NotFound';

class Transaction extends Component {
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
      <Fragment>
        <Card title="Transaction">
          {
            !this.state.transaction.hash &&
            <LoadingIndicator/>
          }
          {
            this.state.transaction.hash &&
            <Fragment>
              <OutputText
                label="Hash"
                value={this.state.transaction.hash}
              />
              <OutputText label="Block">
                <Link to={`/blocks/${this.state.transaction.block}`} className="link">
                  {this.state.transaction.block}
                </Link>
              </OutputText>
              <OutputText
                label="Date"
                value={dateFormatter.formatAsDatetime(this.state.transaction.date)}
              />
            </Fragment>
          }
        </Card>
        <Card title="Operations">
          {
            !this.state.transaction.operations &&
            <LoadingIndicator/>
          }
          {
            this.state.transaction.operations &&
            <OperationsTable operations={this.state.transaction.operations.data}></OperationsTable>
          }
        </Card>
      </Fragment>
    );
  }
}

export default Transaction;
