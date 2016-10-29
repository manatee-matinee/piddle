const expect = require('chai').expect;
const billController = require('../dbControllers/billController');
const itemController = require('../dbControllers/itemController');
const specHelpers = require('./specHelpers');
const config = require('../../config');

if (/test/.test(config.db.path) === false) {
  throw new Error('NODE_ENV not set to \'test\'.');
}

const sampleBill = {};
sampleBill.sampleData = {
  description: 'Tu Lan lunch',
  tax: 2.46,
  tip: 9.50,
  payerEmailAddress: 'sample@gmail.com',
  items: [
    { description: '#27 Dragon Roll', price: 10.99 },
    { description: '#8 Curry Rice', price: 6.50 },
    { description: 'Soda', price: 2.99 },
  ],
};

// Create Sample User
const samplePayer = {};
samplePayer.sampleData = {
  emailAddress: 'sample@gmail.com',
  password: 'password1234',
  name: 'Elsabeth Theudobald',
};

const sampleDebtor = {};
sampleDebtor.sampleData = {
  emailAddress: 'debtorEmail@gmail.com',
  password: 'password5678',
  name: 'Randy Marsh',
};

describe('Item controller', () => {
  before(done => specHelpers.emptyRecords(done));
  before(done => specHelpers.createSampleUser(samplePayer, done));
  before(done => specHelpers.createSampleBill(sampleBill, done));
  before(done => specHelpers.createSampleUser(sampleDebtor, done));

  let itemId;
  before((done) => {
    billController.retrieveBill(sampleBill.generatedData.shortId)
      .then((billRecord) => {
        itemId = billRecord.items[0].id;
        done();
      });
  });

  it('should create items', (done) => {
    const items = [
      { description: 'Grandma\'s curry', price: 10.99 },
      { description: 'Dr. Pepper', price: 1.99 },
    ];
    const billId = 21;
    itemController.createItemsForBill(21, items)
    .then((itemsRecords) => {
      expect(itemsRecords.length).to.equal(2);
      expect(itemsRecords[0].dataValues.description).to.equal(items[0].description);
      expect(itemsRecords[1].dataValues.billId).to.equal(billId);
      done();
    })
    .catch(() => {
      done();
    });
  });

  it('should find an item by id', (done) => {
    itemController.findItemById(itemId)
      .then((itemRecord) => {
        expect(itemRecord.get('description')).to.equal('#27 Dragon Roll');
        done();
      });
  });

  describe('updating items', () => {
    it('should update an item', (done) => {
      itemController.updateItem(itemId, {
        description: 'Gut Bomb',
        price: 3.50,
      })
      .then((itemRecord) => {
        expect(itemRecord.get('description')).to.equal('Gut Bomb');
        expect(itemRecord.get('price')).to.equal(3.50);
        done();
      });
    });

    it('should not change the item id', (done) => {
      itemController.updateItem(itemId, {
        id: itemId + 1,
      })
      .then((itemRecord) => {
        expect(itemRecord.get('id')).to.equal(itemId);
        done();
      });
    });
  });

  describe('deleting items', () => {
    it('should delete an item', (done) => {
      itemController.deleteItem(itemId)
        .then(() => {
          billController.retrieveBill(sampleBill.generatedData.shortId)
            .then((billRecord) => {
              expect(billRecord.get('items').length).to.equal(sampleBill.sampleData.items.length - 1);
              done();
            });
        });
    });
  });
});
