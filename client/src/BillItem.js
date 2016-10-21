import React, { Component } from 'react';
import './BillItem.css';

class BillItem extends Component {
  render() {
    return (
      <div className="BillItem">
        <input type="text" className="description" value={this.props.description}/>
        <input type="number" className="price" value={this.props.price}/>
        <button onClick={(event)=>this.props.deleteMe(event, this.props.index)}>Delete</button>
      </div>
    );
  }
}

export default BillItem;