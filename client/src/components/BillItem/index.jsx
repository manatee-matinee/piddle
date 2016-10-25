import React, { Component } from 'react';
import './BillItem.css';

/**
 * @class BillItem
 */
class BillItem extends Component {
  /**
   * @constructs
   * @param {object} props
   * @param {function} props.changeBillItem
   * @param {function} props.deleteBillItem
   * @param {string} props.description
   * @param {number} props.index
   * @param {number} props.price
   */
  constructor(props) {
    super(props);

    this.fieldChange = this.fieldChange.bind(this);
  }

  /**
   * Update BillItem's parent's state for a given field.
   * @method
   * @name fieldChange
   * @param {object} event
   */
  fieldChange(event) {
    const field = {
      name: event.target.getAttribute('name').match(/([a-z]+)$/)[1],
      tagName: event.target.tagName,
      type: event.target.getAttribute('type'),
    };
    field.value = (field.type === 'number') ?
      Number.parseFloat(event.target.value) :
      event.target.value;

    this.props.changeBillItem(this.props.index, {
      [field.name]: field.value,
    });
  }

  /**
   * Render the component
   * @method
   * @name render
   * @returns {object}
   */
  render() {
    return (
      <div className="BillItem">
        <input
          className="description"
          name={`billItem-${this.props.index}-description`}
          onChange={this.fieldChange}
          placeholder="Description"
          type="text"
          value={this.props.description}
        />
        <input
          className="price"
          name={`billItem-${this.props.index}-price`}
          onChange={this.fieldChange}
          placeholder="Price"
          type="number"
          value={this.props.price}
        />
        <button
          onClick={event => this.props.deleteBillItem(event, this.props.index)}
        >
          Delete
        </button>
      </div>
    );
  }
}

BillItem.propTypes = {
  changeBillItem: React.PropTypes.func.isRequired,
  deleteBillItem: React.PropTypes.func.isRequired,
  description: React.PropTypes.string.isRequired,
  index: React.PropTypes.number.isRequired,
  price: React.PropTypes.number.isRequired,
};

export default BillItem;
