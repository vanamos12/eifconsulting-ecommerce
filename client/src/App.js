
import React, { Component } from 'react';
import { Link, Route, Switch } from 'react-router-dom';
import Header from './components/Header'
import MenuMobile from './components/MenuMobile'
import Home from './components/Home';
import Cart from './components/cart/Cart'
import Detail from './components/Detail'
import Default from './components/Default'
import {ApplicationConsumer} from './context'
import Secret from './Secret';
import LoginFrontEnd from './components/LoginFrontEnd';
import SignUpFrontEnd from './components/SignUpFrontEnd';
import AdministrationFrontEnd from './components/frontend/AdministrationFrontEnd'
import withAuth from './withAuth';

export default class App extends Component {
  render() {
    return (
      <div className="super_container">
        <ApplicationConsumer>
          {value=>(
            <React.Fragment>
              <Header value={value}/>
            
              <MenuMobile/>
              <Switch>
                <Route path="/" exact component={Home} />
                <Route path="/cart" component={Cart} />
                <Route path="/detail" component={Detail} />
                <Route path="/secret" component={withAuth(Secret)} />
                <Route 
                  path="/loginfrontend/:destination" 
                  render={(props) => <LoginFrontEnd {...props} value={value}/>} 
                />
                <Route 
                  path="/administrationfrontend/" 
                  render={(props) => <AdministrationFrontEnd {...props} value={value}/>} 
                />
                <Route path="/signupfrontend" component={SignUpFrontEnd} />
                {/* Insert the default route */}
                <Route  component={Default} />
              </Switch>
            </React.Fragment>
          )}
          
        </ApplicationConsumer>
      </div>
    );
  }
}