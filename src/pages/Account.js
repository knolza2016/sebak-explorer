import React, { Component } from 'react';
import sebakService from '../sebak/service';
import Card from '../components/Card';
import OperationsTable from '../components/OperationsTable';

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
      <div>
        <Card title="Account">
          Public key: {this.state.account.address}
          <br/>
          Balance: {this.state.account.balance}
        </Card>
        <Card title="Operations">
          <OperationsTable operations={this.state.account.operations}></OperationsTable>
        </Card>
      </div>
    );
  }
}

export default Account;
