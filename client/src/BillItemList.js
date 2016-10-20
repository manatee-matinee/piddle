import React, { Component } from 'react';
import './BillItemList.css';
import BillItem from './BillItem';

class BillItemList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [
        {
        description: 'Sandwich',
        price: 16},
        {
          description: 'Falafel',
          price: 7.99
        }
      ]
    }

    this.newBillItem = this.newBillItem.bind(this);
  }

  deteteBillItem(id) {
    const newState = this.state;
    newState.items.slice(id, 1);
    this.setState(newState);
  }

  newBillItem(event) {
    event.preventDefault();
    console.log('ayyyyylamo');
    const newItem = {
      description: '',
      price: 0,
    };

    this.setState({ items: [...this.state.items, newItem] });
  }

  render() {
    return (
      <div className="BillItemList">
        {this.state.items.map((item)=>(
          <BillItem {...item} deleteMe={this.deleteMe}/>
          ))}
        <button onClick={this.newBillItem}>New Bill Item</button>
      </div>
    );
  }
}

export default BillItemList;