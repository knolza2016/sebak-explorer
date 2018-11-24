import React, { Component } from 'react';
import sebakService from '../sebak/service';
import Card from '../components/Card';
import OperationsTable from '../components/OperationsTable';
import LoadingIndicator from '../components/LoadingIndicator';
import dateFormatter from '../util/formatters/date.formatter';

class Account extends Component {
  constructor(props) {
    super(props);
    this.state = {
      transaction: {
        operations: []
      }
    }
  }
  async componentDidMount() {
    const { hash } = this.props.match.params;

    const transaction = await sebakService.getTransaction(hash);
    transaction.operations = await sebakService.getOperationsForTransaction(transaction);

    this.setState({
      transaction: transaction
    });
  }
  render() {
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
            this.state.transaction.operations.length === 0 &&
            <LoadingIndicator/>
          }
          {
            this.state.transaction.operations.length > 0 &&
            <OperationsTable operations={this.state.transaction.operations}></OperationsTable>
          }
        </Card>
      </React.Fragment>
    );
  }
}

export default Account;
