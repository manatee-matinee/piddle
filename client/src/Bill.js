import React, { Component } from 'react';
import logo from './logo.svg';
import './Bill.css';
import { Link } from 'react-router';
import BillItemList from './BillItemList';

class Bill extends Component {

  render() {
    return (
      <div className="Bill">
        <p className="Bill-intro">
          Here is your bill
        </p>
        <form id="billForm">
          <BillItemList />
        </form>
      </div>
    );
  }
}

export default Bill;