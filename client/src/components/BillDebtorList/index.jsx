import React from 'react';
import { Button } from 'react-bootstrap';

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