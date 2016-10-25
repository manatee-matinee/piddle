import React from 'react';
import ReactDOM from 'react-dom';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import BillItemList from './index';
import BillItem from './../BillItem';

const changeBillItem = () => {};
const deleteBillItem = () => {};
const newBillItem = () => {};

const billItemListProps = {
  changeBillItem,
  deleteBillItem,
  newBillItem,
  billItems: [
    { description: 'a', price: 1 },
    { description: 'b', price: 2 },
    { description: 'c', price: 3 },
  ],
};
const shallowBillItemList = shallow(
  <BillItemList {...billItemListProps} />
);

it('renders without crashing', () => {
  // eslint-disable-next-line no-undef
  const div = document.createElement('div');
  ReactDOM.render(
    <BillItemList {...billItemListProps} />,
    div
  );
});

it('has a button for adding additional bill items', () => {
  expect(shallowBillItemList.find('button'))
    .to.have.length(1);
});

it('has a bill item for each provided bill item', () => {
  expect(shallowBillItemList.find(BillItem))
    .to.have.length(billItemListProps.billItems.length);
});
