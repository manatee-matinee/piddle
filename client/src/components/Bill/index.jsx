import React from 'react';
import { withRouter } from 'react-router';
import './Bill.css';
import BillItemList from './../BillItemList';
import DescriptionField from './../DescriptionField';
import TaxField from './../TaxField';
import TipField from './../TipField';

/**
 * @class Bill
 */
class Bill extends React.Component {
  /**
   * @constructs
   * @param {object} props
   */
  constructor(props) {
    super(props);

    this.serverUrl = /^(development|test)$/.test(process.env.NODE_ENV) ? 'http://localhost:3000' : '';

    this.stateSetter = this.stateSetter.bind(this);

    // Bill
    this.createBill = this.createBill.bind(this);

    // Bill Item
    this.changeBillItem = this.changeBillItem.bind(this);
    this.newBillItem = this.newBillItem.bind(this);
    this.deleteBillItem = this.deleteBillItem.bind(this);

    // Tax
    this.changeTaxValue = this.stateSetter('tax');

    // Description
    this.changeDescriptionValue = this.stateSetter('description');

    // Tip
    this.changeTipValue = this.changeTipValue.bind(this);
    this.changeTipPercent = this.changeTipPercent.bind(this);

    /**
     * @todo Move this into library module?
     */
    this.interactionTypes = {
      new: Symbol.for('new'),
      edit: Symbol.for('edit'),
      claim: Symbol.for('claim'),
    };
  }

  /**
   * React lifecycle method called before initial component render().
   * @method
   * @name componentWillMount
   */
  componentWillMount() {
    // Set the default state here. We'll load the actual Bill data later
    // in componentDidMount if the user has requested a specific bill to
    // avoid waiting for the API GET request to complete before rendering
    // the Bill.

    this.state = {
      billItems: [
        { description: '', price: 0 },
      ],
      description: '',
      interactionType: this.interactionTypes.new,
      tax: 0,
      tip: {
        value: 0,
        percent: null,
        usePercent: false,
      },
    };
  }

  /**
   * React lifecycle method called after initial component render().
   * @method
   * @name componentDidMount
   */
  componentDidMount() {
    const billId = this.props.params.id;
    if (typeof billId !== 'undefined') {
      /**
       * @todo Extract these variables and functions into a module (DRY).
       */
      // ref: https://github.com/github/fetch
      const checkStatus = (response) => {
        if (response.status >= 200 && response.status < 300) {
          return response;
        }

        const error = new Error(response.statusText);
        error.response = response;
        throw error;
      };

      /*
        this.setState({
          billItems: [
            { description: 'Item 1', price: 10 },
            { description: 'Item 2', price: 20 },
          ],
          description: 'Some Description',
          interactionType: this.interactionTypes.claim,
          tax: 0,
          tip: {
            value: 0,
            percent: null,
            usePercent: false,
          },
        });
      */

      // eslint-disable-next-line no-undef
      fetch(`${this.serverUrl}/api/bill/${billId}`)
        .then(checkStatus)
        .then(response => response.json())
        .then(({ data }) => {
          this.setState({
            ...this.state,
            ...data,
            isEditable: false,
            tip: {
              value: data.tip,
              percent: null,
              usePercent: false,
            },
          });
        })
        .catch((error) => {
          /**
           * @todo handle this error appropriately
           */
          const userNotAuthorizedToViewBill = (error.response.status === 401);
          if (userNotAuthorizedToViewBill) {
            this.setState({ error });
          }
          console.dir(error);
        });
    }
  }

  /**
   * Create a JSON representation of the current state of the bill
   * @method
   * @name createBill
   * @param {object} event
   */
  createBill(event) {
    event.preventDefault();
    const bill = {
      description: this.state.description,
      items: this.state.billItems,
      payer: 1,
      tax: this.state.tax,
      tip: this.state.tip.value,
    };

    /**
     * @todo Extract these variables and functions into a module (DRY).
     */
    const jsonHeaders = {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    };

    // ref: https://github.com/github/fetch
    const checkStatus = (response) => {
      if (response.status >= 200 && response.status < 300) {
        return response;
      }

      const error = new Error(response.statusText);
      error.response = response;
      throw error;
    };

    // eslint-disable-next-line no-undef
    fetch(`${this.serverUrl}/api/bill`, {
      method: 'POST',
      headers: jsonHeaders,
      body: JSON.stringify(bill),
    })
      .then(checkStatus)
      .then(response => response.json())
      .then(({ data }) => {
        this.props.router.push(`/bill/${data.shortId}`);
      })
      .catch((error) => {
        /**
         * @todo handle this error appropriately
         */
        console.error(error);
      });
  }

  /**
   * Delete a specific bill item from the Bill state.
   * @method
   * @name deleteBillItem
   * @param {object} event
   * @param {number} id - The bill item's id.
   */
  deleteBillItem(event, id) {
    event.preventDefault();
    const previousItems = this.state.billItems;
    previousItems.splice(id, 1);
    this.setState({ billItems: previousItems });

    this.updateTip();
  }

  /**
   * Adds a new, empty, bill item to the Bill state.
   * @method
   * @name newBillItem
   * @param {object} event
   */
  newBillItem(event) {
    event.preventDefault();
    const newItem = {
      description: '',
      price: 0,
    };

    this.setState({ billItems: [...this.state.billItems, newItem] });
  }

  /**
   * Build a setter for a given state key.
   * @method
   * @name stateSetter
   * @param {string} key - Key to state to be modified.
   * @returns {function} Setter function for provided key.
   */
  stateSetter(key) {
    return newState => this.setState({ [key]: newState });
  }

  /**
   * Update Bill state with new tip value.
   * @method
   * @name changeTipValue
   * @param {number} tip
   */
  changeTipValue(tip) {
    const tipState = this.state.tip;
    tipState.value = tip;
    tipState.usePercent = false;
    this.setState({ tip: tipState });
  }

  /**
   * Update bill state with new tip percent and configure tip to keep itself
   * updated as bill item prices change.
   * @method
   * @name changeTipPercent
   * @param {number} percent
   */
  changeTipPercent(percent) {
    const tipState = this.state.tip;
    tipState.percent = percent;
    tipState.usePercent = true;
    this.setState({ tip: tipState });

    this.updateTip();
  }

  /**
   * Update tip in bill state based  on current tip percent.
   * @method
   * @name updateTip
   */
  updateTip() {
    const tipState = this.state.tip;
    tipState.value = this.calculateTip();
    this.setState({ tip: tipState });
  }

  /**
   * Calculate the tip based on current tip percent. Returns the current tip
   * if the tip isn't being calculated based on a percentage of the bill's
   * total cost.
   * @method
   * @name calculateTip
   * @returns {number}
   */
  calculateTip() {
    // Only update the state if the user has instructed us to calculate the
    // tip based on a given percent.
    let tip = this.state.tip.value;
    if (this.state.tip.usePercent) {
      const total = this.state.billItems.reduce((sum, billItem) => (
        sum + billItem.price
      ), 0);
      tip = total * (this.state.tip.percent / 100);
    }
    return tip;
  }

  /**
   * Update state with new bill item field values.
   * @method
   * @name changeBillItem
   * @param {object} fields
   * @param {string} [fields.description] - Bill item description
   * @param {number} [fields.price] - Bill item price
   */
  changeBillItem(index, fields) {
    // Update the bill state
    const billItem = { ...this.state.billItems[index], ...fields };
    const previousItems = this.state.billItems;
    previousItems[index] = billItem;
    this.setState({ billItems: previousItems });

    this.updateTip();
  }

  /**
   * Render the component
   * @method
   * @name render
   * @returns {object}
   */
  render() {
    return (
      <div className="Bill">
        {this.state.error &&
          <p>{this.state.error.message}</p>
        }
        {!this.state.error &&
          <div>
            <p className="Bill-intro">
              Here is your bill
            </p>
            <form
              id="createBillForm"
              ref={(c) => { this.createBillForm = c; }}
            >
              <DescriptionField
                changeDescriptionValue={this.changeDescriptionValue}
                descriptionValue={this.state.description}
                interactionType={this.state.interactionType}
              />
              <BillItemList
                billItems={this.state.billItems}
                deleteBillItem={this.deleteBillItem}
                changeBillItem={this.changeBillItem}
                interactionType={this.state.interactionType}
                newBillItem={this.newBillItem}
              />
              <TaxField
                changeTaxValue={this.changeTaxValue}
                interactionType={this.state.interactionType}
                taxValue={this.state.tax}
              />
              <TipField
                changeTipValue={this.changeTipValue}
                changeTipPercent={this.changeTipPercent}
                interactionType={this.state.interactionType}
                tipValue={this.state.tip.value}
              />
              {
                /**
                 * @todo Make into a component
                 */
              }
              {(this.state.interactionType === Symbol.for('new')) &&
                <input
                  type="submit"
                  value="Create New Bill"
                  onClick={this.createBill}
                />
              }
              {(this.state.interactionType === Symbol.for('edit')) &&
                <input
                  type="submit"
                  value="Save Changes"
                  onClick={this.createBill}
                  disabled="true"
                />
              }
              {(this.state.interactionType === Symbol.for('claim')) &&
                <input
                  type="submit"
                  value="Claim Bill Items"
                  onClick={this.createBill}
                  disabled="true"
                />
              }
            </form>
          </div>
        }
      </div>
    );
  }
}

Bill.propTypes = {
  router: React.PropTypes.shape({
    push: React.PropTypes.func.isRequired,
  }),
  params: React.PropTypes.shape({
    id: React.PropTypes.string,
  }),
};

export default withRouter(Bill);
