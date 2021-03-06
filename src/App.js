import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import './App.css';
import firebase from './Firebase';
import { Admin, Resource, ListGuesser } from 'react-admin';
import Edit from './Edit';
import ShowData from './ShowData';
import Create from './Create';
import Show from './Show';
import Login from './Login';

import jsonServerProvider from 'ra-data-json-server';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  
  render() {
    // console.log(this.state.user, "this.state.user")
    return (
      <div>
        <Router>
          <div>
            <Route authenticated={this.props.authenticated} path="/login" component={Login} />
            <Route path='/showData' component={ShowData} />
            <Route path='/create' component={Create} />
            <Route path='/edit/:id' component={Edit} />
            <Route path='/show/:id' component={Show} />       
          </div>

          <Link to="/login"  className="login-link"><span>Login</span></Link>
        </Router>
      </div>
    );
  }
}

export default App;