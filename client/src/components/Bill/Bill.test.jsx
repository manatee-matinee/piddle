import React from 'react';
import ReactDOM from 'react-dom';
import { expect } from 'chai';
import { mount } from 'enzyme';
import Bill from './index';
import BillItemList from './../BillItemList';
import TaxField from './../TaxField';
import TipField from './../TipField';

const mountedBill = mount(
  <Bill params={{ id: undefined }} />
);

it('renders without crashing', () => {
  // eslint-disable-next-line no-undef
  const div = document.createElement('div');
  ReactDOM.render(<Bill params={{ id: undefined }} />, div);
});

it('has a field for inputting the bill\'s tax', () => {
  expect(mountedBill.find(TaxField)).to.have.length(1);
});

it('has a field for inputting the bill\'s tip', () => {
  expect(mountedBill.find(TipField)).to.have.length(1);
});

it('has a list of bill items', () => {
  expect(mountedBill.find(BillItemList)).to.have.length(1);
});
