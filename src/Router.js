import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import Transactions from "./pages/Transactions";
import Transaction from "./pages/Transaction";
import Operations from "./pages/Operations";
import Account from "./pages/Account";
import NotFound from "./pages/NotFound";

class Router extends Component {
  render() {
    return (
      <React.Fragment>
        <Switch>
          <Route path="/transactions/:hash" component={Transaction}></Route>
          <Route path="/transactions/" component={Transactions}></Route>
          <Route path="/operations" component={Operations}></Route>
          <Route path="/accounts/:publicKey" render={props => {
            return <Account {...props} key={props.match.params.publicKey}></Account>
          }}></Route>
          <Route component={NotFound} />
        </Switch>
      </React.Fragment>
    );
  }
}

export default Router;
