import React from 'react';
import ReactDOM from 'react-dom';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import DescriptionField from './index';

const changeDescriptionValue = () => {};
const description = 'A description';

const selectors = {
  description: 'input[name="description"]',
};

const props = {
  shallow: {
    changeDescriptionValue,
    descriptionValue: description,
  },
};

const renderedComponent = {
  shallow: {
    new: shallow(
      <DescriptionField
        {...props.shallow}
        interactionType={Symbol.for('new')}
      />
    ),
    edit: shallow(
      <DescriptionField
        {...props.shallow}
        interactionType={Symbol.for('edit')}
      />
    ),
    claim: shallow(
      <DescriptionField
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
      <DescriptionField
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

  it('populates the appropriate description value', () => {
    expect(component.find(selectors.description).props().value)
      .to.equal(description);
  });
});


describe('edit', () => {
  const component = renderedComponent.shallow.edit;

  it('renders without crashing', () => {
    ReactDOM.render(
      <DescriptionField
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

  it('populates the appropriate description value', () => {
    expect(component.find(selectors.description).props().value)
      .to.equal(description);
  });
});

describe('claim', () => {
  const component = renderedComponent.shallow.claim;

  it('renders without crashing', () => {
    ReactDOM.render(
      <DescriptionField
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

  it('should hold the description', () => {
    // eslint-disable-next-line no-unused-expressions
    expect(component.html().includes(description))
      .to.be.true;
  });
});
