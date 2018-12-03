import React, { Component } from 'react';
import sebakService from '../sebak/service';
import Card from '../components/Card';
import TransactionsTable from '../components/TransactionsTable';

class Transactions extends Component {
  state = {
    transactions: undefined
  }
  async componentDidMount() {
    const transactions = await sebakService.getTransactions({
      reverse: true,
      limit: 10
    });

    this.setState({
      transactions
    });
  }
  render() {
    return (
      <Card title="Transactions">
        <TransactionsTable transactions={this.state.transactions}/>
      </Card>
    );
  }
}

export default Transactions;
