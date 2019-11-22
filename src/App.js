import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './App.css';
import firebase from './Firebase';

class App extends Component {
  constructor(props) {
    super(props);
    this.ref = firebase.firestore().collection('user');
    this.unsubscribe = null;
    this.state = {
      user: []
    };
  }

  onCollectionUpdate = (querySnapshot) => {
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
    return (
      <div class="container">
        <div class="panel panel-default">
          <div class="panel-heading">
            <h3 class="panel-title">
              USER LIST
            </h3>
          </div>
          <div class="panel-body">
            <h4></h4>
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
                    <td>{userDetail.first_name}</td>
                    <td>{userDetail.last_name}</td>
                    <td>{userDetail.email}</td>

                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }
}

export default App;