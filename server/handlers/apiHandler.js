const billController = require('../dbControllers/billController');
const itemController = require('../dbControllers/itemController');

/**
 * The logic functions to handle requests to API endpoints.
 * @module Server: API Handler
 */

/**
 * Save a bill. The logic for POST /api/bill.
 * @param {request} Request stream. See API documentation for parameters.
 * @param {response} Response stream. See API documentation for parameters.
 */
const saveBill = (request, response) => {
  const bill = request.body;
  billController.createBill(bill)
    .then((billRecord) => {
      response.status(201);
      response.json({
        data: {
          shortId: billRecord.shortId,
        },
      });
    })
    .catch((error) => {
      response.status(400);
      console.error(error);
      response.json({
        error: {
          message: error.message,
        },
      });
    });
};

/**
 * Retrieve a bill. The logic for GET /api/bill/:shortId.
 * @param {request} Request stream. See API documentation for parameters.
 * @param {response} Response stream. See API documentation for parameters.
 */
const getBill = (request, response) => {
  const shortId = request.params.shortId;
  billController.retrieveBill(shortId)
  .then((billInstance) => {
    if (!billInstance) {
      return response.status(400).json({
        error: {
          message: 'A bill with that short id was not found.',
        },
      });
    }
    return response.status(200).json({
      data: billInstance.dataValues,
    });
  })
  .catch(() => response.status(500).json({
    error: {
      message: 'There was an error retrieving the bill.',
    },
  })
  );
};

/**
 * Get all the bills for a given user. The logic for GET /api/bills.
 * @param {request} Request stream. See API documentation for parameters.
 * @param {response} Response stream. See API documentation for parameters.
 */
const getUserBills = (request, response) => {
  const payerId = request.user.id;
  billController.retrievePayerBills(payerId)
    .then((bills) => {
      const billsJSON = bills.map(bill => bill.toJSON());
      response.status(200).json({ data: billsJSON });
    })
    .catch((err) => response.status(500).json({
      error: {
        message: 'There was an error retrieving the user\'s bills' + err,
      },
    }));
};

/**
 * Update an item. The logic for PUT /api/item/:id.
 * @param {request} Request stream. See API documentation for parameters.
 * @param {response} Response stream. See API documentation for parameters.
 */
const updateItem = (request, response) => {
  const userId = request.user.get('id');
  const itemId = request.params.id;
  const updateParams = Object.assign({}, request.body);
  delete updateParams.id; // don't allow changing of item id
  itemController.findItemById(itemId)
    .then((itemInstance) => {
      if (!itemInstance) {
        return response.status(400).json({
          error: {
            message: `Item with id: ${itemId} does not exist`,
          },
        });
      }
      const billPayerId = itemInstance.get('bill').get('payerId');

      if (billPayerId !== userId) {
        // the person manipulating the bill is not the bill owner
        if (updateParams.description ||
            updateParams.price ||
            (updateParams.paid && !updateParams.debtorId)) {
          return response.status(403).json({
            error: {
              message: 'Users who are not the owner of the bill may not change item description or price',
            },
          });
        }
        if (updateParams.debtorId && (updateParams.debtorId !== userId)) {
          return response.status(403).json({
            error: {
              message: 'Users who are not the owner of the bill may only set themselves as the owner of the bill',
            },
          });
        }
        if (updateParams.debtorId === null && (itemInstance.get('debtorId') !== userId)) {
          return response.status(403).json({
            error: {
              message: 'Users who have not claimed the item may not set it as unclaimed',
            },
          });
        }
        if (itemInstance.get('debtorId') && updateParams.debtorId) {
          return response.status(403).json({
            error: {
              message: 'Users may not claim an item already claimed by someone else',
            },
          });
        }
      }
      if (itemInstance.get('paid')) {
        const paramKeys = Object.keys(updateParams);
        if (paramKeys.length > 1 || paramKeys[0] !== 'paid') {
          return response.status(403).json({
            error: {
              message: 'If an item has been marked paid the only change to it allowed is to mark it as unpaid.',
            },
          });
        }
      }

      itemInstance.update(updateParams)
        .then(() => {
          itemController.findItemByIdForUpdateReturn(itemInstance.get('id'))
            .then(returnItemInstance =>
              response.status(200).json({
                data: returnItemInstance.toJSON(),
              })
            );
        });
    });
};

module.exports = {
  saveBill,
  getBill,
  getUserBills,
  updateItem,
};
