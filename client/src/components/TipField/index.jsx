import React from 'react';
import './TipField.css';

class TipField extends React.Component {
  constructor(props) {
    super(props);

    this.changeTipPercent = this.changeTipPercent.bind(this);
    this.changeTipValue = this.changeTipValue.bind(this);
  }

  changeTipPercent(event) {
    event.preventDefault();
    this.props.changeTipPercent(event.target.getAttribute('data-percent'));
  }

  changeTipValue(event) {
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
          onChange={this.changeTipValue}
        />
        <div className="tipSuggestions">
          <button
            onClick={this.changeTipPercent}
            data-percent="0"
          >
            No Tip
          </button>
          <button
            onClick={this.changeTipPercent}
            data-percent="10"
          >
            10%
          </button>
          <button
            onClick={this.changeTipPercent}
            data-percent="15"
          >
            15%
          </button>
          <button
            onClick={this.changeTipPercent}
            data-percent="20"
          >
            20%
          </button>
        </div>
      </div>
    );
  }
}

TipField.propTypes = {
  changeTipPercent: React.PropTypes.func.isRequired,
  changeTipValue: React.PropTypes.func.isRequired,
  tipValue: React.PropTypes.number.isRequired,
};

export default TipField;

