
import React, { Component } from 'react';
import { Link, Route, Switch } from 'react-router-dom';
import Header from './components/Header'
import MenuMobile from './components/MenuMobile'
import Home from './components/Home';
import {ApplicationConsumer} from './context'
import Secret from './Secret';
import Login from './Login';
import SignUp from './SignUp';
import withAuth from './withAuth';

export default class App extends Component {
  render() {
    return (
      <div className="super_container">
        <ApplicationConsumer>
          {value=>(
            <Header value={value}/>
          )}
          
        </ApplicationConsumer>
        <MenuMobile/>
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