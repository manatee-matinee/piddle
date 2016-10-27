<<<<<<< b556d1262446d70b4db81ff43fc5333b986d221a
<<<<<<< 31303eeaafc363516b0450d58e3d73635499596b
<<<<<<< 4301587211c154a3a3761875b81eca8b440e224d
import React, { Component } from 'react';
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
    this.submitSignupForm = this.submitSignupForm.bind(this);
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

  submitSignupForm(event) {
    event.preventDefault();
    const emailAddress = this.state.emailAddress;
    const password = this.state.password;
    Request.postSignup(emailAddress, password, res => console.log(res));
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
            value="Login"
            onClick={event => this.submitLoginForm(event)}
          />
          <input
            type="submit"
            value="Signup"
            onClick={event => this.submitSignupForm(event)}
          />
        </form>
      </div>
    );
  }
}
=======
import React from 'react';
=======
import React, {Component} from 'react';
=======
import React, { Component } from 'react';
import { Link } from 'react-router';
>>>>>>> Separate login and signup pages
import Request from '../../utils/requestHandler';
>>>>>>> Complete login signup form with api calls

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
<<<<<<< b556d1262446d70b4db81ff43fc5333b986d221a
        <label htmlFor="password">password</label>
        <input
          type="password"
          className="password"
          name="password"
          onChange={event => this.handlePasswordChange(event)}
        />
        <input
        type="submit"
        value="Login"
        onClick={event => this.submitLoginForm(event)}
        />
        <input
        type="submit"
        value="Signup"
        onClick={event => this.submitSignupForm(event)}
        />
<<<<<<< 31303eeaafc363516b0450d58e3d73635499596b
      <label for="password">password</label>
      <input
        type="text"
        className="password"
        name="password"
      />
      <input
      type="submit"
      value="Submit"
      />
    </form>
  </div>
);
>>>>>>> Create Login page and css file
=======
      </form>
    </div>
  );
=======
        </form>
        <span>Need an account? </span>
        <Link to="/signup">Sign up</Link>
      </div>
    );
>>>>>>> Separate login and signup pages
  }
}
>>>>>>> Complete login signup form with api calls

export default Login;
