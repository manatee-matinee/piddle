import React from 'react';
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

    this.state = {
      billItems: [
        {
          description: 'Sandwich',
          price: 16,
        },
        {
          description: 'Falafel',
          price: 7.99,
        },
      ],
      description: 'A description',
      tax: 12.40,
      tip: {
        value: 13.22,
        percent: null,
        usePercent: false,
      },
    };

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
      payer: 0,
      tax: this.state.tax,
      tip: this.state.tip.value,
    };

    /**
     * @todo interact with our API and POST this bill
     */
    console.log(bill);
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
    let tipState = this.state.tip;
    tipState.percent = percent;
    tipState.usePercent = true;
    this.setState({ tip: tipState });

    tipState = this.state.tip;
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

    // Update the tip state
    const tipState = this.state.tip;
    tipState.value = this.calculateTip();
    this.setState({ tip: tipState });
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
          />
          <BillItemList
            billItems={this.state.billItems}
            deleteBillItem={this.deleteBillItem}
            changeBillItem={this.changeBillItem}
            newBillItem={this.newBillItem}
          />
          <TaxField
            changeTaxValue={this.changeTaxValue}
            taxValue={this.state.tax}
          />
          <TipField
            changeTipValue={this.changeTipValue}
            changeTipPercent={this.changeTipPercent}
            tipValue={this.state.tip.value}
          />
          <input
            type="submit"
            value="Create Bill"
            onClick={this.createBill}
          />
        </form>
      </div>
    );
  }
}

export default Bill;
