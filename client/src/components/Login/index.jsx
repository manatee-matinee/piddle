import React, { Component } from 'react';
<<<<<<< HEAD
=======
import { Link } from 'react-router';
>>>>>>> ffe6b7a3ab9126f1490f4c14268d08d5cc3b7a71
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
