const Bill = require('../db').models.Bill;

const itemController = require('./itemController');

const createBill = bill => {

  return new Promise((resolve, reject) => {
    if (!bill.payer) {
      return reject(new Error('Bill payer id required'));
    }
    if (!bill.items || bill.items.length === 0) {
      return reject(new Error('At least one bill item is required'));
    }
    // Need to find user and validate
    Bill.create(bill)
    .then(billRecord => {
      // have bill, now create the items
      itemController.createItemsForBill(billRecord.dataValues.id, bill.items)
      .then(items => {
        resolve(billRecord);
      })
      .catch(err => {
        reject(err);
      });
    })
    .catch(err => {
      reject(err);
    });
  });
};

module.exports = {
  createBill,
};
