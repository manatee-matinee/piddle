const expect = require('chai').expect;

const db = require('../db');

const billController = require('../dbControllers/billController');

const itemController = require('../dbControllers/itemController');

const config = require('../../config');

if (/test/.test(config.db.path) === false) {
  throw new Error('NODE_ENV not set to \'test\'.');
}

describe('Item controller', () => {
  before(done => {
    Promise.all([
      db.models.Item.sync()
    ])
    .then(() => {
      done();
    });
  });

  it('should create items', done => {
    const items = [
      {description: 'Grandma\'s curry', price: 10.99},
      {description: 'Dr. Pepper', price: 1.99}
    ];
    const billId = 21;
    itemController.createItemsForBill(21, items)
    .then(itemsRecords => {
      expect(itemsRecords.length).to.equal(2);
      expect(itemsRecords[0].dataValues.description).to.equal(items[0].description);
      expect(itemsRecords[1].dataValues.billId).to.equal(billId);
      done();
    })
    .catch(err => {
      done();
    });
  });
});

describe('Bill controller', () => {
  before(done => {
    Promise.all([
      db.models.Item.sync(),
      db.models.Bill.sync(),
    ])
    .then(() => {
      done();
    });
  });

  it('should create bills', done => {
    const bill = {
      description: 'Tu Lan lunch',
      tax: 2.46,
      tip: 9.50,
      payer: '345326',
      items: [
        { description: '#27 Dragon Roll', price: 10.99 },
        { description: '#8 Curry Rice', price: 6.50 },
        { description: 'Soda', price: 2.99 },
      ],
    };
    billController.createBill(bill)
      .then(billRecord => {
        expect(billRecord.dataValues.description).to.equal(bill.description);
        expect(billRecord.dataValues.shortId).to.match(/\w{5,}/);
        done();
      })
      .catch(err => {
        done();
      });
  });

});
