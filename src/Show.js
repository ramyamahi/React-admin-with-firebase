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
      <div>
        <div>
        <h4><Link to="/">User Detail List</Link></h4>           
        </div>
        <div>
          <dl>
            <dt>First name:</dt>
            <dd className="detail-list">{this.state.userDetail.first_name}</dd><br/>
            <dt>Last name:</dt>
            <dd className="detail-list">{this.state.userDetail.last_name}</dd><br/>
            <dt>Email:</dt>
            <dd className="detail-list">{this.state.userDetail.email}</dd>
          </dl><br/>
          <Link to={`/edit/${this.state.key}`}>Edit</Link>&nbsp;
          <button onClick={this.delete.bind(this, this.state.key)}>Delete</button>
        </div>
      </div>
    );
  }
}

export default Show;