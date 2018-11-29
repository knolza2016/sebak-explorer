import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import stringFormatter from '../util/formatters/string.formatter';
import sebakService from '../sebak/service';
import Card from '../components/Card';
import LoadingIndicator from '../components/LoadingIndicator';
import ActionButton from '../components/ActionButton';
import MediaQuery from 'react-responsive';

class FrozenAccounts extends Component {
  constructor(props) {
    super(props);
    this.state = {
      frozenAccounts: {
        data: []
      },
      currentPage: 0
    }
  }
  async componentDidMount() {
    const frozenAccounts = await sebakService.getFrozenAccounts({
      reverse: true,
      limit: 10
    });

    this.setState({
      frozenAccounts
    });
  }
  previousPage = () => {
    const { frozenAccounts, currentPage } = this.state;
    this.paginate(frozenAccounts.next(), currentPage - 1);
  }
  nextPage = () => {
    const { frozenAccounts, currentPage } = this.state;
    this.paginate(frozenAccounts.previous(), currentPage + 1);
  }
  paginate = (linkPromise, page) => {
    const { currentPage } = this.state;

    this.setState({
      frozenAccounts: {
        data: []
      }
    });

    linkPromise.then(frozenAccounts => {
      this.setState({
        frozenAccounts: page < currentPage  ? this._reverseOrder(frozenAccounts) : frozenAccounts,
        currentPage: page
      });
    });
  }
  getFormattedState(state) {
    // todo verify state options
    switch(state) {
      case 'frozen':
        return 'Frozen';
      case 'melting':
        return 'Melting';
      default:
        return state;
    }
  }
  getStateInSimplePastTense(state) {
    // todo verify state options
    switch(state) {
      case 'frozen':
        return 'froze';
      case 'melting':
        return 'melted';
      default:
        return state;
    }
  }
  _reverseOrder = (frozenAccounts) => {
    frozenAccounts.data = frozenAccounts.data.reverse()
    return frozenAccounts
  }
  render() {
    return (
      <Card title="Freezing">
        {
          this.state.frozenAccounts.data.length === 0 &&
          <LoadingIndicator/>
        }
        {
          this.state.frozenAccounts.data.length > 0 &&
          <Fragment>
              <table className="table">
              <tbody>
                <MediaQuery maxWidth={768}>
                    {this.state.frozenAccounts.data.map((frozenAccount) => (
                      <tr className="table__content" key={frozenAccount.address}>
                        <td className="table__item">
                          <Link to={`/accounts/${frozenAccount.parentAddress}`} className="link">
                            {stringFormatter.truncate(frozenAccount.parentAddress, 10, '...')}
                          </Link> {this.getStateInSimplePastTense(frozenAccount.state)} {frozenAccount.amount} BOS in <Link to={`/accounts/${frozenAccount.address}`} className="link">
                            {stringFormatter.truncate(frozenAccount.address, 10, '...')}
                          </Link> in block <Link to={`/blocks/${frozenAccount.freezeBlockHeight}`} className="link">
                              {frozenAccount.freezeBlockHeight}
                            </Link>
                        </td>
                      </tr>
                    ))}
                  </MediaQuery>
                  <MediaQuery minWidth={769}>
                      <tr className="table__header">
                        <th className="table__item">From</th>
                        <th className="table__item">To</th>
                        <th className="table__item">Block</th>
                        <th className="table__item">State</th>
                        <th className="table__item table__number">Amount</th>
                      </tr>
                      {this.state.frozenAccounts.data.map((frozenAccount) => (
                        <tr className="table__content" key={frozenAccount.address}>
                          <td className="table__item">
                            <Link to={`/accounts/${frozenAccount.parentAddress}`} className="link">
                              {stringFormatter.truncate(frozenAccount.parentAddress, 10, '...')}
                            </Link>
                          </td>
                          <td className="table__item">
                            <Link to={`/accounts/${frozenAccount.address}`} className="link">
                              {stringFormatter.truncate(frozenAccount.address, 10, '...')}
                            </Link>
                          </td>
                          <td className="table__item">
                            <Link to={`/blocks/${frozenAccount.freezeBlockHeight}`} className="link">
                              {frozenAccount.freezeBlockHeight}
                            </Link>
                          </td>
                          <td className="table__item">
                            {this.getFormattedState(frozenAccount.state)}
                          </td>
                          <td className="table__item table__number">
                            {frozenAccount.amount} BOS
                          </td>
                        </tr>
                      ))}
                  </MediaQuery>
                </tbody>
              </table>
              <div className="paginator">
                { this.state.currentPage > 0 && <ActionButton onClick={this.previousPage}>Previous page</ActionButton> }
                <ActionButton onClick={this.nextPage} style={this.state.currentPage === 0 ? {marginLeft: 'auto'} : {} }>Next page</ActionButton>
              </div>
          </Fragment>
        }
      </Card>
    );
  }
}

export default FrozenAccounts;
