import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import sebakService from '../sebak/service';
import Card from '../components/Card';
import OperationsTable from '../components/OperationsTable';
import LoadingIndicator from '../components/LoadingIndicator';
import OutputText from '../components/OutputText';
import NotFound from '../pages/NotFound';
import UnexpectedError from '../pages/UnexpectedError';
import MediaQuery from 'react-responsive';
import { currencyFormatter, numberFormatter, stringFormatter } from '../util/formatters';
import { UNFREEZING_PERIOD } from '../sebak/variables';

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

      account.balance += frozenAccounts.data
        .filter(frozenAccount => frozenAccount.state !== 'returned')
        .reduce((balance, frozenAccount) => { return balance + frozenAccount.amount }, 0);

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
              {numberFormatter.format(frozenAccount.freezeBlockHeight)}
            </Link>
          </Fragment>
        )
      case 'unfrozen':
        return (
          <Fragment>
            Unfrozen in block <Link to={`/blocks/${frozenAccount.unfreezingBlockHeight + UNFREEZING_PERIOD}`} className="link">
              {numberFormatter.format(frozenAccount.unfreezingBlockHeight + UNFREEZING_PERIOD)}
            </Link>
          </Fragment>
        )
      case 'melting':
        return (
          <Fragment>
            Unfreezing since block <Link to={`/blocks/${frozenAccount.freezeBlockHeight}`} className="link">
              {numberFormatter.format(frozenAccount.unfreezingBlockHeight)}
            </Link> ({numberFormatter.format(frozenAccount.unfreezingRemainingBlocks)} blocks remaining)
          </Fragment>
        )
      case 'returned':
        return 'Returned'
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
            {currencyFormatter.formatAsBos(frozenAccount.amount)} BOS frozen in account <Link to={`/accounts/${frozenAccount.address}`} className="link">
              {stringFormatter.truncate(frozenAccount.address, 10, '...')}
            </Link> in block <Link to={`/blocks/${frozenAccount.freezeBlockHeight}`} className="link">
              {numberFormatter.format(frozenAccount.freezeBlockHeight)}
            </Link>
          </Fragment>
        )
      case 'unfrozen':
        return (
          <Fragment>
            {currencyFormatter.formatAsBos(frozenAccount.amount)} BOS unfrozen in account <Link to={`/accounts/${frozenAccount.address}`} className="link">
              {stringFormatter.truncate(frozenAccount.address, 10, '...')}
            </Link> in block <Link to={`/blocks/${frozenAccount.unfreezingBlockHeight + UNFREEZING_PERIOD}`} className="link">
              {numberFormatter.format(frozenAccount.unfreezingBlockHeight + UNFREEZING_PERIOD)}
            </Link>
          </Fragment>
        )
      case 'melting':
        return (
          <Fragment>
            {currencyFormatter.formatAsBos(frozenAccount.amount)} BOS unfreezing in account <Link to={`/accounts/${frozenAccount.address}`} className="link">
              {stringFormatter.truncate(frozenAccount.address, 10, '...')}
            </Link> since block <Link to={`/blocks/${frozenAccount.unfreezingBlockHeight}`} className="link">
              {numberFormatter.format(frozenAccount.unfreezingBlockHeight)}
            </Link> ({numberFormatter.format(frozenAccount.unfreezingRemainingBlocks)} blocks remaining)
          </Fragment>
        )
      case 'returned':
        return (
          <Fragment>
            {currencyFormatter.formatAsBos(frozenAccount.amount)} BOS returned from account <Link to={`/accounts/${frozenAccount.address}`} className="link">
              {stringFormatter.truncate(frozenAccount.address, 10, '...')}
            </Link>
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
                label="Public address"
                value={account.address}
              />
              <OutputText
                label="Balance"
                value={`${currencyFormatter.formatAsBos(account.balance)} BOS`}
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
                      <td className="table__item table__number">{`${currencyFormatter.formatAsBos(frozenAccount.amount)} BOS`}</td>
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
