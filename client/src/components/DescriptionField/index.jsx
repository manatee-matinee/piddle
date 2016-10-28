import React from 'react';
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
    <div>
      {isEditable &&
        <div>
          <label htmlFor="description">Description</label>
          <input
            type="text"
            name="description"
            placeholder="Description"
            value={props.descriptionValue}
            onChange={event => (
              props.changeDescriptionValue(event.target.value)
            )}
          />
        </div>
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

