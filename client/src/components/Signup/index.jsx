import React, { Component } from 'react';
import { Link } from 'react-router';
import Request from '../../utils/requestHandler';

class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      emailAddress: '',
      password: '',
    };
    this.handleEmailAdddressChange = this.handleEmailAddressChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.submitSignupForm = this.submitSignupForm.bind(this);
  }

  handleEmailAddressChange(event) {
    this.setState({ emailAddress: event.target.value });
  }

  handlePasswordChange(event) {
    this.setState({ password: event.target.value });
  }

  submitSignupForm(event) {
    event.preventDefault();
    const emailAddress = this.state.emailAddress;
    const password = this.state.password;
    Request.postSignup(emailAddress, password, res => console.log(res));
  }

  render() {
    return (
      <div className="Signup Page">
        <p className="Signup-intro">
          Welcome to the signup page
        </p>
        <form id="signupForm">
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
            value="Signup"
            onClick={event => this.submitSignupForm(event)}
          />
        </form>
        <span>Have an account? </span>
        <Link to="/login">Log in</Link>
      </div>
    );
  }
}

export default Signup;
