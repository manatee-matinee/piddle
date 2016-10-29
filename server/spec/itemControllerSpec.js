const expect = require('chai').expect;
const db = require('../db');
const billController = require('../dbControllers/billController');
const userController = require('../dbControllers/userController');
const itemController = require('../dbControllers/itemController');
const config = require('../../config');

if (/test/.test(config.db.path) === false) {
  throw new Error('NODE_ENV not set to \'test\'.');
}

// Create Sample Bill
let bill;
let createdBillShortId;
const createSampleBill = (done) => {
  bill = {
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
  billController.createBill(bill)
    .then((billInstance) => {
      createdBillShortId = billInstance.get('shortId');
      done();
    });
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
/* eslint-disable no-param-reassign */
const createSampleUser = (userData, done) => {
  userData.generatedData = {};
  userController.createUser(userData.sampleData)
    .then((userInstance) => {
      userData.generatedData.id = userInstance.id;
      done();
    });
};

const setSampleUserToken = (userData, done) => {
  request(app)
    .post('/auth/login')
    .send({
      emailAddress: userData.sampleData.emailAddress,
      password: userData.sampleData.password,
    })
    .end((err, response) => {
      userData.generatedData = response.body.data.token;
    });
};
/* eslint-enable no-param-reassign */

const emptyRecords = (done) => {
  Promise.all([
    db.models.Bill.sync({ force: true }),
    db.models.Item.sync({ force: true }),
    db.models.User.sync({ force: true }),
  ])
  .then(() => {
    done();
  });
};

describe('Item controller', () => {
  before(done => emptyRecords(done));
  before(done => createSampleUser(samplePayer, done));
  before(done => createSampleBill(done));
  before(done => createSampleUser(sampleDebtor, done));

  let itemId;
  before((done) => {
    billController.retrieveBill(createdBillShortId)
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
          billController.retrieveBill(createdBillShortId)
            .then((billRecord) => {
              expect(billRecord.get('items').length).to.equal(bill.items.length - 1);
              done();
            });
        });
    });
  });
});
