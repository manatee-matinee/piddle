import React from 'react';
import './Bill.css';
import BillItemList from './../BillItemList';
import TaxField from './../TaxField';
import TipField from './../TipField';

class Bill extends React.Component {
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
      tax: 12.40,
      tip: {
        value: 13.22,
        percent: null,
        usePercent: false,
      },
    };

    this.changeBillItem = this.changeBillItem.bind(this);
    this.newBillItem = this.newBillItem.bind(this);
    this.deleteBillItem = this.deleteBillItem.bind(this);
    this.changeTaxValue = this.changeInputValue.bind(this, 'tax');
    this.changeTipValue = this.changeTipValue.bind(this);
    this.changeTipPercent = this.changeTipPercent.bind(this);
    this.createBill = this.createBill.bind(this);
  }

  createBill(event) {
    event.preventDefault();
    const bill = {
      description: 'To Do',
      items: [],
      payer: 0,
      tax: 0,
      tip: 0,
    };

    // Build JSON representation of the form
    for (const el of this.createBillForm) {
      const elName = el.getAttribute('name');
      const isFloatField = /^(price|tax|tip)/.test(elName);
      const value = (isFloatField) ?
        Number.parseFloat(el.value) :
        el.value;

      if (el.tagName === 'INPUT' && el.getAttribute('type') !== 'submit') {
        const isBillItemField = /^(description|price)/.test(elName);
        if (isBillItemField) {
          const matches = elName.match(/([a-z]+)-(\d+)/);
          const key = matches[1];
          const index = Number.parseInt(matches[2], 10);
          if (bill.items[index] === undefined) {
            bill.items[index] = { [key]: value };
          } else {
            bill.items[index][key] = value;
          }
        } else if (/^(tax)/.test(elName)) {
          bill.tax = value;
        } else if (/^(tip)/.test(elName)) {
          bill.tip = value;
        }
      }
    }

    console.log(bill);
  }

  deleteBillItem(event, id) {
    event.preventDefault();
    const previousItems = this.state.billItems;
    previousItems.splice(id, 1);
    this.setState({ billItems: previousItems });
  }

  newBillItem(event) {
    event.preventDefault();
    const newItem = {
      description: '',
      price: 0,
    };

    this.setState({ billItems: [...this.state.billItems, newItem] });
  }

  changeInputValue(key, newValue) {
    this.setState({ [key]: newValue });
  }

  changeTipValue(newValue) {
    const tipState = this.state.tip;
    tipState.value = newValue;
    tipState.usePercent = false;
    this.setState({ tip: tipState });
  }

  changeTipPercent(percent) {
    let tipState = this.state.tip;
    tipState.percent = percent;
    tipState.usePercent = true;
    this.setState({ tip: tipState });

    tipState = this.state.tip;
    tipState.value = this.calculateTipValue();
    this.setState({ tip: tipState });
  }

  calculateTipValue() {
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

  changeBillItem(index, description, price) {
    // Update the bill state
    const editedItem = this.state.billItems[index];
    if (description) {
      editedItem.description = description;
    } else {
      editedItem.price = price;
    }
    const previousItems = this.state.billItems;
    previousItems[index] = editedItem;
    this.setState({ billItems: previousItems });

    // Update the tip state
    const tipState = this.state.tip;
    tipState.value = this.calculateTipValue();
    this.setState({ tip: tipState });
  }

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
