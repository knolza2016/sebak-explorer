import React, { Component } from 'react';
import sebakService from '../sebak/service';
import Card from '../components/Card';
import OperationsTable from '../components/OperationsTable';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

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
    if (this.state.operations.length === 0) {
      return (
        <Card title="Operations">
          <FontAwesomeIcon icon="circle-notch" className="loading-indicator" fixedWidth spin />
        </Card>
      );
    }

    return (
      <Card title="Operations">
        <OperationsTable operations={this.state.operations}></OperationsTable>
      </Card>
    );
  }
}

export default Operations;
