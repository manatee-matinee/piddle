import React, { Component } from 'react';
import { Link } from 'react-router';
import Request from '../../utils/requestHandler';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      emailAddress: '',
      password: '',
    };
    this.handleEmailAdddressChange = this.handleEmailAddressChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.submitLoginForm = this.submitLoginForm.bind(this);
  }

  handleEmailAddressChange(event) {
    this.setState({ emailAddress: event.target.value });
  }

  handlePasswordChange(event) {
    this.setState({ password: event.target.value });
  }

  submitLoginForm(event) {
    event.preventDefault();
    const emailAddress = this.state.emailAddress;
    const password = this.state.password;
    Request.postLogin(emailAddress, password, res => console.log(res));
  }

  render() {
    return (
<<<<<<< b51bbfd3db9bc6a5dbb2d8d5ab902655331c1dd1
    <div className="Login Page">
      <p className="Login-intro">
        Welcome to the login page
      </p>
      <form id="loginForm">
        <label htmlFor="emailAddress">email</label>
        <input
          type="text"
          className="emailAddress"
          name="emailAddress"
          onChange={event => this.handleEmailChange(event)}
=======
      <div className="Login Page">
        <p className="Login-intro">
          Welcome to the login page
        </p>
        <form id="loginForm">
          <label htmlFor="emailAddress">email</label>
          <input
            type="text"
            className="emailAddress"
            name="emailAddress"
            onChange={event => this.handleEmailAddressChange(event)}
          />
          <label htmlFor="password">password</label>
          <input
            type="password"
            className="password"
            name="password"
            onChange={event => this.handlePasswordChange(event)}
>>>>>>> Separate login and signup pages
          />
          <input
            type="submit"
            className="submit"
            value="Login"
            onClick={event => this.submitLoginForm(event)}
          />
        </form>
        <span>Need an account? </span>
        <Link to="/signup">Sign up</Link>
      </div>
    );
  }
}
export default Login;
