import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import './App.css';
import firebase from './Firebase';
import { Admin, Resource, ListGuesser } from 'react-admin';
// import Edit from './Edit';
import Create from './Create';
// import Show from './Show';

import jsonServerProvider from 'ra-data-json-server';

class ShowData extends Component {
  constructor(props) {
    super(props);
    this.ref = firebase.firestore().collection('user');
    this.unsubscribe = null;
    this.state = {
      user: []
    };
  }

  onCollectionUpdate = (querySnapshot) => {
    console.log(querySnapshot, "querySnapshot")
    const user = [];
    querySnapshot.forEach((doc) => {
      const { first_name, last_name, email } = doc.data();
      user.push({
        key: doc.id,
        doc, // DocumentSnapshot
        first_name,
        last_name,
        email,
      });
    });
    this.setState({
      user
   });
  }

  componentDidMount() {
    this.unsubscribe = this.ref.onSnapshot(this.onCollectionUpdate);
  }

  render() {
    const dataProvider = jsonServerProvider('http://jsonplaceholder.typicode.com');
    console.log(this.state.user, "this.state.user")
    return (
      <div class="container">

 <Router>
      <div>
        
        <Route path='/create' component={Create} />
       
      </div>
 



    
        <div class="panel panel-default">
          <div class="panel-heading">
            <h3 class="panel-title">
              USER LIST
            </h3>
          </div>
          <div class="panel-body">
            <h4><Link to="/create">Add Board</Link></h4>
            <table class="table table-stripe">
              <thead>
                <tr>
                  <th>First name</th>
                  <th>Last name</th>
                  <th>Email</th>
                </tr>
              </thead>
              <tbody>
                {this.state.user.map(userDetail =>
                  <tr>
                    <Link to={`/show/${userDetail.key}`}><td>{userDetail.first_name}</td></Link>
                    <td>{userDetail.last_name}</td>
                    <td>{userDetail.email}</td>

                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
         </Router>
      </div>
    );
  }
}

export default ShowData;