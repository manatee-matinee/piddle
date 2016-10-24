import React from 'react';
import ReactDOM from 'react-dom';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import Bill from './index';
import TaxField from './../TaxField';
import TipField from './../TipField';

it('renders without crashing', () => {
  // eslint-disable-next-line no-undef
  const div = document.createElement('div');
  ReactDOM.render(<Bill />, div);
});

it('has a field for inputting the bill\'s tax', () => {
  const wrapper = shallow(<Bill />);
  expect(wrapper.find(TaxField)).to.have.length(1);
});

it('has a field for inputting the bill\'s tip', () => {
  const wrapper = shallow(<Bill />);
  expect(wrapper.find(TipField)).to.have.length(1);
});
