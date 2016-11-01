const userController = require('../dbControllers/userController');
const billController = require('../dbControllers/billController');
const request = require('supertest');
const app = require('../server');
const db = require('../db');

/**
 * Helper functions used with the server tests.
 * @module Server: Spec Helpers
 */

/* eslint-disable no-param-reassign */
/**
 * @param {Object} userData - An object holding information about the
 * sample user.
 * @param {Object} userData.sampleData - The sample data for the user.
 * @param {string} userData.sampleData.emailAddress - Email address for the sample user.
 * @param {string} userData.sampleData.password - Password for the sample user.
 * @param {string} [userData.sampleData.name] - Display name of the sample user.
 * @param {string} [userData.sampleData.squareId] - Square Cash id of the sample user.
 * @param {string} [userData.sampleData.paypalId] - PayPal.me id of the sample user.
 *
 * @description Generate a sample user from `userData`. `userData` will have a
 * `generatedData` object set on it with an `id` property of the
 * user assigned by the database.
 */
const createSampleUser = (userData, done) => {
  userData.generatedData = {};
  userController.createUser(userData.sampleData)
    .then((userInstance) => {
      userData.generatedData.id = userInstance.id;
      done();
    });
};

/**
 * @param {Object} userData - An object holding information about the
 * sample user.
 * @param {Object} userData.sampleData - The sample data for the user.
 * @param {string} userData.sampleData.emailAddress - Email address for the sample user.
 * @param {string} userData.sampleData.password - Password for the sample user.
 *
 * @description Set the user token for the sample user. `sampleUser.generatedData.token`
 * will be set to the token value.
 */
const setSampleUserToken = (userData, done) => {
  userData.generatedData = userData.generatedData || {};
  request(app)
    .post('/auth/login')
    .send({
      emailAddress: userData.sampleData.emailAddress,
      password: userData.sampleData.password,
    })
    .end((err, response) => {
      userData.generatedData.token = response.body.data.token;
      done();
    });
};

/**
 * @param {Object} billData - An object holding information about the
 * sample bill.
 * @param {Object} billData.sampleData - The sample data about the bill.
 *
 * @description Generate a sample bill. `billData` will have a `generatedData` object
 * set on it with an `id` and `shortId` property of the bill assigned by the database.
 */
const createSampleBill = (billData, done) => {
  billData.generatedData = {};
  billController.createBill(billData.sampleData)
    .then((billInstance) => {
      billData.generatedData.shortId = billInstance.get('shortId');
      billData.generatedData.id = billInstance.get('id');
      done();
    });
};

/**
 * @description Empties the test database of records.
 */
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

/* eslint-enable no-param-reassign */
module.exports = {
  createSampleUser,
  setSampleUserToken,
  createSampleBill,
  emptyRecords,
};
