import React from 'react';
import ReactDOM from 'react-dom';
import { expect } from 'chai';
import { mount } from 'enzyme';
import { defineLocalStorage, RouterSpy } from '../../utils/testHelpers';
import Profile from './index';

const selectors = {
  emailAddress: 'input[name="emailAddress"]',
  password: 'input[name="password"]',
  name: 'input[name="name"]',
  squareId: 'input[name="squareId"]',
  paypalId: 'input[name="paypalId"]',
  submit: 'input[type="submit"]',
};

describe('Profile Form', () => {
  describe('Not Authenticated', () => {
    let routerSpy;
    defineLocalStorage();

    beforeEach(() => {
      routerSpy = new RouterSpy();
    });

    it('renders without crashing', () => {
      ReactDOM.render(
        <Profile router={routerSpy} />,
        // eslint-disable-next-line no-undef
        document.createElement('div'),
      );
    });

    it('redirect to login page', () => {
      // eslint-disable-next-line no-unused-expressions
      expect(routerSpy.push.calledOnce)
        .to.be.true;
    });
  });

  /**
   * @todo Integrate tokens into this test so we can test
   */
  xdescribe('Authenticated', () => {
    let component;
    let routerSpy;
    defineLocalStorage();

    beforeEach(() => {
      defineLocalStorage();
      routerSpy = new RouterSpy();
      /*
      getUserToken('profile1@test.com', (token) => {
        if (token) {
          console.log(token);
          localStorage.setItem('piddleToken', token);
        } else {
          console.log('oh no!');
        }
        done();
      });
      */
      component = mount(
        <Profile router={routerSpy} />
      );
    });

    it('has a field for inputting the user\'s email', () => {
      expect(component.find(selectors.emailAddress))
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

    it('has a submit input for submitting form', () => {
      expect(component.find(selectors.submit))
        .to.have.length(1);
    });
  });
});
