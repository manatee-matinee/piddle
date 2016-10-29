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

const sampleUser = {
  sampleData: {
    emailAddress: 'sample@gmail.com',
    password: 'password1234',
    name: 'Elsabeth Theudobald',
  },
};


describe('Bill controller', () => {
  describe('creating bills', () => {
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

  describe('retrieving bills', () => {
    beforeEach(done => specHelpers.emptyRecords(done));
    beforeEach(done => specHelpers.createSampleUser(sampleUser, done));
    beforeEach(done => specHelpers.createSampleBill(sampleBill, done));

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
  });

  describe('deleting bills', () => {
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
});
