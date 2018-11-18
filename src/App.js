import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import './App.css';
import Header from './components/Header';
import routes from './routes';

class App extends Component {
  render() {
    return (
      <div>
        <Header></Header>
        <div className="container">
          <div className="content">
            {routes.map((route) => (
              <Route key={route} path={route.path} component={route.component}/>
            ))}
          </div>
        </div>
      </div>
    );
  }
}

export default App;
