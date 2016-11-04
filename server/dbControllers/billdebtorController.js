const BillDebtors = require('../db').models.BillDebtors;
const userController = require('./userController');

/**
 * Add tagged users to the database.
 * @param {number} billId - Id of the bill that the users belong to.
 * @param {Object[]} users - An array of user objects.
 *
 * @return {Promise} Resolves to an instance of the debtor from the database.
 */
const createDebtorsForBill = (billId, debtors) => {
  if (!Array.isArray(debtors)) {
    return new Error('Debtors must be an array');
  }

  const debtorsPromises = [];

  const p = debtors.forEach((debtor) => 
    new Promise((resolve, reject) => {
      userController.findUserByEmailAddress(debtor.debtor)
      .then((user) => {
        debtorsPromises.push(BillDebtors.create(Object.assign(user.dataValues.id, { billId })));
        resolve();
      })
      .catch((err) => {
        reject(err);
      });
      })
    );

  Promise.all(p).then(() => { debtorsPromises });
};

module.exports = {
  createDebtorsForBill
};