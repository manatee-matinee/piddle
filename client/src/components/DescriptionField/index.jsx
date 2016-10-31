import React from 'react';
import { FormGroup, InputGroup, FormControl } from 'react-bootstrap';
import './DescriptionField.css';

/**
 * @class DescriptionField
 * @param {object} props
 * @param {function} props.changeDescriptionValue
 * @param {string} props.descriptionValue
 * @param {symbol} props.interactionType
 */
const DescriptionField = (props) => {
  const isEditable = (
    props.interactionType === Symbol.for('new')
    || props.interactionType === Symbol.for('edit')
  );

  return (
    <div className="bill-description">
      {isEditable &&
        <FormGroup>
          <InputGroup>
            <InputGroup.Addon>Bill Description</InputGroup.Addon>
            <FormControl
              type="text"
              name="description"
              placeholder="Description"
              value={props.descriptionValue}
              onChange={event => (
                props.changeDescriptionValue(event.target.value)
              )}
            />
          </InputGroup>
        </FormGroup>
      }
      {!isEditable &&
        <p>{props.descriptionValue}</p>
      }
    </div>
  );
};

DescriptionField.propTypes = {
  changeDescriptionValue: React.PropTypes.func.isRequired,
  descriptionValue: React.PropTypes.string.isRequired,
  interactionType: React.PropTypes.symbol.isRequired,
};

export default DescriptionField;

