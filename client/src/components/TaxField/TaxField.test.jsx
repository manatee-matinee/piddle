import React from 'react';
import ReactDOM from 'react-dom';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import TaxField from './index';

const changeTaxValue = () => {};
const shallowTaxField = shallow(
  <TaxField
    taxValue={12.34}
    changeTaxValue={changeTaxValue}
  />
);

it('renders without crashing', () => {
  // eslint-disable-next-line no-undef
  const div = document.createElement('div');
  ReactDOM.render(
    <TaxField
      taxValue={12.34}
      changeTaxValue={changeTaxValue}
    />,
    div
  );
});

it('has a field for inputting the tax', () => {
  expect(shallowTaxField.find('input[name="tax"]')).to.have.length(1);
});

it('populates the appropriate tax value', () => {
  expect(shallowTaxField.find('input[name="tax"]').props().value).to.equal(12.34);
});
