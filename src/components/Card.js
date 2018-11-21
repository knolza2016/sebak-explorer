import React, { Component } from 'react';
import './Card.css';

class Card extends Component {
  render() {
    return (
      <div className='card'>
        <div className="card__title">{this.props.title}</div>
        <div className="card__content">{this.props.children}</div>
      </div>
    );
  }
}

export default Card;
