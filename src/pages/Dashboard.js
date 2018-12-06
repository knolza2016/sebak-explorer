import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import sebakService from '../sebak/service';
import Card from '../components/Card';
import LoadingIndicator from '../components/LoadingIndicator';
import OutputText from '../components/OutputText';
import dateFormatter from '../util/formatters/date.formatter';

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      netInformation: undefined
    }
  }
  async componentDidMount() {
    this.setState({
      netInformation: (await sebakService.getNetInformation()).data
    })
  }
  render() {
    const { netInformation } = this.state;

    return (
      <Card title="Network information">
        {
          !netInformation &&
          <LoadingIndicator></LoadingIndicator>
        }
        {
          netInformation &&
          <Fragment>
            <OutputText
              label="Version"
              value={`${netInformation.version} built on ${dateFormatter.formatAsDatetime(netInformation.buildDate)}`}
            />
            <OutputText label="Current block height">
              <Link to={`/blocks/${netInformation.currentBlockHash}`} className="link">
                {netInformation.currentBlockHeight}
              </Link>
            </OutputText>
            <OutputText label="Total transactions">
              <Link to={`/transactions`} className="link">
                {netInformation.totalTransactions}
              </Link>
            </OutputText>
            <OutputText label="Total operations">
              <Link to={`/operations`} className="link">
                {netInformation.totalOperations}
              </Link>
            </OutputText>
            <OutputText label="Total supply">
              {netInformation.supply} BOS
            </OutputText>
          </Fragment>
        }
      </Card>
    );
  }
}

export default Dashboard;
