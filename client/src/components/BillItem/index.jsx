import React from 'react';
import './BillItem.css';


/**
 * @class BillItem
 * @param {object} props
 * @param {function} props.changeBillItem
 * @param {function} props.deleteBillItem
 * @param {string} props.description
 * @param {number} props.index
 * @param {symbol} props.interactionType
 * @param {number} props.price
 */
const BillItem = (props) => {
  const isEditable = (
    props.interactionType === Symbol.for('new')
    || props.interactionType === Symbol.for('edit')
  );

  const fieldChange = (event) => {
    const field = {
      name: event.target.getAttribute('name').match(/([a-z]+)$/)[1],
      tagName: event.target.tagName,
      type: event.target.getAttribute('type'),
    };
    field.value = (field.type === 'number') ?
      Number.parseFloat(event.target.value) :
      event.target.value;

    props.changeBillItem(props.index, {
      [field.name]: field.value,
    });
  };

  return (
    <div className="BillItem">
      {isEditable &&
        <div>
          <input
            className="description"
            name={`billItem-${props.index}-description`}
            onChange={fieldChange}
            placeholder="Description"
            type="text"
            value={props.description}
          />
          <input
            className="price"
            name={`billItem-${props.index}-price`}
            onChange={fieldChange}
            placeholder="Price"
            type="number"
            value={props.price}
          />
          <button
            onClick={event => props.deleteBillItem(event, props.index)}
          >
            Delete
          </button>
        </div>
      }
      {!isEditable &&
        <div>
          <p><span>Description</span> {props.description}</p>
          <p><span>Price</span> {props.price}</p>
        </div>
      }
    </div>
  );
};

BillItem.propTypes = {
  changeBillItem: React.PropTypes.func.isRequired,
  deleteBillItem: React.PropTypes.func.isRequired,
  description: React.PropTypes.string.isRequired,
  index: React.PropTypes.number.isRequired,
  interactionType: React.PropTypes.symbol.isRequired,
  price: React.PropTypes.number.isRequired,
};

export default BillItem;
