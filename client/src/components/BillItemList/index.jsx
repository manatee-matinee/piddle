import React from 'react';
import './BillItemList.css';
import BillItem from './../BillItem';

const BillItemList = ({
  billItems,
  changeBillItem,
  deleteBillItem,
  newBillItem,
}) => (
  <div className="BillItemList">
    {billItems.map((item, i) => (
      <BillItem
        key={i}
        index={i}
        {...item}
        deleteBillItem={deleteBillItem}
        changeBillItem={changeBillItem}
      />
      ))}
    <button onClick={newBillItem}>New Bill Item</button>
  </div>
);

BillItemList.propTypes = {
  billItems: React.PropTypes.arrayOf(
    React.PropTypes.object
  ).isRequired,
  deleteBillItem: React.PropTypes.func.isRequired,
  changeBillItem: React.PropTypes.func.isRequired,
  newBillItem: React.PropTypes.func.isRequired,
};

export default BillItemList;
