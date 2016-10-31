import React from 'react';
import ReactDOM from 'react-dom';
import { expect } from 'chai';
import { mount } from 'enzyme';
import Login from './index';
import { defineLocalStorage, RouterSpy } from '../../utils/testHelpers';

const selectors = {
  emailAddress: 'input[name="emailAddress"]',
  password: 'input[name="password"]',
  submit: 'input[type="submit"]',
};

describe('Login Form', () => {
  defineLocalStorage();

  describe('Not Authenticated', () => {
    let component;
    let routerSpy;

    beforeEach(() => {
      routerSpy = new RouterSpy();
      component = mount(
        <Login router={routerSpy} />
      );
    });

    it('renders without crashing', () => {
      ReactDOM.render(
        <Login router={new RouterSpy()} />,
        // eslint-disable-next-line no-undef
        document.createElement('div'),
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

    it('has a submit input for submitting Login form', () => {
      expect(component.find(selectors.submit))
        .to.have.length(1);
    });
  });

  /**
   * @todo Integrate tokens into this test so we can test
   */
  xdescribe('Authenticated', () => {
    let routerSpy;

    beforeEach(() => {
      routerSpy = new RouterSpy();
    });

    it('renders without crashing', () => {
      ReactDOM.render(
        <Login />,
        // eslint-disable-next-line no-undef
        document.createElement('div'),
      );
    });

    it('has a submit input for submitting Login form', () => {
      // eslint-disable-next-line no-unused-expressions
      expect(routerSpy.push.calledOnce)
        .to.be.true;
    });
  });
});
