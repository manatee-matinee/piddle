import React, { Component } from 'react';
import { Link, browserHistory } from 'react-router';
import Request from '../../utils/requestHandler';

class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inputs: {
        emailAddress: null,
        password: null,
        name: null,
        squareId: null,
        paypalId: null,
      },
      error: '',
    };
    this.submitSignupForm = this.submitSignupForm.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
  }


  handleInputChange(event) {
    const stateObj = this.state.inputs;
    stateObj[event.target.name] = event.target.value;
    this.setState({ inputs: stateObj });
  }

  submitSignupForm(event) {
    event.preventDefault();
    Request.postSignup(this.state.inputs, (res) => {
      if (res.status === 201) {
        browserHistory.push('/');
      } else {
        this.setState({ error: 'Username already registered. Try again.' });
      }
    });
  }

  render() {
    return (
      <div className="signupPage">
        <p className="Signup-intro">
          Welcome to the signup page
        </p>
        <form id="signupForm">
          <label htmlFor="emailAddress">Email</label>
          <input
            type="text"
            className="loginInput"
            id="emailAddress"
            name="emailAddress"
            onChange={event => this.handleInputChange(event)}
          />
          <label htmlFor="password">Password</label>
          <input
            type="password"
            className="loginInput"
            id="password"
            name="password"
            onChange={event => this.handleInputChange(event)}
          />
          <label htmlFor="name">Name</label>
          <input
            type="text"
            className="loginInput"
            id="name"
            name="name"
            onChange={event => this.handleInputChange(event)}
          />
          <label htmlFor="password">square Id</label>
          <input
            type="text"
            className="loginInput"
            id="squareId"
            name="squareId"
            onChange={event => this.handleInputChange(event)}
          />
          <label htmlFor="password">paypal Id</label>
          <input
            type="text"
            className="loginInput"
            id="paypalId"
            name="paypalId"
            onChange={event => this.handleInputChange(event)}
          />
          <input
            type="submit"
            className="submitSignup"
            id="submitSignup"
            value="Signup"
            onClick={event => this.submitSignupForm(event)}
          />
        </form>
        <div className="signupError">{this.state.error}</div>
        <span>Have an account? </span>
        <Link to="/login">Log in</Link>
      </div>
    );
  }
}

export default Signup;
