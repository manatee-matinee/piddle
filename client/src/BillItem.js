import React, { Component } from 'react';
import './BillItem.css';

class BillItem extends Component {
  render() {
    return (
      <div className="BillItem">
        <span className="description">
          {this.props.description + ' '}
        </span>
        <span className="price">
          {this.props.price}
        </span>
      </div>
    );
  }
}

export default BillItem;