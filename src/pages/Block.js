import React, { Component, Fragment } from 'react';
import sebakService from '../sebak/service';
import Card from '../components/Card';
import LoadingIndicator from '../components/LoadingIndicator';
import OutputText from '../components/OutputText';
import dateFormatter from '../util/formatters/date.formatter';
import NotFound from '../pages/NotFound';
import UnexpectedError from './UnexpectedError';

class Block extends Component {
  constructor(props) {
    super(props);
    this.state = {
      block: {
      }
    }
  }
  async componentDidMount() {
    const { hash } = this.props.match.params;

    // todo show confirmed transations for block

    sebakService.getBlock(hash)
      .then(this.setBlockOnState)
      .catch(this.showErrorPage);
  }
  setBlockOnState = block => {
    this.setState({
      block
    });

    return block;
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
            !this.state.block.hash &&
            <LoadingIndicator/>
          }
          {
            this.state.block.hash &&
            <Fragment>
              <OutputText
                label="Hash"
                value={this.state.block.hash}
              />
              <OutputText
                label="Height"
                value={this.state.block.height}
              />
              <OutputText
                label="Date"
                value={dateFormatter.formatAsDatetime(this.state.block.date)}
              />
            </Fragment>
          }
        </Card>
      </Fragment>
    );
  }
}

export default Block;
