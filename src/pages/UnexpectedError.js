import React, { Component } from 'react';
import Card from '../components/Card';

class UnexpectedError extends Component {
  render() {
    return (
      <Card title="Unexpected error">
        An unexpected error has occurred. Please try again.
      </Card>
    );
  }
}

export default UnexpectedError;
