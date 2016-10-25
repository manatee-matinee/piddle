import React from 'react';
import './TaxField.css';

/**
 * @class TaxField
 */
class TaxField extends React.Component {
  /**
   * @constructs
   * @param {object} props
   * @param {function} props.changeTaxValue
   * @param {number} props.taxValue
   */
  constructor(props) {
    super(props);

    this.valueChange = this.valueChange.bind(this);
  }

  /**
   * Update Bill state with new tax value.
   * @method
   * @name valueChange
   * @param {object} event
   */
  valueChange(event) {
    this.props.changeTaxValue(Number.parseFloat(event.target.value));
  }

  /**
   * Render the component
   * @method
   * @name render
   * @returns {object}
   */
  render() {
    return (
      <div>
        <label htmlFor="tax">Tax</label>
        <input
          type="number"
          name="tax"
          placeholder="Tax"
          value={this.props.taxValue}
          onChange={this.valueChange}
        />
      </div>
    );
  }
}

TaxField.propTypes = {
  changeTaxValue: React.PropTypes.func.isRequired,
  taxValue: React.PropTypes.number.isRequired,
};

export default TaxField;

