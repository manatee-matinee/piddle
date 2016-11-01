import React from 'react';
import ReactDOM from 'react-dom';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import sinon from 'sinon';
import BillItemList from './index';
import BillItem from './../BillItem';

const changeBillItem = sinon.spy();
const claimBillItem = sinon.spy();
const deleteBillItem = sinon.spy();
const newBillItem = sinon.spy();

const props = {
  shallow: {
    changeBillItem,
    claimBillItem,
    deleteBillItem,
    newBillItem,
    items: [
      { description: 'a', price: 1 },
      { description: 'b', price: 2 },
      { description: 'c', price: 3 },
    ],
  },
};

const renderedComponent = {
  shallow: {
    new: shallow(
      <BillItemList
        {...props.shallow}
        interactionType={Symbol.for('new')}
      />
    ),
    edit: shallow(
      <BillItemList
        {...props.shallow}
        interactionType={Symbol.for('edit')}
      />
    ),
    claim: shallow(
      <BillItemList
        {...props.shallow}
        interactionType={Symbol.for('claim')}
      />
    ),
  },
};

describe('new', () => {
  const component = renderedComponent.shallow.new;

  it('renders without crashing', () => {
    ReactDOM.render(
      <BillItemList
        {...props.shallow}
        interactionType={Symbol.for('new')}
      />,
      // eslint-disable-next-line no-undef
      document.createElement('div'),
    );
  });

  it('has a button for adding additional bill items', () => {
    expect(component.find('button'))
      .to.have.length(1);
  });

  it('has a bill item for each provided bill item', () => {
    expect(component.find(BillItem))
      .to.have.length(props.shallow.items.length);
  });
});

describe('edit', () => {
  const component = renderedComponent.shallow.edit;

  it('renders without crashing', () => {
    ReactDOM.render(
      <BillItemList
        {...props.shallow}
        interactionType={Symbol.for('new')}
      />,
      // eslint-disable-next-line no-undef
      document.createElement('div'),
    );
  });

  it('has a button for adding additional bill items', () => {
    expect(component.find('button'))
      .to.have.length(1);
  });

  it('has a bill item for each provided bill item', () => {
    expect(component.find(BillItem))
      .to.have.length(props.shallow.items.length);
  });
});

describe('claim', () => {
  const component = renderedComponent.shallow.claim;

  it('renders without crashing', () => {
    ReactDOM.render(
      <BillItemList
        {...props.shallow}
        interactionType={Symbol.for('new')}
      />,
      // eslint-disable-next-line no-undef
      document.createElement('div'),
    );
  });

  it('should not have input fields', () => {
    expect(component.find('input'))
      .to.have.length(0);
  });

  it('should not have a button for adding additional bill items', () => {
    expect(component.find('button'))
      .to.have.length(0);
  });
});

