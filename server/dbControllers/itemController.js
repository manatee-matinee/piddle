const Item = require('../db').models.Item;
const Bill = require('../db').models.Bill;
const User = require('../db').models.User;

/**
 * Handles interactions with the database to manage Items.
 * @module Server: Item Controller
 */

/**
 * Find an item by the item's id.
 * @param {number} id - Id of the item.
 *
 * @return {Promise} Resolves to an instance of the Item from the database.
 */
const findItemById = id => Item.findOne({
  where: { id },
  include: [Bill],
});

/**
 * Find an item by the item's id, but also include additional information
 * about the debtor for easy use on the front end.
 * @param {number} id - Id of the item.
 *
 * @return {Promise} Resolves to an instance of the Item from the database.
 */
const findItemByIdForUpdateReturn = id => Item.findOne({
  where: { id },
  include: {
    model: User,
    as: 'debtor',
    attributes: {
      exclude: ['password'],
    },
  },
  plain: true,
});

/**
 * Add items to the database.
 * @param {number} billId - Id of the bill the items belong to.
 * @param {Object[]} items - An array of item objects.
 * @param {string} items[].description - Description of the item.
 * @param {number} items[].price - Price of the item.
 *
 * @return {Promise} Resolves to an instance of the Item from the database.
 */
const createItemsForBill = (billId, items) => {
  if (!Array.isArray(items)) {
    return new Error('Items must be an array');
  }

  const itemsPromises = [];

  items.forEach((item) => {
    itemsPromises.push(Item.create(Object.assign(item, { billId })));
  });
  return Promise.all(itemsPromises);
};

/**
 * Update an item.
 * @param {number} id - Id of the item to be updated.
 * @param {Object} params - Key-value pairs of the parameters to update.
 * @param {String} [params.description] - Description of the item.
 * @param {number} [params.price] - Price of the item in local currency.
 * @param {number} [params.debtorId] - Id of the person responsible for paying the item.
 * @param {boolean} [params.paid] - Whether the item has been paid for or not.
 *
 * @return {Promise} Resolves to the instance of the Item from the database.
 */
const updateItem = (id, params) => {
  const updateParams = Object.assign({}, params);
  delete updateParams.id; // don't allow id to update
  return findItemById(id)
    .then(itemRecord => itemRecord.update(updateParams));
};

/**
 * Delete an item.
 * @param {number} id - Id of the item to be deleted.
 *
 * @return {Promise} Resolves to undefined.
 */
const deleteItem = id =>
  findItemById(id)
    .then(itemInstance => itemInstance.destroy());

module.exports = {
  findItemById,
  findItemByIdForUpdateReturn,
  createItemsForBill,
  updateItem,
  deleteItem,
};
