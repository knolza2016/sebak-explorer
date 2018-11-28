import React, { Component } from 'react';
import './ActionButton.css';

class ActionButton extends Component {
  render() {
    return (
      <button {...this.props} className='btn--action'>
        {this.props.children}
      </button>
    );
  }
}

export default ActionButton;
