import React from 'react';
import ReactDOM from 'react-dom';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import Bill from './index';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Bill />, div);
});

it('has a field for inputting the bill\'s tax', () => {
  const wrapper = shallow(<Bill />);
  expect(wrapper.find('.tax')).to.have.length(1);
});
