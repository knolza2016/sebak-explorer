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
        <ul className="menu">
          <li>
            <Link to={`/transactions`}>Transactions</Link>
          </li>
          <li>
            <Link to={`/operations`}>Operations</Link>
          </li>
        </ul>
      </div>
    );
  }
}

export default Header;
