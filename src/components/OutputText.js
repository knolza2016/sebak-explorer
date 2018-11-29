import React, { Component } from 'react';
import './OutputText.css';

class OutputText extends Component {
  render() {
    return (
      <div className="output-text">
        <div className="label">
          {this.props.label}
        </div>
        <div className="output-text">
          {this.props.value}
        </div>
      </div>
    )
  }
}

export default OutputText;
