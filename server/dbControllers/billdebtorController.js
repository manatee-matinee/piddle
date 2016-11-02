const BillDebtors = require('../db').models.BillDebtors;
const User = require('../db').models.User;

/**
 * Add tagged users to the database.
 * @param {number} billId - Id of the bill that the users belong to.
 * @param {Object[]} users - An array of user objects.
 *
 * @return {Promise} Resolves to an instance of the tagged user from the database.
 */
const createDebtorsForBill = (billId, debtors) => {
  if (!Array.isArray(debtors)) {
    return new Error('Debtors must be an array');
  }

  const debtorsPromises = [];

  debtors.forEach((debtor) => {
    User.findUserByEmailAddress(debtor)
    .then((user) => {
      debtorsPromises.push(BillDebtors.create(Object.assign(user.id, { billId })));
    });
  });
  return Promise.all(debtorsPromises);
};

module.exports = {
  createDebtorsForBill
};