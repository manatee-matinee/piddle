import React, { Component } from 'react';
import { Link } from 'react-router';
import Request from '../../utils/requestHandler';

class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      emailAddress: '',
      password: '',
      firstName: '',
      lastName: '',
      squareId: '',
      paypalId: '',
      venmoId: '',
    };
    this.handleEmailAdddressChange = this.handleEmailAddressChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.submitSignupForm = this.submitSignupForm.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
  }


  handleInputChange(event) {
    const stateObj = {};
    stateObj[event.target.name] = event.target.value;
    this.setState(stateObj);
  }

  submitSignupForm(event) {
    event.preventDefault();
    Request.postSignup(this.state, res => console.log(res));
  }

  render() {
    return (
      <div className="Signup Page">
        <p className="Signup-intro">
          Welcome to the signup page
        </p>
        <form id="signupForm">
          <label htmlFor="emailAddress">Email</label>
          <input
            type="text"
            className="loginInput"
            name="emailAddress"
            onChange={event => this.handleInputChange(event)}
          />
          <label htmlFor="password">Password</label>
          <input
            type="password"
            className="loginInput"
            name="password"
            onChange={event => this.handleInputChange(event)}
          />
          <label htmlFor="name">First name</label>
          <input
            type="text"
            className="loginInput"
            name="firstName"
            onChange={event => this.handleInputChange(event)}
          />
          <label htmlFor="name">Last name</label>
          <input
            type="text"
            className="loginInput"
            name="lastName"
            onChange={event => this.handleInputChange(event)}
          />
          <label htmlFor="password">square Id</label>
          <input
            type="text"
            className="loginInput"
            name="squareId"
            onChange={event => this.handleInputChange(event)}
          />
          <label htmlFor="password">paypal Id</label>
          <input
            type="text"
            className="loginInput"
            name="paypalId"
            onChange={event => this.handleInputChange(event)}
          />
          <label htmlFor="password">venmo Id</label>
          <input
            type="text"
            className="loginInput"
            name="venmoId"
            onChange={event => this.handleInputChange(event)}
          />
          <input
            type="submit"
            className="submitLogin"
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
