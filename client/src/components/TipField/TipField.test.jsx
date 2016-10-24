import React from 'react';
import ReactDOM from 'react-dom';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import TipField from './index';

const changeTipValue = () => {};
const shallowTipField = shallow(
  <TipField
    tipValue={12.34}
    changeTipValue={changeTipValue}
  />
);

it('renders without crashing', () => {
  // eslint-disable-next-line no-undef
  const div = document.createElement('div');
  ReactDOM.render(
    <TipField
      tipValue={12.34}
      changeTipValue={changeTipValue}
    />,
    div
  );
});

it('has a field for inputting the tip', () => {
  expect(shallowTipField.find('input[name="tip"]')).to.have.length(1);
});

it('populates the appropriate tip value', () => {
  expect(shallowTipField.find('input[name="tip"]').props().value).to.equal(12.34);
});
