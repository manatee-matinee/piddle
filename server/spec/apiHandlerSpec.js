const expect = require('chai').expect;

const app = require('../server');

const request = require('supertest');

const config = require('../../config');

if (/test/.test(config.db.path) === false) {
  throw new Error('NODE_ENV not set to \'test\'.');
}


describe('Creating a bill', () => {
  let bill;

  beforeEach(() => {
    bill = {
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
  });

  it('should respond with a 201 code', (done) => {
    request(app)
      .post('/api/bill')
      .send(bill)
      .expect(201, done);
  });

  it('should respond with the bill shortId', (done) => {
    request(app)
      .post('/api/bill')
      .send(bill)
      .end((err, response) => {
        expect(err).to.not.exist;
        expect(response.body.data.shortId).to.be.a('String');
        expect(response.body.data.id).to.match(/\w+/);
        done();
      });
  });

  it('should respond with an error for malformed bills', (done) => {
    delete bill.payer;
    request(app)
      .post('/api/bill')
      .send(bill)
      .expect(400)
      .end((err, response) => {
        expect(response.body.error).to.be.an('Object');
        expect(response.body.error.message).to.be.a('String');
        done();
      });
  });
});
