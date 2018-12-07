import React, { Component } from 'react';
import sebakService from '../sebak/service';
import Card from '../components/Card';
import FrozenAccountsTable from '../components/FrozenAccountsTable';

class FrozenAccounts extends Component {
  state = {
    frozenAccounts: undefined
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
  render() {
    return (
      <Card title="Freezing">
        <FrozenAccountsTable frozenAccounts={this.state.frozenAccounts}/>
      </Card>
    );
  }
}

export default FrozenAccounts;
