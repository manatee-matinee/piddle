import React from 'react';
import ReactDOM from 'react-dom';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import DescriptionField from './index';

const changeDescriptionValue = () => {};
const description = 'A description';
const inputSelector = 'input[name="description"]';

const renderedComponent = {
  shallow: {
    editable: shallow(
      <DescriptionField
        descriptionValue={description}
        changeDescriptionValue={changeDescriptionValue}
      />
    ),
    uneditable: shallow(
      <DescriptionField
        descriptionValue={description}
        changeDescriptionValue={changeDescriptionValue}
        isEditable={false}
      />
    ),
  },
};

it('renders without crashing', () => {
  // eslint-disable-next-line no-undef
  const div = document.createElement('div');
  ReactDOM.render(
    <DescriptionField
      descriptionValue={description}
      changeDescriptionValue={changeDescriptionValue}
    />,
    div
  );
});

describe('editable', () => {
  const component = renderedComponent.shallow.editable;

  it('has a field for inputting the description', () => {
    expect(component.find(inputSelector))
      .to.have.length(1);
  });

  it('populates the appropriate description value', () => {
    expect(component.find(inputSelector).props().value)
      .to.equal(description);
  });
});

describe('uneditable', () => {
  const component = renderedComponent.shallow.uneditable;

  it('should not have an input field', () => {
    expect(component.find(inputSelector))
      .to.have.length(0);
  });

  it('should hold the description', () => {
    // eslint-disable-next-line no-unused-expressions
    expect(component.html().includes(description))
      .to.be.true;
  });
});
