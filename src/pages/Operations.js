import React, { Component } from 'react';
import sebakService from '../sebak/service';
import Card from '../components/Card';
import OperationsTable from '../components/OperationsTable';
import LoadingIndicator from '../components/LoadingIndicator';

class Operations extends Component {
  constructor(props) {
    super(props);
    this.state = {
      operations: []
    }
  }
  async componentDidMount() {
    const operations = await sebakService.getOperations({
      limit: 10,
      reverse: true
    });

    this.setState({
      operations: operations
    });
  }
  render() {
    return (
      <Card title="Operations">
        {
          this.state.operations.length === 0 &&
          <LoadingIndicator/>
        }
        {
          this.state.operations.length > 0 &&
          <OperationsTable operations={this.state.operations}></OperationsTable>
        }
      </Card>
    );
  }
}

export default Operations;
