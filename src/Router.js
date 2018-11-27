import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import Dashboard from "./pages/Dashboard";
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
          <Route path="/transactions/:hash" render={props => {
            return <Transaction {...props} key={props.match.params.hash}/>
          }}/>/>
          <Route path="/transactions/" component={Transactions}/>
          <Route path="/operations" component={Operations}/>
          <Route path="/accounts/:publicKey" render={props => {
            return <Account {...props} key={props.match.params.publicKey}/>
          }}/>
          <Route path="/" component={Dashboard}/>
          <Route component={NotFound} />
        </Switch>
      </React.Fragment>
    );
  }
}

export default Router;
