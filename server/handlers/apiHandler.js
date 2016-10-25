<<<<<<< 8e6934b877d3e96ebd4d4d8b680b87e5bc1d8f68
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
=======
const saveBill = (request, response) => {

>>>>>>> (feat) Rough out server structure

};


module.exports = {
  saveBill,
};
