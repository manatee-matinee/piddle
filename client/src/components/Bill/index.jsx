import React from 'react';
import './Bill.css';
import BillItemList from './../BillItemList';

const Bill = () => (
  <div className="Bill">
    <p className="Bill-intro">
      Here is your bill
    </p>
    <form id="billForm">
      <BillItemList />
    </form>
  </div>
);

export default Bill;
