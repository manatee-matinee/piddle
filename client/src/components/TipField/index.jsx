import React from 'react';
import './TipField.css';

class TipField extends React.Component {
  valueChange(event) {
    this.props.changeTipValue(event.target.value);
  }

  render() {
    return (
      <div>
        <label htmlFor="tip">Tip</label>
        <input
          type="number"
          name="tip"
          placeholder="Tip"
          value={this.props.tipValue}
          onChange={this.valueChange}
        />
      </div>
    );
  }
}

TipField.propTypes = {
  changeTipValue: React.PropTypes.func.isRequired,
  tipValue: React.PropTypes.number.isRequired,
};

export default TipField;

