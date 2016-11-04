import jwtDecode from 'jwt-decode';
import React, { Component } from 'react';
import { withRouter, Link } from 'react-router';
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
        claimedBillItems: [[]],
      };
    } else {
      const userData = jwtDecode(token);
      this.state = {
        emailAddress: userData.emailAddress,
        name: userData.name,
        squareId: userData.squareId,
        paypalId: userData.paypalId,
        createdBills: [[]],
        claimedBillItems: [[]],
      };

      // Retreive the user's bill data
      Request.getUserBills(token, (data) => {
        const formattedData = data.map(billObj => {
          return {
            shortId: billObj.shortId,
            description: billObj.description,
            subtotal: billObj.items.reduce((total, item) => {
              return total + item.price;
            }, 0),
            tax: billObj.tax,
            tip: billObj.tip,
          };
        });
        this.setState({ createdBills: formattedData });
      });

      // Retreive the user's item data
      Request.getUserItems(token, (data) => {
        const formattedData = data.map(itemObj => {
          return {
            shortId: itemObj.bill.shortId,
            billDescription: itemObj.bill.description,
            itemDescription: itemObj.description,
            itemTotal: itemObj.price,
            itemTax: itemObj.tax,
            itemTip: itemObj.tip,
          };
        });
        this.setState({ claimedBillItems: formattedData });
      });
    }


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
                <tr key={rowIndex}>
                  {Object.keys(row).map(function(col, colIndex) {
                    if (colIndex === 0) {
                      return <td key={colIndex}><Link to={'bill/' + row[col]}>{row[col]}</Link></td>;
                    } else {
                      return <td key={colIndex}>{row[col]}</td>;
                    }
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
                <tr key={rowIndex}>
                  {Object.keys(row).map(function(col, colIndex) {
                    if (colIndex === 0) {
                      return <td key={colIndex}><Link to={'bill/' + row[col]}>{row[col]}</Link></td>;
                    } else {
                      return <td key={colIndex}>{row[col]}</td>;
                    }
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
