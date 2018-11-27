import React, { Component } from 'react';
import Card from '../components/Card';

class NotFound extends Component {
  render() {
    return (
      <Card title="Not found">
        The page you have requested does not exist.
      </Card>
    );
  }
}

export default NotFound;
