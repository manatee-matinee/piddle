import React from 'react';
import ReactDOM from 'react-dom';
import { expect } from 'chai';
import { mount, shallow } from 'enzyme';
import Signup from './index';

const shallowSignup = shallow(
  <Signup />
);

const mountedSignup = mount(
  <Signup />
);

it('renders without crashing', () => {
  // eslint-disable-next-line no-undef
  const div = document.createElement('div');
  ReactDOM.render(<Signup />, div);
});

it('has a field for inputting the user\'s email', () => {
  expect(shallowSignup.find('#emailAddress')).to.have.length(1);
});

it('has a field for inputting the user\'s password', () => {
  expect(shallowSignup.find('#password')).to.have.length(1);
});

it('has a submit input for submitting Login form', () => {
  expect(shallowSignup.find('#submitSignup'))
    .to.have.length(1);
});
