import React from 'react';
import ReactDOM from 'react-dom';
import { expect } from 'chai';
import { mount } from 'enzyme';
import Signup from './index';
import { defineLocalStorage, RouterSpy } from '../../utils/testHelpers';

const selectors = {
  emailAddress: 'input[name="emailAddress"]',
  password: 'input[name="password"]',
  name: 'input[name="name"]',
  squareId: 'input[name="squareId"]',
  paypalId: 'input[name="paypalId"]',
  submit: 'input[type="submit"]',
};

describe('Signup Form', () => {
  defineLocalStorage();

  describe('Not Authenticated', () => {
    let component;
    let routerSpy;

    beforeEach(() => {
      routerSpy = new RouterSpy();
      component = mount(
        <Signup router={routerSpy} />
      );
    });

    it('renders without crashing', () => {
      ReactDOM.render(
        <Signup />,
        // eslint-disable-next-line no-undef
        document.createElement('div')
      );
    });

    it('has a field for inputting the user\'s email', () => {
      expect(component.find(selectors.emailAddress))
        .to.have.length(1);
    });

    it('has a field for inputting the user\'s password', () => {
      expect(component.find(selectors.password))
        .to.have.length(1);
    });

    it('has a field for inputting the user\'s name', () => {
      expect(component.find(selectors.name))
        .to.have.length(1);
    });

    it('has a field for inputting the user\'s Square ID', () => {
      expect(component.find(selectors.squareId))
        .to.have.length(1);
    });

    it('has a field for inputting the user\'s Paypal ID', () => {
      expect(component.find(selectors.paypalId))
        .to.have.length(1);
    });

    it('has a single submit input for submitting Login form', () => {
      expect(component.find(selectors.submit))
        .to.have.length(1);
    });
  });

  /**
   * @todo Integrate tokens into this test so we can test
   */
  describe('Authenticated', () => {

  });
});
