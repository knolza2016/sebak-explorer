import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import Transactions from "./pages/Transactions";
import Operations from "./pages/Operations";
import Account from "./pages/Account";

class Router extends Component {
  render() {
    return (
      <div>
        <Route path="/transactions" component={Transactions}></Route>
        <Route path="/operations" component={Operations}></Route>
        <Route path="/accounts/:publicKey" render={props => {
          return <Account {...props} key={props.match.params.publicKey}></Account>
        }}></Route>
      </div>
    );
  }
}

export default Router;
