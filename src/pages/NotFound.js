import React, { Component } from 'react';
import Card from '../components/Card';

class NotFound extends Component {
  render() {
    return (
      <Card title="Not found">
        The requested page does not exist.
      </Card>
    );
  }
}

export default NotFound;
