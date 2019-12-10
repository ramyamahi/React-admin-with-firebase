import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import './App.css';
import firebase from './Firebase';
import { Admin, Resource, ListGuesser } from 'react-admin';
import Create from './Create';
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
      <div>    
          <div>
            <h3>USER LIST</h3>
          </div>
          <div>
            <h4><Link to="/create">Add User</Link></h4>
            <table>
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
    );
  }
}

export default ShowData;