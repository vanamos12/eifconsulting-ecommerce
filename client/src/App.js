
import React, { Component } from 'react';
import { Link, Route, Switch } from 'react-router-dom';
import Home from './Home';
import Secret from './Secret';
import Login from './Login';
import SignUp from './SignUp';
import withAuth from './withAuth';

export default class App extends Component {
  render() {
    return (
      <div className="super_container">
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/secret">Secret</Link></li>
          <li><Link to="/login">Login</Link></li>
          <li><Link to="/signup">Sign up</Link></li>
        </ul>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/secret" component={withAuth(Secret)} />
          <Route path="/login" component={Login} />
          <Route path="/signup" component={SignUp} />
        </Switch>
      </div>
    );
  }
}