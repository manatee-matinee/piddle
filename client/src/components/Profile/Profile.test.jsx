import React from 'react';
import ReactDOM from 'react-dom';
import { expect } from 'chai';
import { mount, shallow } from 'enzyme';
import Profile from './index';

const shallowProfile = shallow(
  <Profile />
);

const mountedProfile = mount(
  <Profile />
);

it('renders without crashing', () => {
  // eslint-disable-next-line no-undef
  const div = document.createElement('div');
  ReactDOM.render(<Profile />, div);
});

it('has a field for inputting the user\'s email', () => {
  expect(shallowProfile.find('input.emailAddress')).to.have.length(1);
});

it('has a field for inputting the user\'s password', () => {
  expect(shallowProfile.find('input.password')).to.have.length(1);
});

it('has a submit input for submitting Profile form', () => {
  expect(shallowProfile.find('input.submit'))
    .to.have.length(1);
});
