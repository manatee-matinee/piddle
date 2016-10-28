import React, { Component } from 'react';
// import { Link } from 'react-router';
import Request from '../../utils/requestHandler';

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      emailAddress: null,
      password: null,
      name: null,
      squareId: null,
      paypalId: null,
    };
    this.submitUpdateForm = this.submitUpdateForm.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  handleInputChange(event) {
    const stateObj = {};
    stateObj[event.target.name] = event.target.value;
    this.setState(stateObj);
  }

  submitUpdateForm(event) {
    event.preventDefault();
    Request.putUpdate(this.state, res => console.log(res));
  }

  render() {
    return (
      <div className="profilePage">
        <h1>Welcome to your profile</h1>
        <h3>Update any info below</h3>
        <form id="signupForm">
          <label htmlFor="emailAddress">Email</label>
          <input
            type="text"
            className="loginInput"
            name="emailAddress"
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
            value="Update"
            onClick={event => this.submitUpdateForm(event)}
          />
        </form>
      </div>
    );
  }
}
export default Profile;
