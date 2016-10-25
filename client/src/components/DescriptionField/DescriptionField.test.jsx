import React from 'react';
import ReactDOM from 'react-dom';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import DescriptionField from './index';

const changeDescriptionValue = () => {};
const shallowDescriptionField = shallow(
  <DescriptionField
    descriptionValue={'A Description'}
    changeDescriptionValue={changeDescriptionValue}
  />
);

it('renders without crashing', () => {
  // eslint-disable-next-line no-undef
  const div = document.createElement('div');
  ReactDOM.render(
    <DescriptionField
      descriptionValue={'A Description'}
      changeDescriptionValue={changeDescriptionValue}
    />,
    div
  );
});

it('has a field for inputting the description', () => {
  expect(shallowDescriptionField.find('input[name="description"]')).to.have.length(1);
});

it('populates the appropriate description value', () => {
  expect(shallowDescriptionField.find('input[name="description"]').props().value).to.equal('A Description');
});
