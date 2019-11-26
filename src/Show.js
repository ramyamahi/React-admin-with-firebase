import React, { Component } from 'react';
import firebase from './Firebase';
import { Link } from 'react-router-dom';

class Show extends Component {

  constructor(props) {
    super(props);
    this.state = {
      userDetail: {},
      key: ''
    };
  }

  componentDidMount() {
    const ref = firebase.firestore().collection('user').doc(this.props.match.params.id);
    ref.get().then((doc) => {
      if (doc.exists) {
        this.setState({
          userDetail: doc.data(),
          key: doc.id,
          isLoading: false
        });
      } else {
        console.log("No such document!");
      }
    });
  }

  delete(id){
    firebase.firestore().collection('user').doc(id).delete().then(() => {
      console.log("Document successfully deleted!");
      this.props.history.push("/ShowData")
    }).catch((error) => {
      console.error("Error removing document: ", error);
    });
  }

  render() {
    return (
      <div class="container">
        <div class="panel panel-default">
          <div class="panel-heading">
          <h4><Link to="/">Board List</Link></h4>
           
          </div>
          <div class="panel-body">
            <dl>
              <dt>First name:</dt>
              <dd>{this.state.userDetail.first_name}</dd>
              <dt>Last name:</dt>
              <dd>{this.state.userDetail.last_name}</dd>
              <dt>Email:</dt>
              <dd>{this.state.userDetail.email}</dd>
            </dl>
            <Link to={`/edit/${this.state.key}`} class="btn btn-success">Edit</Link>&nbsp;
            <button onClick={this.delete.bind(this, this.state.key)} class="btn btn-danger">Delete</button>
          </div>
        </div>
      </div>
    );
  }
}

export default Show;