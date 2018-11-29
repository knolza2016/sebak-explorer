import React, { Component } from 'react';
import sebakService from '../sebak/service';
import Card from '../components/Card';
import OperationsTable from '../components/OperationsTable';
import LoadingIndicator from '../components/LoadingIndicator';
import NotFound from '../pages/NotFound';
import UnexpectedError from '../pages/UnexpectedError';

class Account extends Component {
  constructor(props) {
    super(props);
    this.state = {
      account: {
      }
    }
  }
  componentDidMount() {
    const { publicKey } = this.props.match.params;

    sebakService
      .getAccount(publicKey)
      .then(this.setAccountOnState)
      .catch(this.showErrorPage);

    sebakService
      .getOperationsForAccount(publicKey, {
        reverse: true,
        limit: 100
      })
      .then(this.setOperationsOnState)
      .catch(this.showErrorPage);
  }
  setAccountOnState = res => {
    this.setState({
      account: res
    });
  }
  setOperationsOnState = res => {
    this.setState(previousState => ({
      account: {
        ...previousState.account,
        operations: res
      }
    }));
  }
  showErrorPage = error => {
    if (error.response && error.response.status !== 200) {
      this.setState({
        notFound: true
      });
    } else {
      this.setState({
        notFound: true,
        error: true
      });
    }
  }
  render() {
    if(this.state.notFound) {
      return <NotFound/>
    }

    if(this.state.error) {
      return <UnexpectedError/>
    }

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
