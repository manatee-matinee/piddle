const express = require('express');

const router = express.Router(); // eslint-disable-line

const handler = require('../handlers/apiHandler');

/**
 * @api {get} /api/bill/:id Retrieve a bill
 * @apiName GetBill
 * @apiGroup Bill
 *
 * @apiParam {string} shortId The short id of the bill.
 *
 * @apiSuccess {Object} data Data associated with the bill.
 * @apiSuccess {string} data.shortId Short id associated with the bill.
 * @apiSuccess {string} data.description Description of the bill.
 * @apiSuccess {number} data.tax Tax in local currency.
 * @apiSuccess {number} data.tip Tip in local currency.
 * @apiSuccess {Object[]} data.items Items on the bill.
 * @apiSuccess {number} data.items[].id The id of the item.
 * @apiSuccess {string} data.items[].description Description of the item.
 * @apiSuccess {number} data.items[].price Price of the item in local currency.
 * @apiSuccess {boolean} data.items[].claimed True if a debtor has claimed the item.
 * @apiSuccess {boolean} data.items[].paid True if the item has been paid for (reserved for future use).
 * @apiSuccess {Object} data.items[].debtor Person responsible for paying for the item.
 * @apiSuccess {string} data.items[].debtor.emailAddress The email address of the debtor.
 * @apiSuccess {string} data.items[].debtor.displayName Name of the debtor to display.
 * @apiSuccess {Object} data.payer The payer of the bill; presumably who created the bill in the app.
 * @apiSuccess {string} data.payer.emailAddress Email address of the payer.
 * @apiSuccess {string} data.payer.displayName Name of the payer to display.
 * @apiSuccess {string} data.payer.squareId SquareCash www.cash.me 'cashtag' of the payer
 * @apiSuccess {string} data.payer.paypalId PayPal paypal.me id of the payer.
 */
router.get('/bill/:shortId', (request, response) => {
  response.send(500, 'Not implemented');
});

/**
 * @api {post} /api/bill Create a bill
 * @apiName CreateBill
 * @apiGroup Bill
 *
 * @apiParam {string} description Description of the bill.
 * @apiParam {number} [tax] Tax in local currency associated with the bill.
 * @apiParam {number} [tip] Tip amount in local currency
 * @apiParam {Object[]} items Individual items on the bill.
 * @apiParam {string} items[].description Description of the item.
 * @apiParam {string} items[].price Price of the item in local currency.
 * @apiParam {string} payerEmailAddress Email address of the bill payer.
 *
 * @apiSuccess {Object} data Data associated with the new bill.
 * @apiSuccess {string} data.shortId The short id of the bill.
 *
 * @apiError {Object} error Error information associated with the bill.
 * @apiError {string} error.message Human-readable description of the error.
 *
 * @apiSuccessExample Success-Response
 *    HTTP/1.1 201 CREATED
 *    {
 *      data: {
 *        shortId: s5y26
 *      }
 *    }
 *
 */
router.post('/bill', handler.saveBill);

module.exports = router;
