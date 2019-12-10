import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import firebase from './Firebase';
import Login from './Login';
import './App.css';
class Home extends Component {
 state = {
   email: '',
   password: '',
   error: null,
 };

handleInputChange = (event) => {
   this.setState({ [event.target.name]: event.target.value });
 };
 
handleSubmit = (event) => {
   event.preventDefault();
   const { email, password } = this.state;
firebase
     .auth()
     .signInWithEmailAndPassword(email, password)
     .then((user) => {
       this.props.history.push('/showData');
     })
     .catch((error) => {
       this.setState({ error: error });
     });
 };
 render() {
   const { email, password, error } = this.state;
   return (
     <div>       
       <Login/>
     </div>
   );
 }
}
export default withRouter(Home);