const Item = require('../db').models.Item;

const createItemsForBill = (billId, items) => {
  if (!Array.isArray(items)) {
    return new Error('Items must be an array');
  }

  const itemsPromises = [];

  items.forEach(item => {
    itemsPromises.push(Item.create(Object.assign(item, {billId})));
  });
  return Promise.all(itemsPromises);

};

module.exports = {
  createItemsForBill,
};
