import React from 'react';
import './DescriptionField.css';

class DescriptionField extends React.Component {
  constructor(props) {
    super(props);

    this.valueChange = this.valueChange.bind(this);
  }

  valueChange(event) {
    this.props.changeDescriptionValue(event.target.value);
  }

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

