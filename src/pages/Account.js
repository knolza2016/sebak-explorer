import React, { Component } from 'react';
import sebakService from '../sebak/service';
import Card from '../components/Card';
import OperationsTable from '../components/OperationsTable';
import LoadingIndicator from '../components/LoadingIndicator';

class Account extends Component {
  constructor(props) {
    super(props);
    this.state = {
      account: {
        operations: []
      }
    }
  }
  async componentDidMount() {
    const { publicKey } = this.props.match.params;

    const data = await Promise.all([
      sebakService.getAccount(publicKey),
      sebakService.getOperationsForAccount(publicKey)
    ]);

    const account = {
      ...data[0],
      operations: data[1]
    }

    this.setState({
      account: account
    });
  }
  render() {
    return (
      <React.Fragment>
        <Card title="Account">
          {
            !this.state.account.address &&
            <LoadingIndicator/>
          }
          {
            this.state.account.address &&
            <div>
              Public key: {this.state.account.address}
              <br/>
              Balance: {this.state.account.balance}
            </div>
          }
        </Card>
        <Card title="Operations">
          {
            this.state.account.operations.length === 0 &&
            <LoadingIndicator/>
          }
          {
            this.state.account.operations.length > 0 &&
            <OperationsTable operations={this.state.account.operations}></OperationsTable>
          }
        </Card>
      </React.Fragment>
    );
  }
}

export default Account;
