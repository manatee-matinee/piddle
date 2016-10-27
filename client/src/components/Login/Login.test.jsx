import React from 'react';
import ReactDOM from 'react-dom';
import { expect } from 'chai';
import { mount, shallow } from 'enzyme';
import Login from './index';

const shallowLogin = shallow(
  <Login />
);

const mountedLogin = mount(
  <Login />
);

it('renders without crashing', () => {
  // eslint-disable-next-line no-undef
  const div = document.createElement('div');
  ReactDOM.render(<Login />, div);
});

it('has a field for inputting the user\'s email', () => {
  expect(shallowLogin.find('input.emailAddress')).to.have.length(1);
});

it('has a field for inputting the user\'s password', () => {
  expect(shallowLogin.find('input.password')).to.have.length(1);
});

it('has a submit input for submitting Login form', () => {
  expect(shallowLogin.find('input.submit'))
    .to.have.length(1);
});
