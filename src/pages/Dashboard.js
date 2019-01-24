import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import sebakService from '../sebak/service';
import Card from '../components/Card';
import LoadingIndicator from '../components/LoadingIndicator';
import OutputText from '../components/OutputText';
import { dateFormatter, numberFormatter } from '../util/formatters';
import { version as explorerVersion } from '../../package.json';
import preval from 'preval.macro'

class Dashboard extends Component {
  state = {
    netInformation: undefined
  }
  async componentDidMount() {
    this.setState({
      netInformation: (await sebakService.getNetInformation()).data
    })
  }
  render() {
    const { netInformation } = this.state;

    return (
      <Card title="SEBAK network information">
        {
          !netInformation &&
          <LoadingIndicator></LoadingIndicator>
        }
        {
          netInformation &&
          <Fragment>
            <OutputText
              label="Mainnet version"
              value={`${netInformation.version} built on ${dateFormatter.formatAsDatetime(netInformation.buildDate)}`}
            />
            <OutputText
              label="Explorer version"
              value={`${explorerVersion} built on ${dateFormatter.formatAsDatetime(preval`module.exports = new Date();`)}`}
            />
            <OutputText label="Current block height">
              <Link to={`/blocks/${netInformation.currentBlockHash}`} className="link">
                {numberFormatter.format(netInformation.currentBlockHeight)}
              </Link>
            </OutputText>
            <OutputText label="Total transactions">
              <Link to={`/transactions`} className="link">
                {numberFormatter.format(netInformation.totalTransactions)}
              </Link>
            </OutputText>
            <OutputText label="Total operations">
              <Link to={`/operations`} className="link">
                {numberFormatter.format(netInformation.totalOperations)}
              </Link>
            </OutputText>
          </Fragment>
        }
      </Card>
    );
  }
}

export default Dashboard;
