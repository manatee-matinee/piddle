import React from 'react';
import ReactDOM from 'react-dom';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import BillItem from './index';

const changeBillItem = () => {};
const deleteBillItem = () => {};

const props = {
  shallow: {
    changeBillItem,
    deleteBillItem,
    description: 'A wonderful BillItem',
    index: 14,
    price: 12.34,
  },
};

const selectors = {
  description: `input[name="billItem-${props.shallow.index}-description"]`,
  price: `input[name="billItem-${props.shallow.index}-price"]`,
};

const renderedComponent = {
  shallow: {
    new: shallow(
      <BillItem
        {...props.shallow}
        interactionType={Symbol.for('new')}
      />
    ),
    edit: shallow(
      <BillItem
        {...props.shallow}
        interactionType={Symbol.for('edit')}
      />
    ),
    claim: shallow(
      <BillItem
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
      <BillItem
        {...props.shallow}
        interactionType={Symbol.for('new')}
      />,
      // eslint-disable-next-line no-undef
      document.createElement('div'),
    );
  });

  it('has a field for inputting the description', () => {
    expect(component.find(selectors.description))
      .to.have.length(1);
  });

  it('has a field for inputting the price', () => {
    expect(component.find(selectors.price))
      .to.have.length(1);
  });

  it('populates the appropriate description', () => {
    expect(component.find(selectors.description).props().value)
      .to.equal(props.shallow.description);
  });

  it('populates the appropriate price', () => {
    expect(component.find(selectors.price).props().value)
      .to.equal(props.shallow.price);
  });
});


describe('edit', () => {
  const component = renderedComponent.shallow.edit;

  it('renders without crashing', () => {
    ReactDOM.render(
      <BillItem
        {...props.shallow}
        interactionType={Symbol.for('edit')}
      />,
      // eslint-disable-next-line no-undef
      document.createElement('div'),
    );
  });

  it('has a field for inputting the description', () => {
    expect(component.find(selectors.description))
      .to.have.length(1);
  });

  it('has a field for inputting the price', () => {
    expect(component.find(selectors.price))
      .to.have.length(1);
  });

  it('populates the appropriate description', () => {
    expect(component.find(selectors.description).props().value)
      .to.equal(props.shallow.description);
  });

  it('populates the appropriate price', () => {
    expect(component.find(selectors.price).props().value)
      .to.equal(props.shallow.price);
  });
});

describe('claim', () => {
  const component = renderedComponent.shallow.claim;

  it('renders without crashing', () => {
    ReactDOM.render(
      <BillItem
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

  it('should display the description', () => {
    // eslint-disable-next-line no-unused-expressions
    expect(component.html().includes(props.shallow.description))
      .to.be.true;
  });

  it('should display the price', () => {
    // eslint-disable-next-line no-unused-expressions
    expect(component.html().includes(props.shallow.price))
      .to.be.true;
  });
});
