import React from 'react';
import './DescriptionField.css';

/**
 * @class DescriptionField
 * @param {object} props
 * @param {function} props.changeDescriptionValue
 * @param {string} props.descriptionValue
 * @param {bool} [props.isEditable]
 */
const DescriptionField = (props) => {
  // Absent boolean props are assumed to be true
  const isEditable = (props.isEditable === undefined || props.isEditable);

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
  isEditable: React.PropTypes.bool,
};

export default DescriptionField;

