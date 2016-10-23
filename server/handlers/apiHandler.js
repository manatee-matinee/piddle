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

};


module.exports = {
  saveBill,
};
