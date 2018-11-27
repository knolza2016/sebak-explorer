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
      }
    }
  }
  async componentDidMount() {
    const { publicKey } = this.props.match.params;

    sebakService.getAccount(publicKey).then(res => {
      this.setState({
        account: res
      });
    });

    sebakService.getOperationsForAccount(publicKey, {
      reverse: true,
      limit: 100
    }).then(res => {
      this.setState(previousState => ({
        account: {
          ...previousState.account,
          operations: res
        }
      }));
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
            !this.state.account.operations &&
            <LoadingIndicator/>
          }
          {
            this.state.account.operations &&
            <OperationsTable operations={this.state.account.operations}></OperationsTable>
          }
        </Card>
      </React.Fragment>
    );
  }
}

export default Account;
