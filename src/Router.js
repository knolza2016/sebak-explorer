import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import Dashboard from "./pages/Dashboard";
import Transactions from "./pages/Transactions";
import Transaction from "./pages/Transaction";
import Operations from "./pages/Operations";
import Account from "./pages/Account";
import NotFound from "./pages/NotFound";
import Blocks from "./pages/Blocks";
import Block from './pages/Block';
import FrozenAccounts from './pages/FrozenAccounts';

class Router extends Component {
  render() {
    return (
      <React.Fragment>
        <Switch>
          <Route exact path="/transactions/:hash" render={props => {
            return <Transaction {...props} key={props.match.params.hash}/>
          }}/>/>
          <Route exact path="/transactions" component={Transactions}/>
          <Route exact path="/operations" component={Operations}/>
          <Route exact path="/blocks/:hash" render={props => {
            return <Block {...props} key={props.match.params.hash}/>
          }}/>
          <Route exact path="/blocks" component={Blocks}/>
          <Route exact path="/freezing" component={FrozenAccounts}/>
          <Route exact path="/accounts/:publicKey" render={props => {
            return <Account {...props} key={props.match.params.publicKey}/>
          }}/>
          <Route exact path="/" component={Dashboard}/>
          <Route component={NotFound} />
        </Switch>
      </React.Fragment>
    );
  }
}

export default Router;
