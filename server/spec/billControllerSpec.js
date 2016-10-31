const expect = require('chai').expect;
const billController = require('../dbControllers/billController');
const specHelpers = require('./specHelpers');
const config = require('../../config');

if (/test/.test(config.db.path) === false) {
  throw new Error('NODE_ENV not set to \'test\'.');
}

const sampleBill = {
  sampleData: {
    description: 'Tu Lan lunch',
    tax: 2.46,
    tip: 9.50,
    payerEmailAddress: 'sample@gmail.com',
    items: [
      { description: '#27 Dragon Roll', price: 10.99 },
      { description: '#8 Curry Rice', price: 6.50 },
      { description: 'Soda', price: 2.99 },
    ],
  },
};

const sampleBill2 = {
  sampleData: {
    description: 'Chipogo',
    tax: 1.99,
    tip: 1,
    payerEmailAddress: 'sample@gmail.com',
    items: [
      { description: 'Burrito', price: 7.99 },
      { description: 'Veggie Bowl', price: 6.50 },
      { description: 'Chips and Guac', price: 3.79 },
    ],
  },
};

const sampleUser = {
  sampleData: {
    emailAddress: 'sample@gmail.com',
    password: 'password1234',
    name: 'Elsabeth Theudobald',
  },
};


describe('Bill controller', () => {
  describe('Creating bills', () => {
    before(done => specHelpers.emptyRecords(done));
    before(done => specHelpers.createSampleUser(sampleUser, done));
    it('should create bills', (done) => {
      billController.createBill(sampleBill.sampleData)
        .then((billRecord) => {
          expect(billRecord.dataValues.description).to.equal(sampleBill.sampleData.description);
          expect(billRecord.dataValues.shortId).to.match(/\w{5,}/);
          done();
        })
        .catch(() => {
          done();
        });
    });
  });

  describe('Retrieving bills', () => {
    before(done => specHelpers.emptyRecords(done));
    before(done => specHelpers.createSampleUser(sampleUser, done));
    before(done => specHelpers.createSampleBill(sampleBill, done));
    before(done => specHelpers.createSampleBill(sampleBill2, done));

    it('should retrieve a bill by shortId', (done) => {
      billController.retrieveBill(sampleBill.generatedData.shortId)
        .then((billInstance) => {
          expect(billInstance.get('shortId')).to.equal(sampleBill.generatedData.shortId);
          expect(billInstance.get('payerId')).to.match(/\d+/); // Payer ID has been set
          expect(billInstance.get('payer').get('emailAddress')).to.equal(sampleUser.sampleData.emailAddress);
          expect(billInstance.get('payer').get('password')).to.equal(undefined); // don't include password in response
          expect(billInstance.get('payer').get('name')).to.equal(sampleUser.sampleData.name);
          expect(billInstance.get('description')).to.equal(sampleBill.sampleData.description);
          expect(billInstance.get('items').length).to.equal(sampleBill.sampleData.items.length);
          done();
        });
    });

    it('should retrieve all the bills a user is a payer of', (done) => {
      billController.retrievePayerBills(sampleUser.generatedData.id)
        .then((bills) => {
          expect(bills).to.be.an('Array');
          expect(bills.length).to.be.above(1);
          expect(bills[0].get().description).to.equal(sampleBill.sampleData.description);
          done();
        });
    });
  });

  describe('Deleting bills', () => {
    beforeEach(done => specHelpers.emptyRecords(done));
    beforeEach(done => specHelpers.createSampleUser(sampleUser, done));
    beforeEach(done => specHelpers.createSampleBill(sampleBill, done));

    it('should delete bills by shortId', (done) => {
      billController.retrieveBill(sampleBill.generatedData.shortId)
        .then((billRecord) => {
          expect(billRecord).to.exist;
          billController.deleteBill(sampleBill.generatedData.shortId)
            .then(() => {
              billController.retrieveBill(sampleBill.generatedData.shortId)
                .then((deletedBillRecord) => {
                  expect(deletedBillRecord).to.not.exist;
                  done();
                });
            });
        });
    });
  });

  describe('Updating bills', () => {
    beforeEach(done => specHelpers.emptyRecords(done));
    beforeEach(done => specHelpers.createSampleUser(sampleUser, done));
    beforeEach(done => specHelpers.createSampleBill(sampleBill, done));

    it('should update bills', (done) => {
      billController.updateBill(sampleBill.generatedData.shortId,
        {
          description: 'New Dheli Specials',
        })
      .then((billRecord) => {
        expect(billRecord.get('description')).to.equal('New Dheli Specials');
        done();
      });
    });

    it('should not change the bill id', (done) => {
      billController.updateBill(sampleBill.generatedData.shortId,
        {
          id: 98,
        })
      .then((billRecord) => {
        expect(billRecord.get('id')).to.not.equal(98);
        done();
      });
    });
  });
});
