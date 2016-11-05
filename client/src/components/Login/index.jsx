import React, { Component } from 'react';
import { Link, withRouter } from 'react-router';
import Request from '../../utils/requestHandler';
import { Form, FormControl } from 'react-bootstrap';

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

  componentDidMount() {
    // Send the user away if they're already logged in
    // eslint-disable-next-line no-undef
    if (localStorage.getItem('piddleToken')) {
      this.props.router.push('/');
    }
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
        // eslint-disable-next-line no-undef
        localStorage.setItem('piddleToken', res.body.data.token);
        this.props.router.push('/');
      } else {
        this.setState({ error: res.body.error.message });
      }
    });
  }

  render() {
    return (
      <div className="loginPage">
        <h1 className="Login-intro">
          Login
        </h1>
        <Form id="loginForm">
          <label htmlFor="emailAddress">Email</label>
          <br />
          <FormControl
            type="text"
            className="loginForm"
            id="emailAddress"
            name="emailAddress"
            onChange={event => this.handleInputChange(event)}
          />
          <br />
          <label htmlFor="password">Password</label>
          <br />
          <FormControl
            type="password"
            className="loginForm"
            id="password"
            name="password"
            onChange={event => this.handleInputChange(event)}
          />
          <br />
          <FormControl
            type="submit"
            className="submitLogin"
            id="submitLogin"
            value="Login"
            style={{background: "#3EA9B3", color: "white"}}            
            onClick={event => this.submitLoginForm(event)}
          />
        </Form>
        <div className="loginError">{this.state.error}</div>
        <span>Need an account? </span>
        <Link to="/signup">Sign up</Link>
      </div>
    );
  }
}

Login.propTypes = {
  router: React.PropTypes.shape({
    push: React.PropTypes.func.isRequired,
  }),
};

export default withRouter(Login);
