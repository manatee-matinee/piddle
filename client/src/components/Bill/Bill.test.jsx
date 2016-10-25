import React from 'react';
import ReactDOM from 'react-dom';
import { expect } from 'chai';
import { mount, shallow } from 'enzyme';
import Bill from './index';
import BillItemList from './../BillItemList';
import BillItem from './../BillItem';
import TaxField from './../TaxField';
import TipField from './../TipField';

const shallowBill = shallow(
  <Bill />
);

const mountedBill = mount(
  <Bill />
);

it('renders without crashing', () => {
  // eslint-disable-next-line no-undef
  const div = document.createElement('div');
  ReactDOM.render(<Bill />, div);
});

it('has a field for inputting the bill\'s tax', () => {
  expect(shallowBill.find(TaxField)).to.have.length(1);
});

it('has a field for inputting the bill\'s tip', () => {
  expect(shallowBill.find(TipField)).to.have.length(1);
});

it('has a list of bill items', () => {
  expect(shallowBill.find(BillItemList)).to.have.length(1);
});

it('has a list of three bill items', () => {
  mountedBill.setState({
    billItems: [
      { description: 'a', price: 1 },
      { description: 'b', price: 2 },
      { description: 'c', price: 3 },
    ],
  });
  expect(mountedBill.find(BillItem)).to.have.length(3);
});

