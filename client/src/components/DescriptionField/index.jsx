import React from 'react';
import './DescriptionField.css';

/**
 * @class DescriptionField
 */
class DescriptionField extends React.Component {
  /**
   * @constructs
   * @param {object} props
   * @param {function} props.changeDescriptionValue
   * @param {string} props.descriptionValue
   * @param {bool} [props.isEditable]
   */
  constructor(props) {
    super(props);

    // Absent boolean props are assumed to be true
    this.isEditable = (this.props.isEditable === undefined || this.props.isEditable);
    this.valueChange = this.valueChange.bind(this);
  }

  /**
   * Update Bill state with new description value.
   * @method
   * @name valueChange
   * @param {object} event
   */
  valueChange(event) {
    this.props.changeDescriptionValue(event.target.value);
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
        {this.isEditable &&
          <div>
            <label htmlFor="description">Description</label>
            <input
              type="text"
              name="description"
              placeholder="Description"
              value={this.props.descriptionValue}
              onChange={this.valueChange}
            />
          </div>
        }
        {!this.isEditable &&
          <p>{this.props.descriptionValue}</p>
        }
      </div>
    );
  }
}

DescriptionField.propTypes = {
  changeDescriptionValue: React.PropTypes.func.isRequired,
  descriptionValue: React.PropTypes.string.isRequired,
  isEditable: React.PropTypes.bool,
};

export default DescriptionField;

