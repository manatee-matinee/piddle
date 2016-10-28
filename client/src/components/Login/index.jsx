import React, { Component } from 'react';
import { Link, browserHistory } from 'react-router';
import Request from '../../utils/requestHandler';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inputs: {
        emailAddress: null,
        password: null,
      },
      error: '',
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.submitLoginForm = this.submitLoginForm.bind(this);
  }

  handleInputChange(event) {
    const stateObj = this.state.inputs;
    stateObj[event.target.name] = event.target.value;
    this.setState({ inputs: stateObj });
  }

  submitLoginForm(event) {
    event.preventDefault();
    Request.postLogin(this.state.inputs, (res) => {
      if (res.status === 201) {
        browserHistory.push('/');
      } else {
        this.setState({ error: 'Invalid username or password, please try again' });
      }
    });
  }

  render() {
    return (
      <div className="loginPage">
        <p className="Login-intro">
          Welcome to the login page
        </p>
        <form id="loginForm">
          <label htmlFor="emailAddress">email</label>
          <input
            type="text"
            className="loginForm"
            name="emailAddress"
            onChange={event => this.handleInputChange(event)}
          />
          <label htmlFor="password">password</label>
          <input
            type="password"
            className="loginForm"
            name="password"
            onChange={event => this.handleInputChange(event)}
          />
          <input
            type="submit"
            className="submit"
            value="Login"
            onClick={event => this.submitLoginForm(event)}
          />
        </form>
        <div className="loginError">{this.state.error}</div>
        <span>Need an account? </span>
        <Link to="/signup">Sign up</Link>
      </div>
    );
  }
}
export default Login;
