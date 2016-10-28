const expect = require('chai').expect;
const db = require('../db');
const billController = require('../dbControllers/billController');
const userController = require('../dbControllers/userController');
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
const sampleUser = {
  emailAddress: 'sample@gmail.com',
  password: 'password1234',
  name: 'Elsabeth Theudobald',
};
let sampleUserId;
const createSampleUser = (done) => {
  userController.createUser(sampleUser)
    .then((userInstance) => {
      sampleUserId = userInstance.id;
      done();
    });
};

const emptyBills = (done) => {
  Promise.all([
    db.models.Bill.sync({ force: true }),
    db.models.Item.sync({ force: true }),
    db.models.User.sync({ force: true }),
  ])
  .then(() => {
    done();
  });
};

describe('retrieving bills', () => {
  beforeEach((done) => {
    emptyBills(done);
  });

  beforeEach((done) => {
    createSampleUser(done);
  });

  beforeEach((done) => {
    createSampleBill(done);
  });

  it('should retrieve a bill by shortId', (done) => {
    billController.retrieveBill(createdBillShortId)
      .then((billInstance) => {
        expect(billInstance.get('shortId')).to.equal(createdBillShortId);
        expect(billInstance.get('payerId')).to.match(/\d+/); // Payer ID has been set
        expect(billInstance.get('payer').get('emailAddress')).to.equal('sample@gmail.com');
        expect(billInstance.get('payer').get('password')).to.equal(undefined); // don't include password in response
        expect(billInstance.get('payer').get('name')).to.equal('Elsabeth Theudobald');
        expect(billInstance.get('description')).to.equal(bill.description);
        expect(billInstance.get('items').length).to.equal(bill.items.length);
        done();
      });
  });
});

describe('deleting bills', () => {
  beforeEach(done => emptyBills(done));
  beforeEach(done => createSampleUser(done));
  beforeEach(done => createSampleBill(done));

  it('should delete bills by shortId', (done) => {
    billController.retrieveBill(createdBillShortId)
      .then((billRecord) => {
        expect(billRecord).to.exist;
        billController.deleteBill(createdBillShortId)
          .then(() => {
            billController.retrieveBill(createdBillShortId)
              .then((deletedBillRecord) => {
                expect(deletedBillRecord).to.not.exist;
                done();
              });
          });
      });
  });
});
