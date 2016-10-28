import React from 'react';
import ReactDOM from 'react-dom';
import { expect } from 'chai';
import { mount } from 'enzyme';
import Bill from './index';
import BillItemList from './../BillItemList';
import DescriptionField from './../DescriptionField';
import TaxField from './../TaxField';
import TipField from './../TipField';

const renderedComponent = mount(
  <Bill
    params={{ id: undefined }}
  />
);

describe('new', () => {
  const mountedBill = renderedComponent;

  describe('authenticated', () => {
    it('renders without crashing', () => {
      ReactDOM.render(
        <Bill params={{ id: undefined }} />,
        // eslint-disable-next-line no-undef
        document.createElement('div'),
      );
    });

    it('has a field for inputting the bill\'s tax', () => {
      expect(mountedBill.find(TaxField)).to.have.length(1);
    });

    it('has a field for inputting the bill\'s description', () => {
      expect(mountedBill.find(DescriptionField)).to.have.length(1);
    });

    it('has a field for inputting the bill\'s tip', () => {
      expect(mountedBill.find(TipField)).to.have.length(1);
    });

    it('has a list of bill items', () => {
      expect(mountedBill.find(BillItemList)).to.have.length(1);
    });
  });

  describe('unauthenticated', () => {
  });
});
