import React from 'react';
import { Button } from 'react-bootstrap';
import BillDebtor from './../BillDebtor';

/**
 * @class BillDebtorList
 * @param {object} props
 * @param {object[]} props.debtors
 * @param {function} props.newBillDebtor
 * @param {function} props.deleteBillDebtor
 */

const BillDebtorList = (props) => {

  return(
    <div className="BillDebtorList">
      {props.debtors.map((debtor, i) => (
        <BillDebtor
        key={i}
        index={i}
        {...debtor}
        changeBillDebtor={props.changeBillDebtor}
        deleteBillDebtor={props.deleteBillDebtor}
        />
      ))}
      <div className="row">
        <Button
          className="pull-right"
          id="new-bill-item-btn"
          style={{background: "#48D359", color: "white"}}
          onClick={props.newBillDebtor}
        >Add Friend
        </Button>
      </div>
    </div>
  );
};

BillDebtorList.propTypes = {
  // eslint-disable-next-line react/no-unused-prop-types
  debtors: React.PropTypes.arrayOf(
    React.PropTypes.object
  ).isRequired,
  newBillDebtor: React.PropTypes.func.isRequired,
  deleteBillDebtor: React.PropTypes.func.isRequired,
  changeBillDebtor: React.PropTypes.func.isRequired
};

export default BillDebtorList;
