import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import firebase from './Firebase';
import { Link } from 'react-router-dom';

class Create extends Component {

  constructor() {
    super();
    this.ref = firebase.firestore().collection('user');
    this.state = {
      first_name: '',
      last_name: '',
      email: ''
    };
  }
  onChange = (e) => {
    const state = this.state
    state[e.target.name] = e.target.value;
    this.setState(state);
  }

  onSubmit = (e) => {
    e.preventDefault();
    const { first_name, last_name, email } = this.state;
    this.ref.add({
      first_name,
      last_name,
      email
    }).then((docRef) => {
      this.setState({
        first_name: '',
        last_name: '',
        email: ''
      });
      this.props.history.push("/showData")
    })
    .catch((error) => {
      console.error("Error adding document: ", error);
    });
  }

  render() {
    const { first_name, last_name, email } = this.state;
    return (
      <div>
        <h3>ADD USER</h3>
        <div>
          {/*<h4><Link to="/" class="btn btn-primary">Book List</Link></h4>*/}
          <form onSubmit={this.onSubmit}>
            <div>
              <label for="first_name">First name:</label>
              <input type="text" name="first_name" value={first_name} onChange={this.onChange} placeholder="First name" />
            </div><br/>
            <div>
              <label for="last_name">Last name:</label>
              <input type="text" name="last_name" value={last_name} onChange={this.onChange} placeholder="Last name" />
            </div><br/>
            <div>
              <label for="email">Email:</label>
              <input type="text" name="email" value={email} onChange={this.onChange} placeholder="Email" />
            </div><br/>
            <button type="submit">Submit</button>
          </form>
        </div>
      </div>
    );
  }
}

export default Create;