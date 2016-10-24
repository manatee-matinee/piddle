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
      tip: 44.12,
    };

    this.changeBillItem = this.changeBillItem.bind(this);
    this.newBillItem = this.newBillItem.bind(this);
    this.deleteBillItem = this.deleteBillItem.bind(this);
    this.changeTaxValue = this.changeInputValue.bind(this, 'tax');
    this.changeTipValue = this.changeInputValue.bind(this, 'tip');
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

  changeBillItem(index, description, price) {
    const editedItem = this.state.billItems[index];
    if (description) {
      editedItem.description = description;
    } else {
      editedItem.price = price;
    }
    const previousItems = this.state.billItems;
    previousItems[index] = editedItem;


    this.setState({ billItems: previousItems });
  }

  render() {
    return (
      <div className="Bill">
        <p className="Bill-intro">
          Here is your bill
        </p>
        <form id="billForm">
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
            tipValue={this.state.tip}
          />
        </form>
      </div>
    );
  }
}

export default Bill;
