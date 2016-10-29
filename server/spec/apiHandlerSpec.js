const expect = require('chai').expect;
const app = require('../server');
const db = require('../db');
const request = require('supertest');
const userController = require('../dbControllers/userController');
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

// Create Sample User
const sampleUser = {
  sampleData: {
    emailAddress: 'sample@gmail.com',
    password: 'password1234',
    name: 'Elsabeth Theudobald',
  },
};

describe('API Interactions', () => {
  describe('creating a bill', () => {
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

  describe('retrieving a bill', () => {
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

  describe('updating users', () => {
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

