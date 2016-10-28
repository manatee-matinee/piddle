import React from 'react';
import ReactDOM from 'react-dom';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import TipField from './index';

const changeTipPercent = () => {};
const changeTipValue = () => {};
const tipValue = 12.34;

const selectors = {
  tip: 'input[name="tip"]',
  tipButtons: 'button[data-percent]',
};

const props = {
  shallow: {
    changeTipValue,
    changeTipPercent,
    tipValue,
  },
};

const renderedComponent = {
  shallow: {
    new: shallow(
      <TipField
        {...props.shallow}
        interactionType={Symbol.for('new')}
      />
    ),
    edit: shallow(
      <TipField
        {...props.shallow}
        interactionType={Symbol.for('edit')}
      />
    ),
    claim: shallow(
      <TipField
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
      <TipField
        {...props.shallow}
        interactionType={Symbol.for('new')}
      />,
      // eslint-disable-next-line no-undef
      document.createElement('div'),
    );
  });

  it('has a field for inputting the tip', () => {
    expect(component.find(selectors.tip))
      .to.have.length(1);
  });

  it('has buttons for computing the tip', () => {
    expect(component.find(selectors.tipButtons))
      .to.have.length.above(0);
  });

  it('populates the appropriate tip value', () => {
    expect(component.find(selectors.tip).props().value)
      .to.equal(tipValue);
  });
});


describe('edit', () => {
  const component = renderedComponent.shallow.edit;

  it('renders without crashing', () => {
    ReactDOM.render(
      <TipField
        {...props.shallow}
        interactionType={Symbol.for('edit')}
      />,
      // eslint-disable-next-line no-undef
      document.createElement('div'),
    );
  });

  it('has a field for inputting the tip', () => {
    expect(component.find(selectors.tip))
      .to.have.length(1);
  });

  it('has buttons for computing the tip', () => {
    expect(component.find(selectors.tipButtons))
      .to.have.length.above(0);
  });

  it('populates the appropriate tip value', () => {
    expect(component.find(selectors.tip).props().value)
      .to.equal(tipValue);
  });
});

describe('claim', () => {
  const component = renderedComponent.shallow.claim;

  it('renders without crashing', () => {
    ReactDOM.render(
      <TipField
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

  it('should not have buttons for computing the tip', () => {
    expect(component.find(selectors.tipButtons))
      .to.have.length(0);
  });

  it('should hold the tip', () => {
    // eslint-disable-next-line no-unused-expressions
    expect(component.html().includes(tipValue))
      .to.be.true;
  });
});
