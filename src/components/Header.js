import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Logos } from '../assets';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import './Header.css';

class Header extends Component {
  render() {
    return (
      <nav className="navbar">
        <div className="brand">
        <Link to={`/`}>
            <img src={Logos.Boscoin} alt="BOScoin explorer"/>
          </Link>
        </div>
        <input id="navbar__collapser" className="navbar__hamburger" type="checkbox" />
        <label htmlFor="navbar__collapser">
          <FontAwesomeIcon icon="bars" fixedWidth />
        </label>
        <ul className="navbar__menu">
          <li>
            <Link to={`/blocks`}>Blocks</Link>
          </li>
          <li>
            <Link to={`/transactions`}>Transactions</Link>
          </li>
          <li>
            <Link to={`/operations`}>Operations</Link>
          </li>
          <li>
            <Link to={`/freezing`}>Freezing</Link>
          </li>
        </ul>
      </nav>
    );
  }
}

export default Header;
