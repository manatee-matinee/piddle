import React from 'react';
import ReactDOM from 'react-dom';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import TipField from './index';

const changeTipPercent = () => {};
const changeTipValue = () => {};
const inputSelector = 'input[name="tip"]';
const tipValue = 12.34;

const renderedComponent = {
  shallow: {
    editable: shallow(
      <TipField
        changeTipValue={changeTipValue}
        changeTipPercent={changeTipPercent}
        tipValue={tipValue}
      />
    ),
    uneditable: shallow(
      <TipField
        changeTipValue={changeTipValue}
        changeTipPercent={changeTipPercent}
        isEditable={false}
        tipValue={tipValue}
      />
    ),
  },
};



it('renders without crashing', () => {
  // eslint-disable-next-line no-undef
  const div = document.createElement('div');
  ReactDOM.render(
    <TipField
      changeTipValue={changeTipValue}
      changeTipPercent={changeTipPercent}
      tipValue={tipValue}
    />,
    div
  );
});

describe('editable', () => {
  const component = renderedComponent.shallow.editable;

  it('has a field for inputting the tip', () => {
    expect(component.find(inputSelector))
      .to.have.length(1);
  });

  it('populates the appropriate tip value', () => {
    expect(component.find(inputSelector).props().value)
      .to.equal(12.34);
  });
});


describe('uneditable', () => {
  const component = renderedComponent.shallow.uneditable;

  it('should not have input fields', () => {
    expect(component.find('input'))
      .to.have.length(0);
  });

  it('should hold the description', () => {
    // eslint-disable-next-line no-unused-expressions
    expect(component.html().includes(tipValue))
      .to.be.true;
  });
});
