import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import sebakService from '../sebak/service';
import Card from '../components/Card';
import OperationsTable from '../components/OperationsTable';
import LoadingIndicator from '../components/LoadingIndicator';
import OutputText from '../components/OutputText';
import NotFound from '../pages/NotFound';
import UnexpectedError from '../pages/UnexpectedError';
import stringFormatter from '../util/formatters/string.formatter';
import MediaQuery from 'react-responsive';

class Account extends Component {
  state = {
    account: undefined,
    operations: undefined,
    frozenAccounts: undefined
  }
  componentDidMount() {
    const { publicKey } = this.props.match.params;

    Promise.all([
      sebakService.getAccount(publicKey),
      sebakService.getOperationsForAccount(publicKey, {
        reverse: true,
        limit: 100
      }),
      sebakService.getFrozenAccountsForAccount(publicKey, {
        reverse: true,
        limit: 100 // todo reduce this once _links cursor is fixed
      })
    ]).then(async res => {
      let account = res[0];
      let operations = res[1];
      let frozenAccounts = res[2];

      account.balance += frozenAccounts.data.reduce((acc, frozenAccount) => { return acc + frozenAccount.amount }, 0);

      this.setAccountOnState(account)
      this.setOperationsOnState(operations)
      this.setFrozenAccountsOnState(frozenAccounts)
    })
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
  setFrozenAccountsOnState = frozenAccounts => {
    this.setState({
      frozenAccounts
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
  getFormattedFrozenAccountState(frozenAccount) {
    // todo verify state options
    switch(frozenAccount.state) {
      case 'frozen':
        return (
          <Fragment>
            Frozen in block <Link to={`/blocks/${frozenAccount.freezeBlockHeight}`} className="link">
              {frozenAccount.freezeBlockHeight}
            </Link>
          </Fragment>
        )
      case 'melting':
        return (
          <Fragment>
            Unfreezing since block <Link to={`/blocks/${frozenAccount.freezeBlockHeight}`} className="link">
              {frozenAccount.unfreezingBlockHeight}
            </Link> ({frozenAccount.unfreezingRemainingBlocks} blocks remaining)
          </Fragment>
        )
      default:
        return frozenAccount.state;
    }
  }
  getFrozenAccountStateAsSentence(frozenAccount) {
    // todo verify state options
    switch(frozenAccount.state) {
      case 'frozen':
        return (
          <Fragment>
            {frozenAccount.amount} BOS frozen in account <Link to={`/accounts/${frozenAccount.address}`} className="link">
              {stringFormatter.truncate(frozenAccount.address, 10, '...')}
            </Link> in block <Link to={`/blocks/${frozenAccount.freezeBlockHeight}`} className="link">
              {frozenAccount.freezeBlockHeight}
            </Link>
          </Fragment>
        )
      case 'melting':
        return (
          <Fragment>
            {frozenAccount.amount} BOS unfreezing in account <Link to={`/accounts/${frozenAccount.address}`} className="link">
              {stringFormatter.truncate(frozenAccount.address, 10, '...')}
            </Link> since block <Link to={`/blocks/${frozenAccount.unfreezingBlockHeight}`} className="link">
              {frozenAccount.unfreezingBlockHeight}
            </Link> ({frozenAccount.unfreezingRemainingBlocks} blocks remaining)
          </Fragment>
        )
      default:
        return frozenAccount.state;
    }
  }
  render() {
    const { notFound, error, account, operations, frozenAccounts } = this.state;

    if (notFound) {
      return <NotFound/>
    }

    if (error) {
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
        <Card title="Freezing">
          {
            !frozenAccounts &&
            <LoadingIndicator/>
          }
          {
            frozenAccounts && frozenAccounts.data.length === 0 &&
            <Fragment>
              This account is not freezing any BOS
            </Fragment>
          }
          {
            frozenAccounts && frozenAccounts.data.length > 0 &&
            <table className="table">
              <tbody>
                <MediaQuery maxWidth={768}>
                  {frozenAccounts.data.map((frozenAccount) => (
                    <tr className="table__content" key={frozenAccount.address}>
                      <td className="table__item">
                        {this.getFrozenAccountStateAsSentence(frozenAccount)}
                      </td>
                    </tr>
                  ))}
                </MediaQuery>
                <MediaQuery minWidth={769}>
                  <tr className="table__header">
                    <th className="table__item">Account</th>
                    <th className="table__item">State</th>
                    <th className="table__item  table__number">Amount</th>
                  </tr>
                  {frozenAccounts.data.map((frozenAccount) => (
                    <tr className="table__content" key={frozenAccount.address}>
                      <td className="table__item">
                        <Link to={`/accounts/${frozenAccount.address}`} className="link">
                          {stringFormatter.truncate(frozenAccount.address, 10, '...')}
                        </Link>
                      </td>
                      <td className="table__item">
                        {this.getFormattedFrozenAccountState(frozenAccount)}
                      </td>
                      <td className="table__item table__number">{`${frozenAccount.amount} BOS`}</td>
                    </tr>
                  ))}
                </MediaQuery>
              </tbody>
            </table>
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
