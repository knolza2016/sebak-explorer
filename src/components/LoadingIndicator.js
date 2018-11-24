import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

class LoadingIndicator extends Component {
  render() {
    return (
      <FontAwesomeIcon icon="circle-notch" className="loading-indicator" fixedWidth spin />
    );
  }
}

export default LoadingIndicator;
