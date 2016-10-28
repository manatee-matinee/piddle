const expect = require('chai').expect;
const app = require('../server');
const db = require('../db');
const request = require('supertest');
const userController = require('../dbControllers/userController');
const billController = require('../dbControllers/billController');
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

// Log in sample user
  // use the userAgent to make authenticated request
const userAgent = request.agent(app);
const logInSampleUser = (done) => {
  userAgent
    .post('/auth/login')
    .send({
      emailAddress: sampleUser.emailAddress,
      password: sampleUser.password,
    })
    .end(() => done());
};

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

describe('Creating a bill', () => {
  // run createSampleBill to populate 'bill' with sample data, then
  // destroy the record
  before('Create user to own bill', done => createSampleUser(done));
  beforeEach(done => createSampleBill(done));
  before('Log in sample user', done => logInSampleUser(done));
  beforeEach((done) => {
    db.models.Bill.sync({ force: true });
    done();
  });

  it('should respond with a 201 code', (done) => {
    userAgent
      .post('/api/bill')
      .send(bill)
      .expect(201, done);
  });

  it('should respond with the bill shortId', (done) => {
    userAgent
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
    delete bill.payerEmailAddress;
    userAgent
      .post('/api/bill')
      .send(bill)
      .end((err, response) => {
        expect(response.body.error).to.be.an('Object');
        expect(response.status).to.equal(400);
        expect(response.body.error.message).to.be.a('String');
        done();
      });
  });

  it('should not allow creation from users who are not logged in', (done) => {
    request(app)
      .post('/api/bill')
      .send(bill)
      .end((err, response) => {
        expect(err).to.not.exist;
        expect(response.status).to.equal(401);
        done();
      });
  });
});

describe('Retrieving a bill', () => {
  before(done => emptyRecords(done));
  before(done => createSampleUser(done));
  before('log user in', (done) => {
    logInSampleUser(done);
  });
  before(done => createSampleBill(done));
  after((done) => {
    billController.deleteBill(createdBillShortId).then(() => {
      userController.deleteUser('sample@gmail.com').then(() => done());
    });
  });

  it('should retrieve bills', (done) => {
    userAgent
      .get(`/api/bill/${createdBillShortId}`)
      .end((err, response) => {
        expect(err).to.not.exist;
        expect(response.status).to.equal(200);
        const billResponse = response.body.data;
        expect(billResponse).to.exist;
        expect(billResponse.description).to.equal(bill.description);
        expect(billResponse.items.length).to.equal(bill.items.length);
        done();
      });
  });

  it('should not retrieve bills unless the user is logged in', (done) => {
    request(app)
    .get(`/api/bill/${createdBillShortId}`)
    .end((err, response) => {
      expect(response.status).to.equal(401);
      done();
    });
  });

  it('should respond with an error if the bill does not exist', (done) => {
    userAgent
      .get('/api/bill/badId1')
      .end((err, response) => {
        expect(response.status).to.equal(400);
        expect(response.body.error).to.exist;
        expect(response.body.error.message).to.match(/not found/gi);
        done();
      });
  });
});
