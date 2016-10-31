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

const retrieveBillWithPaidItems = function retrieveBillWithPaidItems(shortId) {
  return Bill.findOne({
    where: {
      shortId,
    },
    include: {
      model: Item,
      where: {
        paid: true,
      },
      required: false, // left outer join
    },
  });
};

/**
 * Update a bill.
 * @param {string} shortId - Short id of the item to be updated.
 * @param {Object} params - Key-value pairs of the parameters to update.
 * @param {String} [params.description] - Description of the bill.
 * @param {number} [params.tax] - Tax on the bill in local currency.
 * @param {number} [params.tip] - Tip on the bill in local currency.
 * @return {Promise} Resolves to the instance of the Bill from the database.
 */
const updateBill = function updateBill(shortId, params) {
  return Bill.findOne({ where: { shortId } })
    .then(billRecord => billRecord.update(params));
};

const deleteBill = function deleteBill(shortId) {
  return Bill.findOne({ where: { shortId } })
    .then(billInstance => billInstance.destroy());
};

module.exports = {
  createBill,
  retrieveBill,
  retrievePayerBills,
  retrieveBillWithPaidItems,
  updateBill,
  deleteBill,
};
