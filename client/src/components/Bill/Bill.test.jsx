import React from 'react';
import ReactDOM from 'react-dom';
import { expect } from 'chai';
import { mount } from 'enzyme';
import Bill from './index';
import BillItemList from './../BillItemList';
import DescriptionField from './../DescriptionField';
import TaxField from './../TaxField';
import TipField from './../TipField';
import { defineLocalStorage, RouterSpy } from '../../utils/testHelpers';

const props = {
  new: {
    params: {
      id: undefined,
    },
  },
  edit: {
    params: {
      id: 'asdf',
    },
  },
  claim: {
    params: {
      id: 'asdf',
    },
  },
};

describe('new', () => {
  defineLocalStorage();
  let component;
  let routerSpy;

  beforeEach(() => {
    routerSpy = new RouterSpy();
    component = mount(
      <Bill
        {...props.new}
        router={routerSpy}
      />
    );
  });

  it('renders without crashing', () => {
    ReactDOM.render(
      <Bill
        {...props.new}
        router={routerSpy}
      />,
      // eslint-disable-next-line no-undef
      document.createElement('div'),
    );
  });

  describe('Not Authenticated', () => {
    it('should not have input fields', () => {
      expect(component.find('input'))
        .to.have.length(0);
    });
  });

  xdescribe('Authenticated', () => {
    it('has a field for inputting the bill\'s tax', () => {
      expect(component.find(TaxField))
        .to.have.length(1);
    });

    it('has a field for inputting the bill\'s description', () => {
      expect(component.find(DescriptionField))
        .to.have.length(1);
    });

    it('has a field for inputting the bill\'s tip', () => {
      expect(component.find(TipField))
        .to.have.length(1);
    });

    it('has a list of bill items', () => {
      expect(component.find(BillItemList))
        .to.have.length(1);
    });
  });
});
