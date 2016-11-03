import jwtDecode from 'jwt-decode';
import React, { Component } from 'react';
import { withRouter } from 'react-router';
import Request from '../../utils/requestHandler';

class Profile extends Component {
  constructor(props) {
    super(props);

    // Send the user away if they're not already logged in
    // eslint-disable-next-line no-undef
    const token = localStorage.getItem('piddleToken');
    if (!token) {
      this.props.router.push('/login');
      this.state = {
        emailAddress: '',
        name: '',
        squareId: '',
        paypalId: '',
        createdBills: [[]],
        claimedBillItems: [[]]
      };
    } else {
      const userData = jwtDecode(token);
      this.state = {
        emailAddress: userData.emailAddress,
        name: userData.name,
        squareId: userData.squareId,
        paypalId: userData.paypalId,
        createdBills: [[]],
        claimedBillItems: [[]]
      };
    }

    // Retreive the user's bill data
    Request.

    // Retreive the user's item data
    

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
        this.props.router.push('/');
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
            value={this.state.emailAddress}
          />
          <label htmlFor="name">Name</label>
          <input
            type="text"
            className="updateInput"
            id="name"
            name="name"
            onChange={event => this.handleInputChange(event)}
            value={this.state.name}
          />
          <label htmlFor="password">square Id</label>
          <input
            type="text"
            className="updateInput"
            id="squareId"
            name="squareId"
            onChange={event => this.handleInputChange(event)}
            value={this.state.squareId}
          />
          <label htmlFor="password">paypal Id</label>
          <input
            type="text"
            className="updateInput"
            id="paypalId"
            name="paypalId"
            onChange={event => this.handleInputChange(event)}
            value={this.state.paypalId}
          />
          <input
            type="submit"
            className="submitUpdate"
            id="submitUpdate"
            value="Update"
            onClick={event => this.submitUpdateForm(event)}
          />
        </form>

        <h3>Created Bills</h3>
        <table>
          <thead>
            <tr>
              <th>Bill Short ID (Link)</th>
              <th>Description</th>
              <th>Subtotal</th>
              <th>Tax</th>
              <th>Tip</th>
            </tr>
          </thead>
          <tbody>
            {this.state.createdBills.map(function(row, rowIndex) {
              return (
                <tr>
                  {row.map(function(col, colIndex) {
                    return <td>{col}</td>
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>

        <h3>Claimed Bill Items</h3>
        <table>
          <thead>
            <tr>
              <th>Bill Short ID (Link)</th>
              <th>Bill Description</th>
              <th>Item Description</th>
              <th>Item Total</th>
              <th>Item Tax</th>
              <th>Item Tip</th>
            </tr>
          </thead>
          <tbody>
            {this.state.claimedBillItems.map(function(row, rowIndex) {
              return (
                <tr>
                  {row.map(function(col, colIndex) {
                    return <td>{col}</td>
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  }
}

Profile.propTypes = {
  router: React.PropTypes.shape({
    push: React.PropTypes.func.isRequired,
  }),
};

export default withRouter(Profile);
