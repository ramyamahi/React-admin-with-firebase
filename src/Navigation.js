import React, { Component } from 'react';
// import { Row, Column } from 'rebass';
import { BrowserRouter as Router, Route, Switch, NavLink } from 'react-router-dom';
import Edit from './Edit';
import ShowData from './ShowData';
import Create from './Create';
import Show from './Show';
import Login from './Login';

class Navigation extends Component {
  render() {
    return (
      <Router>
        <div>
          <div>
           
              <NavLink to="/">Home</NavLink>
              {this.props.authenticated ? (
                <span>
                  <NavLink to="/showData">User details</NavLink>
                  {/*<LogOut />*/}
                </span>
              ) : (
                <span>
                  <NavLink to="/login">Login</NavLink>
                  {/*<NavLink to="/register">Register</NavLink>*/}
                </span>
              )}
           
          </div>

          <Switch>
            <Route authenticated={this.props.authenticated} path="/login" component={Login} />
            <Route path='/showData' component={ShowData} />
            <Route path='/create' component={Create} />
            <Route path='/edit/:id' component={Edit} />
            <Route path='/show/:id' component={Show} />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default Navigation;