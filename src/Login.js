import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import firebase from './Firebase';
import './App.css';
class Login extends Component {
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
        <h1>Sign In</h1>     
       {error ? (   
        <div className="error-message">{error.message}</div>
       ) : null}
       <div><br/>        
          <form onSubmit={this.handleSubmit}>
            <label htmlFor="email">Email</label>&nbsp;
            <input type="text" name="email" placeholder="Email" value={email} onChange={this.handleInputChange} />&nbsp;
            <label htmlFor="password">Password</label>&nbsp;
            <input
               type="password"
               name="password"
               placeholder="Password"
               value={password}
               onChange={this.handleInputChange}
            />&nbsp;
            <button children="Log In" />
          </form>      
       </div>
     </div>
   );
 }
}
export default withRouter(Login);