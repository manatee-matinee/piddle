const expect = require('chai').expect;
const app = require('../server');
const db = require('../db');
const request = require('supertest');
const userController = require('../dbControllers/userController');
const billController = require('../dbControllers/billController');
const specHelpers = require('./specHelpers');
const config = require('../../config');
/* eslint-disable no-unused-expressions */

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
      { description: 'Dragon Roll', price: 10.99 },
      { description: 'Curry Rice', price: 6.50 },
      { description: 'Soda', price: 2.99 },
      { description: 'Cake', price: 4.00 },
      { description: 'Pie', price: 4.99 },
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

const sampleDebtor = {
  sampleData: {
    emailAddress: 'debtor@gmail.com',
    password: 'password456',
    name: 'Hambone',
  },
};

describe('API Interactions', () => {
  describe('Creating a bill', () => {
    // run createSampleBill to populate 'bill' with sample data, then
    // destroy the record
    before(done => specHelpers.createSampleUser(sampleUser, done));
    beforeEach(done => specHelpers.createSampleBill(sampleBill, done));
    before(done => specHelpers.setSampleUserToken(sampleUser, done));
    beforeEach((done) => {
      db.models.Bill.sync({ force: true });
      done();
    });

    it('should respond with a 201 code', (done) => {
      request(app)
        .post('/api/bill')
        .set('authorization', `JWT ${sampleUser.generatedData.token}`)
        .send(sampleBill.sampleData)
        .expect(201, done);
    });

    it('should respond with the bill shortId', (done) => {
      request(app)
        .post('/api/bill')
        .set('authorization', `JWT ${sampleUser.generatedData.token}`)
        .send(sampleBill.sampleData)
        .end((err, response) => {
          expect(err).to.not.exist;
          expect(response.body.data.shortId).to.be.a('String');
          expect(response.body.data.id).to.match(/\w+/);
          done();
        });
    });

    it('should respond with an error for malformed bills', (done) => {
      delete sampleBill.sampleData.payerEmailAddress;
      request(app)
        .post('/api/bill')
        .set('authorization', `JWT ${sampleUser.generatedData.token}`)
        .send(sampleBill.sampleData)
        .end((err, response) => {
          expect(response.body.error).to.be.an('Object');
          expect(response.status).to.equal(400);
          expect(response.body.error.message).to.be.a('String');
          sampleBill.sampleData.payerEmailAddress = 'sample@gmail.com';
          done();
        });
    });

    it('should not allow creation from users who do not send auth token', (done) => {
      request(app)
        .post('/api/bill')
        .send(sampleBill.sampleData)
        .end((err, response) => {
          expect(err).to.not.exist;
          expect(response.status).to.equal(401);
          done();
        });
    });
  });

  describe('Retrieving a bill', () => {
    sampleBill.sampleData.payerEmailAddress = 'sample@gmail.com'; // put back
    before(done => specHelpers.emptyRecords(done));
    before(done => specHelpers.createSampleUser(sampleUser, done));
    before(done => specHelpers.setSampleUserToken(sampleUser, done));
    before(done => specHelpers.createSampleBill(sampleBill, done));

    it('should retrieve bills', (done) => {
      request(app)
        .get(`/api/bill/${sampleBill.generatedData.shortId}`)
        .set('authorization', `JWT ${sampleUser.generatedData.token}`)
        .end((err, response) => {
          expect(err).to.not.exist;
          expect(response.status).to.equal(200);
          const billResponse = response.body.data;
          expect(billResponse).to.exist;
          expect(billResponse.description).to.equal(sampleBill.sampleData.description);
          expect(billResponse.items.length).to.equal(sampleBill.sampleData.items.length);
          done();
        });
    });

    it('should not retrieve bills unless the user sends auth token', (done) => {
      request(app)
      .get(`/api/bill/${sampleBill.generatedData.shortId}`)
      .end((err, response) => {
        expect(response.status).to.equal(401);
        done();
      });
    });

    it('should respond with an error if the bill does not exist', (done) => {
      request(app)
        .get('/api/bill/badId1')
        .set('authorization', `JWT ${sampleUser.generatedData.token}`)
        .end((err, response) => {
          expect(response.status).to.equal(400);
          expect(response.body.error).to.exist;
          expect(response.body.error.message).to.match(/not found/gi);
          done();
        });
    });
  });

  describe('Items', () => {
    describe('Updating items', () => {
      before(done => specHelpers.emptyRecords(done));
      before(done => specHelpers.createSampleUser(sampleUser, done));
      before(done => specHelpers.setSampleUserToken(sampleUser, done));
      before(done => specHelpers.createSampleUser(sampleDebtor, done));
      before(done => specHelpers.setSampleUserToken(sampleDebtor, done));
      before(done => specHelpers.createSampleBill(sampleBill, done));
      const itemIds = [];
      before((done) => {
        billController.retrieveBill(sampleBill.generatedData.shortId)
          .then((billInstance) => {
            billInstance.get('items').forEach((itemRecord) => {
              itemIds.push(itemRecord.get('id'));
            });
            done();
          });
      });

      it('should not be able to update items unless authenticated', (done) => {
        request(app)
          .put(`/api/item/${itemIds[0]}`)
          .send({
            price: 69.96,
          })
          .end((err, response) => {
            expect(err).to.not.exist;
            expect(response.status).to.equal(401);
            done();
          });
      });

      it('should be able to update all parameters as bill owner', (done) => {
        request(app)
          .put(`/api/item/${itemIds[0]}`)
          .set('authorization', `JWT ${sampleUser.generatedData.token}`) // sampleUser is bill owner
          .send({
            price: 69.96,
          })
          .end((err, response) => {
            expect(err).to.not.exist;
            expect(response.status).to.equal(200);
            expect(response.body.data.item.price).to.equal(69.96);
            done();
          });
      });

      it('should not be able to update all parameters as non-bill owner', (done) => {
        request(app)
          .put(`/api/item/${itemIds[0]}`)
          .set('authorization', `JWT ${sampleDebtor.generatedData.token}`)
          .send({
            price: 22.96,
          })
          .end((err, response) => {
            expect(err).to.not.exist;
            expect(response.status).to.equal(403);
            done();
          });
      });

      it('should be able to claim items as a non-bill owner', (done) => {
        request(app)
          .put(`/api/item/${itemIds[0]}`)
          .set('authorization', `JWT ${sampleDebtor.generatedData.token}`)
          .send({
            debtorId: sampleDebtor.generatedData.id,
          })
          .end((err, response) => {
            expect(err).to.not.exist;
            expect(response.status).to.equal(200);
            expect(response.body.data.item.debtorId).to.equal(sampleDebtor.generatedData.id);
            expect(response.body.data.item.debtor.name).to.equal(sampleDebtor.sampleData.name);
            done();
          });
      });

      it('should not be able to set the debtor as someone else as non-bill owner', (done) => {
        request(app)
          .put(`/api/item/${itemIds[1]}`)
          .set('authorization', `JWT ${sampleDebtor.generatedData.token}`)
          .send({
            debtorId: sampleDebtor.generatedData.id + 6, // not the debtor's id
          })
          .end((err, response) => {
            expect(err).to.not.exist;
            expect(response.status).to.equal(403);
            done();
          });
      });

      it('should be able to "unclaim" an item it is marked as the debtor on', (done) => {
        db.models.Item.findById(itemIds[2])
          .then(itemRecord => itemRecord.update({ debtorId: sampleDebtor.generatedData.id }))
          .then(() => {
            request(app)
              .put(`/api/item/${itemIds[2]}`)
              .set('authorization', `JWT ${sampleDebtor.generatedData.token}`)
              .send({
                debtorId: null,
              })
              .end((err, response) => {
                expect(err).to.not.exist;
                expect(response.status).to.equal(200);
                expect(response.body.data.item.debtorId).to.equal(null);
                done();
              });
          });
      });

      it('should not be able to claim an item that is already claimed by someone else', (done) => {
        db.models.Item.findById(itemIds[3])
          // item claimed by payer
          .then(itemRecord => itemRecord.update({ debtorId: sampleUser.generatedData.id }))
          .then(() => {
            request(app)
              .put(`/api/item/${itemIds[3]}`)
              .set('authorization', `JWT ${sampleDebtor.generatedData.token}`)
              .send({
                debtorId: sampleDebtor.generatedData.id,
              })
              .end((err, response) => {
                expect(err).to.not.exist;
                expect(response.status).to.equal(403);
                done();
              });
          });
      });

      it('should not be able to change an item marked paid, except to mark it unpaid', (done) => {
        db.models.Item.findById(itemIds[4])
          .then(itemRecord => itemRecord.update({
            debtorId: sampleDebtor.generatedData.id,
            paid: true,
          }))
          .then(() => {
            request(app)
              .put(`/api/item/${itemIds[4]}`)
              .set('authorization', `JWT ${sampleUser.generatedData.token}`)
              .send({
                description: 'New description',
              })
              .end((err, response) => {
                expect(err).to.not.exist;
                expect(response.status).to.equal(403);
                done();
              });
          });
      });
    });
  });

  describe('Updating users', () => {
    before(done => specHelpers.emptyRecords(done));
    before(done => specHelpers.createSampleUser(sampleUser, done));
    before(done => specHelpers.setSampleUserToken(sampleUser, done));

    it('should update a user', (done) => {
      request(app)
        .put(`/auth/user/${sampleUser.generatedData.id}`)
        .set('authorization', `JWT ${sampleUser.generatedData.token}`)
        .send({
          paypalId: 'newPPId',
        })
        .end((err, response) => {
          expect(err).to.not.exist;
          expect(response.status).to.equal(200);
          expect(response.body.data.token).to.exist;
          userController.findUserById(sampleUser.generatedData.id)
            .then((userInstance) => {
              expect(userInstance.get('paypalId')).to.equal('newPPId');
              done();
            });
        });
    });

    it('should not be able to update a different user than the authorized user',
      (done) => {
        request(app)
         .put(`/auth/user/${sampleUser.generatedData.id + 1}`) // not the logged in user
         .set('authorization', `JWT ${sampleUser.generatedData.token}`)
         .send({
           paypalId: 'newPPId',
         })
         .end((err, response) => {
           expect(err).to.not.exist;
           expect(response.status).to.equal(403);
           expect(response.error).to.exist;
           done();
         });
      });
  });
});

