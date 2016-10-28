import React from 'react';
import ReactDOM from 'react-dom';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import TaxField from './index';

const changeTaxValue = () => {};
const inputSelector = 'input[name="tax"]';
const taxValue = 12.34;

const renderedComponent = {
  shallow: {
    editable: shallow(
      <TaxField
        taxValue={taxValue}
        changeTaxValue={changeTaxValue}
      />
    ),
    uneditable: shallow(
      <TaxField
        taxValue={taxValue}
        changeTaxValue={changeTaxValue}
        isEditable={false}
      />
    ),
  },
};

it('renders without crashing', () => {
  // eslint-disable-next-line no-undef
  const div = document.createElement('div');
  ReactDOM.render(
    <TaxField
      taxValue={taxValue}
      changeTaxValue={changeTaxValue}
    />,
    div
  );
});

describe('editable', () => {
  const taxField = renderedComponent.shallow.editable;

  it('has a field for inputting the tax', () => {
    expect(taxField.find(inputSelector))
      .to.have.length(1);
  });

  it('populates the appropriate tax value', () => {
    expect(taxField.find(inputSelector).props().value)
      .to.equal(taxValue);
  });
});

describe('uneditable', () => {
  const taxField = renderedComponent.shallow.uneditable;

  it('should not have an input field', () => {
    expect(taxField.find(inputSelector))
      .to.have.length(0);
  });

  it('should display the tax', () => {
    // eslint-disable-next-line no-unused-expressions
    expect(taxField.html().includes(taxValue))
      .to.be.true;
  });
});
