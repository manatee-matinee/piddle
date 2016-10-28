import React from 'react';
import './TaxField.css';

/**
 * @class TaxField
 * @param {object} props
 * @param {function} props.changeTaxValue
 * @param {symbol} props.interactionType
 * @param {number} props.taxValue
 */
const TaxField = (props) => {
  const isEditable = (
    props.interactionType === Symbol.for('new')
    || props.interactionType === Symbol.for('edit')
  );

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
        <p><span>Tax</span> {props.taxValue}</p>
      }
    </div>
  );
};

TaxField.propTypes = {
  changeTaxValue: React.PropTypes.func.isRequired,
  interactionType: React.PropTypes.symbol.isRequired,
  taxValue: React.PropTypes.number.isRequired,
};

export default TaxField;

