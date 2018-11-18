import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Logos } from '../assets';
import './Header.css';

class Header extends Component {
  render() {
    return (
      <div className='header'>
        <Link to={`/`} className="brand">
          <img src={Logos.Boscoin} alt="BOScoin explorer"/>
        </Link>
        <Link to={`/transactions`}>Transactions</Link>
      </div>
    );
  }
}

export default Header;
