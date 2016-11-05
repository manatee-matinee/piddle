import React, { Component } from 'react';
import { Link, withRouter } from 'react-router';
import Request from '../../utils/requestHandler';
import { Form, FormControl } from 'react-bootstrap';

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

  submitSignupForm(event) {
    event.preventDefault();
    Request.postSignup(this.state.inputs, (res) => {
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
      <div className="signupPage">
        <h1 className="Signup-intro">
          Sign Up
        </h1>
        <Form id="signupForm">
          <label htmlFor="emailAddress">Email</label>
          <br />
          <FormControl
            type="text"
            className="loginInput"
            id="emailAddress"
            name="emailAddress"
            onChange={event => this.handleInputChange(event)}
          />
          <br />
          <label htmlFor="password">Password</label>
          <br />
          <FormControl
            type="password"
            className="loginInput"
            id="password"
            name="password"
            onChange={event => this.handleInputChange(event)}
          />
          <br />
          <label htmlFor="name">Name</label>
          <br />
          <FormControl
            type="text"
            className="loginInput"
            id="name"
            name="name"
            onChange={event => this.handleInputChange(event)}
          />
          <br />
          <label htmlFor="password">square Id</label>
          <br />
          <FormControl
            type="text"
            className="loginInput"
            id="squareId"
            name="squareId"
            onChange={event => this.handleInputChange(event)}
          />
          <br />
          <label htmlFor="password">paypal Id</label>
          <br />
          <FormControl
            type="text"
            className="loginInput"
            id="paypalId"
            name="paypalId"
            onChange={event => this.handleInputChange(event)}
          />
          <br />
          <FormControl
            style={{background: "#3EA9B3", color: "white"}}
            type="submit"
            className="submitSignup"
            id="submitSignup"
            value="Signup"
            onClick={event => this.submitSignupForm(event)}
          />
        </Form>
        <div className="signupError">{this.state.error}</div>
        <span>Have an account? </span>
        <Link to="/login">Log in</Link>
      </div>
    );
  }
}

Signup.propTypes = {
  router: React.PropTypes.shape({
    push: React.PropTypes.func.isRequired,
  }),
};

export default withRouter(Signup);
