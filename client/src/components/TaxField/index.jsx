import React from 'react';
import './TaxField.css';

/**
 * @class TaxField
 * @param {object} props
 * @param {function} props.changeTaxValue
 * @param {number} props.taxValue
 * @param {boolean} [props.isEditable]
 */

const TaxField = (props) => {
  // Absent boolean props are assumed to be true
  const isEditable = (props.isEditable === undefined || props.isEditable);

  return (
    <div>
      {isEditable &&
        <div>
          <label htmlFor="tax">Tax</label>
          <input
            type="number"
            name="tax"
            placeholder="Tax"
            value={props.taxValue}
            onChange={event => (
              props.changeTaxValue(Number.parseFloat(event.target.value))
            )}
          />
        </div>
      }
      {!isEditable &&
        <p>{props.taxValue}</p>
      }
    </div>
  );
};

TaxField.propTypes = {
  changeTaxValue: React.PropTypes.func.isRequired,
  isEditable: React.PropTypes.bool,
  taxValue: React.PropTypes.number.isRequired,
};

export default TaxField;

