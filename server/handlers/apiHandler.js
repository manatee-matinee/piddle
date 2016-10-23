const billController = require('../dbControllers/billController');

const saveBill = (request, response) => {
  const bill = request.body;
  billController.createBill(bill)
    .then(bill => {
      response.status(201);
      response.json({
        data: {
          shortId: bill.shortId,
        },
      });
    })
    .catch(error => {
      response.status(400);
      response.json({
        error: {
          message: error.message,
        },
      });
    });

};


module.exports = {
  saveBill,
};
