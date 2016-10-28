import React from 'react';
import './TipField.css';

/**
 * @class TipField
 * @param {object} props
 * @param {function} props.changeTipValue
 * @param {function} props.changeTipPercent
 * @param {number} props.tipValue
 */
const TipField = (props) => {
  const changeTipPercent = (event) => {
    event.preventDefault();
    props.changeTipPercent(event.target.getAttribute('data-percent'));
  };

  const changeTipValue = (event) => {
    props.changeTipValue(event.target.value);
  };

  return (
    <div>
      <label htmlFor="tip">Tip</label>
      <input
        type="number"
        name="tip"
        placeholder="Tip"
        value={props.tipValue}
        onChange={changeTipValue}
      />
      <div className="tipSuggestions">
        <button
          onClick={changeTipPercent}
          data-percent="0"
        >
          No Tip
        </button>
        <button
          onClick={changeTipPercent}
          data-percent="10"
        >
          10%
        </button>
        <button
          onClick={changeTipPercent}
          data-percent="15"
        >
          15%
        </button>
        <button
          onClick={changeTipPercent}
          data-percent="20"
        >
          20%
        </button>
      </div>
    </div>
  );
};

TipField.propTypes = {
  changeTipPercent: React.PropTypes.func.isRequired,
  changeTipValue: React.PropTypes.func.isRequired,
  tipValue: React.PropTypes.number.isRequired,
};

export default TipField;

