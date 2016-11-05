import React from 'react';
import { FormGroup, FormControl, InputGroup, Button } from 'react-bootstrap';
import './TipField.css';

/**
 * @class TipField
 * @param {object} props
 * @param {function} props.changeTipValue
 * @param {function} props.changeTipPercent
 * @param {symbol} props.interactionType
 * @param {number} props.tipValue
 */
const TipField = (props) => {
  const isEditable = (
    props.interactionType === Symbol.for('new')
    || props.interactionType === Symbol.for('edit')
  );

  const changeTipPercent = (event) => {
    event.preventDefault();
    props.changeTipPercent(event.target.getAttribute('data-percent'));
  };

  const changeTipValue = (event) => {
    props.changeTipValue(event.target.value);
  };

  return (
    <div className="tipField">
      {isEditable &&
        <FormGroup>
          <InputGroup>
            <InputGroup.Addon>Tip</InputGroup.Addon>
            <FormControl
              type="number"
              name="tip"
              placeholder="Tip"
              value={props.tipValue}
              onChange={changeTipValue}
            />
            <InputGroup.Button>
              <Button
                style={{background: "#FF5F57", color: "white"}}
                onClick={changeTipPercent}
                data-percent="0"
              >
                No Tip
              </Button>
              <Button
                style={{background: "#48D359", color: "white"}}
                onClick={changeTipPercent}
                data-percent="10"
              >
                10%
              </Button>
              <Button
                style={{background: "#48D359", color: "white"}}
                onClick={changeTipPercent}
                data-percent="15"
              >
                15%
              </Button>
              <Button
                style={{background: "#48D359", color: "white"}}
                onClick={changeTipPercent}
                data-percent="20"
              >
                20%
              </Button>
            </InputGroup.Button>
          </InputGroup>
        </FormGroup>
      }
      {!isEditable &&
        <p><span>Tip</span> {props.tipValue}</p>
      }
    </div>
  );
};

TipField.propTypes = {
  // eslint-disable-next-line react/no-unused-prop-types
  changeTipPercent: React.PropTypes.func.isRequired,
  changeTipValue: React.PropTypes.func.isRequired,
  interactionType: React.PropTypes.symbol.isRequired,
  tipValue: React.PropTypes.number.isRequired,
};

export default TipField;

