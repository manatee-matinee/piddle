const BillDebtors = require('../db').models.BillDebtors;
const User = require('../db').models.User;
const userController = require('./userController');

/**
 * Add tagged users to the database.
 * @param {number} billId - Id of the bill that the users belong to.
 * @param {Object[]} debtors - An array of debtor objects.
 *
 * @return {Promise} Resolves to an instance of the debtor from the database.
 */
const createDebtorsForBill = (billId, debtors) => {
  if (!Array.isArray(debtors)) {
    return new Error('Debtors must be an array');
  }

  const debtorsPromises = [];

  debtors.forEach((debtor) => {
    console.log('debtor', debtor);
    debtorsPromises.push(BillDebtors.create( { debtor: debtor.debtor, billId: billId } ));
  });
  return Promise.all(debtorsPromises);
};

module.exports = {
  createDebtorsForBill
};