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
      this.props.history.push("/")
    })
    .catch((error) => {
      console.error("Error adding document: ", error);
    });
  }

  render() {
    const { first_name, last_name, email } = this.state;
    return (
      <div class="container">
        <div class="panel panel-default">
          <div class="panel-heading">
            <h3 class="panel-title">
              ADD BOARD
            </h3>
          </div>
          <div class="panel-body">
            <h4><Link to="/" class="btn btn-primary">Book List</Link></h4>
            <form onSubmit={this.onSubmit}>
              <div class="form-group">
                <label for="first_name">First name:</label>
                <input type="text" class="form-control" name="first_name" value={first_name} onChange={this.onChange} placeholder="Title" />
              </div>
              <div class="form-group">
                <label for="last_name">Last name:</label>
                <input type="text" class="form-control" name="last_name" value={last_name} onChange={this.onChange} placeholder="Title" />
              </div>
              <div class="form-group">
                <label for="email">Email:</label>
                <input type="text" class="form-control" name="email" value={email} onChange={this.onChange} placeholder="Author" />
              </div>
              <button type="submit" class="btn btn-success">Submit</button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default Create;