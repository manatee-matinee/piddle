import React, { Component } from 'react';
import { browserHistory } from 'react-router';
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
    Request.putUpdate(this.state, (res) => {
      if (res.status === 201) {
        browserHistory.push('/');
      } else {
        this.setState({ error: 'Error updating info.' });
      }
    });
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
            className="updateInput"
            id="emailAddress"
            name="emailAddress"
            onChange={event => this.handleInputChange(event)}
          />
          <label htmlFor="name">Name</label>
          <input
            type="text"
            className="updateInput"
            id="name"
            name="name"
            onChange={event => this.handleInputChange(event)}
          />
          <label htmlFor="password">square Id</label>
          <input
            type="text"
            className="updateInput"
            id="squareId"
            name="squareId"
            onChange={event => this.handleInputChange(event)}
          />
          <label htmlFor="password">paypal Id</label>
          <input
            type="text"
            className="updateInput"
            id="paypalId"
            name="paypalId"
            onChange={event => this.handleInputChange(event)}
          />
          <input
            type="submit"
            className="submitUpdate"
            id="submitUpdate"
            value="Update"
            onClick={event => this.submitUpdateForm(event)}
          />
        </form>
      </div>
    );
  }
}
export default Profile;
