import React, { Component, Fragment } from 'react';
import sebakService from '../sebak/service';
import Card from '../components/Card';
import LoadingIndicator from '../components/LoadingIndicator';
import OutputText from '../components/OutputText';
import NotFound from '../pages/NotFound';
import UnexpectedError from './UnexpectedError';
import TransactionsTable from '../components/TransactionsTable';
import { dateFormatter, numberFormatter } from '../util/formatters';

class Block extends Component {
  state = {
    block: undefined,
    transactions: undefined
  }
  componentDidMount() {
    const { hash } = this.props.match.params;

    sebakService.getBlock(hash)
      .then(this.setBlockOnState)
      .then(block => sebakService.getTransaction(block.proposerTransactionHash))
      .then(this.setTransactionsOnState)
      .catch(this.showErrorPage);
  }
  setBlockOnState = block => {
    this.setState({
      block
    });

    return block;
  }
  setTransactionsOnState = transaction => {
    this.setState({
      transactions: {
        data: [transaction]
      }
    });
  }
  showErrorPage = error => {
    let state = {};

    if (error.response.status !== 200) {
      state.notFound = true;
    } else {
      state.unexpectedError = true;
    }

    this.setState(state);
  }
  render() {
    if(this.state.notFound) {
      return <NotFound/>
    }

    if(this.state.unexpectedError) {
      return <UnexpectedError/>
    }

    return (
      <Fragment>
        <Card title="Block">
          {
            !this.state.block &&
            <LoadingIndicator/>
          }
          {
            this.state.block &&
            <Fragment>
              <OutputText
                label="Hash"
                value={this.state.block.hash}
              />
              <OutputText
                label="Height"
                value={numberFormatter.format(this.state.block.height)}
              />
              <OutputText
                label="Date"
                value={dateFormatter.formatAsDatetime(this.state.block.date)}
              />
            </Fragment>
          }
        </Card>
        <Card title="Transactions">
          <TransactionsTable transactions={this.state.transactions}/>
        </Card>
      </Fragment>
    );
  }
}

export default Block;
