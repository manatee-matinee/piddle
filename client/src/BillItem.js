import React, { Component } from 'react';
import './BillItem.css';

class BillItem extends Component {
  constructor(props) {
    super(props);
    this.descriptionChange = this.descriptionChange.bind(this);
    this.priceChange = this.priceChange.bind(this);
  }

  descriptionChange(event) {
    this.props.billItemChange(this.props.index, event.target.value, null);
  }
  priceChange(event) {
    this.props.billItemChange(this.props.index, null, event.target.value);
  }

  render() {
    return (
      <div className="BillItem">
        <input type="text" className="description" onChange={this.descriptionChange} value={this.props.description}/>
        <input type="number" className="price" onChange={this.priceChange} value={this.props.price}/>
        <button onClick={(event)=>this.props.deleteMe(event, this.props.index)}>Delete</button>
      </div>
    );
  }
}

export default BillItem;