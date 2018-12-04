import React, { Component, Fragment } from 'react';
import sebakService from '../sebak/service';
import Card from '../components/Card';
import OperationsTable from '../components/OperationsTable';
import LoadingIndicator from '../components/LoadingIndicator';
import OutputText from '../components/OutputText';
import NotFound from '../pages/NotFound';
import UnexpectedError from '../pages/UnexpectedError';

class Account extends Component {
  state = {
    account: undefined,
    operations: undefined
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
  setAccountOnState = account => {
    this.setState({
      account
    });
  }
  setOperationsOnState = operations => {
    this.setState({
      operations
    });
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
    const { notFound, error, account, operations } = this.state;

    if(notFound) {
      return <NotFound/>
    }

    if(error) {
      return <UnexpectedError/>
    }

    return (
      <Fragment>
        <Card title="Account">
          {
            !account &&
            <LoadingIndicator/>
          }
          {
            account &&
            <Fragment>
              <OutputText
                label="Public key"
                value={account.address}
              />
              <OutputText
                label="Balance"
                value={`${account.balance} BOS`}
              />
            </Fragment>
          }
        </Card>
        <Card title="Operations">
          {
            !operations &&
            <LoadingIndicator/>
          }
          {
            operations &&
            <OperationsTable operations={operations}/>
          }
        </Card>
      </Fragment>
    );
  }
}

export default Account;
