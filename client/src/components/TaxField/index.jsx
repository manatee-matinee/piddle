import React from 'react';
import './TaxField.css';

const TaxField = ({ taxValue }) => (
  <div>
    <label htmlFor="tax">Tax</label>
    <input
      type="number"
      className="price"
      name="tax"
      placeholder="Tax"
      value={taxValue}
    />
  </div>
);

TaxField.propTypes = {
  taxValue: React.PropTypes.number.isRequired,
};

export default TaxField;

