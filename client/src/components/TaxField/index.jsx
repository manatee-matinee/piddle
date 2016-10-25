import React from 'react';
import './TaxField.css';

class TaxField extends React.Component {
  valueChange(event) {
    this.props.changeTaxValue(event.target.value);
  }

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

