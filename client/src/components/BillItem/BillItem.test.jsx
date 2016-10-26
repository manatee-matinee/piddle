import React from 'react';
import ReactDOM from 'react-dom';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import BillItem from './index';

const changeBillItem = () => {};
const deleteBillItem = () => {};

const shallowBillItemProps = {
  changeBillItem,
  deleteBillItem,
  description: 'A wonderful BillItem',
  index: 14,
  price: 12.34,
};
const shallowBillItem = shallow(
  <BillItem {...shallowBillItemProps} />
);

it('renders without crashing', () => {
  // eslint-disable-next-line no-undef
  const div = document.createElement('div');
  ReactDOM.render(
    <BillItem
      changeBillItem={changeBillItem}
      deleteBillItem={deleteBillItem}
      description="A wonderful BillItem"
      index={14}
      price={12.34}
    />,
    div
  );
});

it('has a field for inputting the description', () => {
  expect(shallowBillItem.find('input.description')).to.have.length(1);
});

it('has a field for inputting the price', () => {
  expect(shallowBillItem.find('input.price')).to.have.length(1);
});

it('populates the appropriate description', () => {
  expect(shallowBillItem.find('input.description').props().value)
    .to.equal(shallowBillItemProps.description);
});

it('populates the appropriate price', () => {
  expect(shallowBillItem.find('input.price').props().value)
    .to.equal(shallowBillItemProps.price);
});
