import React, { Component } from 'react';
import firebase from './Firebase';
import { Link } from 'react-router-dom';

class Edit extends Component {

  constructor(props) {
    super(props);
    this.state = {
      key: '',
      first_name: '',
      last_name: '',
      email: ''
    };
  }

  componentDidMount() {
    const ref = firebase.firestore().collection('user').doc(this.props.match.params.id);
    ref.get().then((doc) => {
      if (doc.exists) {
        const userDetail = doc.data();
        this.setState({
          key: doc.id,
          first_name: userDetail.first_name,
          last_name: userDetail.last_name,
          email: userDetail.email
        });
      } else {
        console.log("No such document!");
      }
    });
  }

  onChange = (e) => {
    const state = this.state
    state[e.target.name] = e.target.value;
    this.setState({userDetail:state});
  }

  onSubmit = (e) => {
    e.preventDefault();

    const { first_name, last_name, email } = this.state;

    const updateRef = firebase.firestore().collection('user').doc(this.state.key);
    updateRef.set({
      first_name,
      last_name,
      email
    }).then((docRef) => {
      this.setState({
        key: '',
        first_name: '',
        last_name: '',
        email: ''
      });
      this.props.history.push("/show/"+this.props.match.params.id)
    })
    .catch((error) => {
      console.error("Error adding document: ", error);
    });
  }

  render() {
    return (
      <div class="container">
        <div class="panel panel-default">
          <div class="panel-heading">
            <h3 class="panel-title">
              EDIT BOARD
            </h3>
          </div>
          <div class="panel-body">
            <h4><Link to={`/show/${this.state.key}`} class="btn btn-primary">Board List</Link></h4>
            <form onSubmit={this.onSubmit}>
              <div class="form-group">
                <label for="first_name">Title:</label>
                <input type="text" class="form-control" name="first_name" value={this.state.first_name} onChange={this.onChange} placeholder="Title" />
              </div>
              <div class="form-group">
                <label for="last_name">Description:</label>
                <input type="text" class="form-control" name="last_name" value={this.state.last_name} onChange={this.onChange} placeholder="Description" />
              </div>
              <div class="form-group">
                <label for="email">Author:</label>
                <input type="text" class="form-control" name="email" value={this.state.email} onChange={this.onChange} placeholder="Author" />
              </div>
              <button type="submit" class="btn btn-success">Submit</button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default Edit;