import React from 'react';
import './TipField.css';

const TipField = ({ tipValue }) => (
  <div>
    <label htmlFor="tip">Tip</label>
    <input
      type="number"
      className="price"
      name="tip"
      placeholder="Tip"
      value={tipValue}
    />
  </div>
);

TipField.propTypes = {
  tipValue: React.PropTypes.number.isRequired,
};

export default TipField;

