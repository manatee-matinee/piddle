const billController = require('../dbControllers/billController');

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
      response.json({
        error: {
          message: error.message,
        },
      });
    });
};

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
  .catch(err => response.status(400).json({
    error: {
      message: 'There was an error retrieving the bill.',
    },
  })
  );
};

module.exports = {
  saveBill,
  getBill,
};
