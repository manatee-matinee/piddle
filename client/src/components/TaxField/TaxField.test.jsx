import React from 'react';
import ReactDOM from 'react-dom';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import TaxField from './index';

const changeTaxValue = () => {};
const taxValue = 12.34;

const selectors = {
  tax: 'input[name="tax"]',
};

const props = {
  shallow: {
    changeTaxValue,
    taxValue,
  },
};

const renderedComponent = {
  shallow: {
    new: shallow(
      <TaxField
        {...props.shallow}
        interactionType={Symbol.for('new')}
      />
    ),
    edit: shallow(
      <TaxField
        {...props.shallow}
        interactionType={Symbol.for('edit')}
      />
    ),
    claim: shallow(
      <TaxField
        {...props.shallow}
        interactionType={Symbol.for('claim')}
      />
    ),
  },
};

describe('new', () => {
  const component = renderedComponent.shallow.new;

  it('renders without crashing', () => {
    ReactDOM.render(
      <TaxField
        {...props.shallow}
        interactionType={Symbol.for('new')}
      />,
      // eslint-disable-next-line no-undef
      document.createElement('div'),
    );
  });

  it('has a field for inputting the tax', () => {
    expect(component.find(selectors.tax))
      .to.have.length(1);
  });

  it('populates the appropriate tax value', () => {
    expect(component.find(selectors.tax).props().value)
      .to.equal(taxValue);
  });
});


describe('edit', () => {
  const component = renderedComponent.shallow.edit;

  it('renders without crashing', () => {
    ReactDOM.render(
      <TaxField
        {...props.shallow}
        interactionType={Symbol.for('edit')}
      />,
      // eslint-disable-next-line no-undef
      document.createElement('div'),
    );
  });

  it('has a field for inputting the tax', () => {
    expect(component.find(selectors.tax))
      .to.have.length(1);
  });

  it('populates the appropriate tax value', () => {
    expect(component.find(selectors.tax).props().value)
      .to.equal(taxValue);
  });
});

describe('claim', () => {
  const component = renderedComponent.shallow.claim;

  it('renders without crashing', () => {
    ReactDOM.render(
      <TaxField
        {...props.shallow}
        interactionType={Symbol.for('claim')}
      />,
      // eslint-disable-next-line no-undef
      document.createElement('div'),
    );
  });

  it('should not have input fields', () => {
    expect(component.find('input'))
      .to.have.length(0);
  });

  it('should hold the tax', () => {
    // eslint-disable-next-line no-unused-expressions
    expect(component.html().includes(taxValue))
      .to.be.true;
  });
});
