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
   */
  constructor(props) {
    super(props);

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
        <label htmlFor="description">Description</label>
        <input
          type="text"
          name="description"
          placeholder="Description"
          value={this.props.descriptionValue}
          onChange={this.valueChange}
        />
      </div>
    );
  }
}

DescriptionField.propTypes = {
  changeDescriptionValue: React.PropTypes.func.isRequired,
  descriptionValue: React.PropTypes.string.isRequired,
};

export default DescriptionField;

