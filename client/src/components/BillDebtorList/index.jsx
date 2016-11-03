import React from 'react';
import BillDebtor from './../BillDebtor';

/**
 * @class BillDebtorList
 * @param {object} props
 * @param {object[]} props.debtors
 * @param {function} props.newBillDebtor
 */

const BillDebtorList = (props) => {
  return(
    <div className="BillDebtorList">
      {props.debtors.map((debtor, i) => (
        <BillDebtor
        key={i}
        index={i}
        {...debtor}
        />
      ))}
        <div className="row">
          <Button
            className="pull-right"
            id="new-bill-item-btn"
            bsStyle="success"
            onClick={props.newBillDebtor}
          >Tag Friend
          </Button>
        </div>
    </div>
  );
};

BillDebtorList.propTypes = {
  debtors: React.PropTypes.arrayOf(
    React.PropTypes.object
  ).isRequired,
  newBillDebtor: React.PropTypes.func.isRequired,
};

export default BillDebtorList;