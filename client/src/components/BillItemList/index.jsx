import React, { Component } from 'react';
import './BillItemList.css';
import BillItem from './../BillItem';

class BillItemList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [
        {
          description: 'Sandwich',
          price: 16,
        },
        {
          description: 'Falafel',
          price: 7.99,
        },
      ],
    };

    this.billItemChange = this.billItemChange.bind(this);
    this.newBillItem = this.newBillItem.bind(this);
    this.deleteBillItem = this.deleteBillItem.bind(this);
  }

  deleteBillItem(event, id) {
    event.preventDefault();
    const previousItems = this.state.items;
    previousItems.splice(id, 1);
    this.setState({ items: previousItems });
  }

  newBillItem(event) {
    event.preventDefault();
    const newItem = {
      description: '',
      price: 0,
    };

    this.setState({ items: [...this.state.items, newItem] });
  }

  billItemChange(index, description, price) {
    const editedItem = this.state.items[index];
    if (description) {
      editedItem.description = description;
    } else {
      editedItem.price = price;
    }
    const previousItems = this.state.items;
    previousItems[index] = editedItem;


    this.setState({ items: previousItems });
  }

  render() {
    return (
      <div className="BillItemList">
        {this.state.items.map((item, i) => (
          <BillItem
            key={i}
            index={i}
            {...item}
            deleteBillItem={this.deleteBillItem}
            billItemChange={this.billItemChange}
          />
          ))}
        <button onClick={this.newBillItem}>New Bill Item</button>
      </div>
    );
  }
}

export default BillItemList;
