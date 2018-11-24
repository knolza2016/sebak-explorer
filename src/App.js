import React, { Component } from 'react';
import './App.css';
import Header from './components/Header';
import Card from './components/Card';
import { withRouter } from 'react-router-dom'
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import { faCircleNotch } from '@fortawesome/free-solid-svg-icons'
import Router from "./Router";

library.add(faSearch)
library.add(faCircleNotch)

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      identifier: ''
    };
  }
  handleIdentifierChange = (event) => {
    this.setState({
      identifier: event.target.value
    });
  }
  handleLookup = () => {
    const route = this.getRoute();

    if (route) {
      this.props.history.push(this.getRoute())
    }
  }
  getRoute = () => {
    const { identifier } = this.state;

    switch (identifier.length) {
      case 56:
        return `/accounts/${identifier}`
      case 44:
        return `/transactions/${identifier}`
      default:
        return '';
    }
  }
  render() {
    return (
      <div>
        <Header></Header>
        <div className="container">
          <div className="content">
            <Card title="Search">
              <div className="control">
                <input
                  className="input"
                  placeholder="Enter transaction id or public key"
                  value={this.state.identifier}
                  onChange={this.handleIdentifierChange}
                >
                </input>
                <button
                  className="btn"
                  onClick={this.handleLookup}
                >
                  <FontAwesomeIcon icon="search" fixedWidth />
                </button>
              </div>
            </Card>
            <Router></Router>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(App);
