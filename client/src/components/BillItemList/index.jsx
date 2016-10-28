import React from 'react';
import './BillItemList.css';
import BillItem from './../BillItem';

/**
 * @class BillItemList
 * @param {object} props
 * @param {object[]} props.billItems[]
 * @param {function} props.deleteBillItem
 * @param {function} props.changeBillItem
 * @param {symbol} props.interactionType
 * @param {function} props.newBillItem
 */
const BillItemList = (props) => {
  const isEditable = (
    props.interactionType === Symbol.for('new')
    || props.interactionType === Symbol.for('edit')
  );

  return (
    <div className="BillItemList">
      {props.billItems.map((item, i) => (
        <BillItem
          key={i}
          index={i}
          {...item}
          deleteBillItem={props.deleteBillItem}
          changeBillItem={props.changeBillItem}
          interactionType={props.interactionType}
        />
        ))}
      {isEditable &&
        <button onClick={props.newBillItem}>New Bill Item</button>
      }
    </div>
  );
};

BillItemList.propTypes = {
  billItems: React.PropTypes.arrayOf(
    React.PropTypes.object
  ).isRequired,
  deleteBillItem: React.PropTypes.func.isRequired,
  changeBillItem: React.PropTypes.func.isRequired,
  interactionType: React.PropTypes.symbol.isRequired,
  newBillItem: React.PropTypes.func.isRequired,
};

export default BillItemList;
