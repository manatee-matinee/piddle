const Bill = require('../db').models.Bill;
const Item = require('../db').models.Item;
const User = require('../db').models.User;
const userController = require('./userController');
const itemController = require('./itemController');

const createBill = function createBill(bill) {
  return new Promise((resolve, reject) => {
    if (!bill.payerEmailAddress) {
      return reject(new Error('Bill payer email address required'));
    }
    if (!bill.items || bill.items.length === 0) {
      return reject(new Error('At least one bill item is required'));
    }
    return userController.findUserByEmailAddress(bill.payerEmailAddress)
      .then((payerRecord) => {
        const billWithPayerId = Object.assign({}, bill, { payerId: payerRecord.id });
        return Bill.create(billWithPayerId)
        .then((billRecord) => {
          // have bill, now create the items
          itemController.createItemsForBill(billRecord.dataValues.id, bill.items)
          .then(() => {
            resolve(billRecord);
          })
          .catch((err) => {
            reject(err);
          });
        })
        .catch((err) => {
          reject(err);
        });
      });
  });
};

const retrieveBill = function retrieveBill(shortId) {
  return Bill.findOne({
    where: {
      shortId,
    },
    attributes: {
      exclude: ['id'],
    },
    include: [
      {
        model: Item,
        include: [{
          model: User,
          as: 'debtor',
          attributes: {
            exclude: ['password'],
          },
        }],
      },
      {
        model: User,
        as: 'payer',
        attributes: {
          exclude: ['password'],
        },
      },
    ],
  });
};

const retrievePayerBills = function retrievePayerBills(payerId) {
  return Bill.findAll({
    where: {
      payerId,
    },
    include: [
      {
        model: Item,
        include: [{
          model: User,
          as: 'debtor',
          attributes: {
            exclude: ['password'],
          },
        }],
      }],
  });
};


const deleteBill = function deleteBill(shortId) {
  return Bill.findOne({ where: { shortId } })
    .then(billInstance => billInstance.destroy());
};

module.exports = {
  createBill,
  retrieveBill,
  retrievePayerBills,
  deleteBill,
};
