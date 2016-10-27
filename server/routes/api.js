const express = require('express');

const router = express.Router(); // eslint-disable-line

const handler = require('../handlers/apiHandler');

/**
 * @api {get} /api/bill/:id Retrieve a bill
 * @apiName GetBill
 * @apiGroup Bill
 *
 * @apiPermission user
 *
 * @apiParam {string} shortId The short id of the bill.
 *
 * @apiSuccess (200) {Object} data Data associated with the bill.
 * @apiSuccess (200) {string} data.shortId Short id associated with the bill.
 * @apiSuccess (200) {string} data.description Description of the bill.
 * @apiSuccess (200) {number} data.tax Tax in local currency.
 * @apiSuccess (200) {number} data.tip Tip in local currency.
 * @apiSuccess (200) {Object[]} data.items Items on the bill.
 * @apiSuccess (200) {number} data.items.id The id of the item.
 * @apiSuccess (200) {string} data.items.description Description of the item.
 * @apiSuccess (200) {number} data.items.price Price of the item in local currency.
 * @apiSuccess (200) {boolean} data.items.claimed True if a debtor has claimed the item.
 * @apiSuccess (200) {boolean} data.items.paid True if the item has been paid for (reserved for future use).
 * @apiSuccess (200) {Object} data.items.debtor Person responsible for paying for the item.
 * @apiSuccess (200) {string} data.items.debtor.emailAddress The email address of the debtor.
 * @apiSuccess (200) {string} data.items.debtor.displayName Name of the debtor to display.
 * @apiSuccess (200) {Object} data.payer The payer of the bill; presumably who created the bill in the app.
 * @apiSuccess (200) {string} data.payer.emailAddress Email address of the payer.
 * @apiSuccess (200) {string} data.payer.displayName Name of the payer to display.
 * @apiSuccess (200) {string} data.payer.squareId SquareCash www.cash.me 'cashtag' of the payer
 * @apiSuccess (200) {string} data.payer.paypalId PayPal paypal.me id of the payer.
 *
 * @apiSuccessExample Success-Response
 *    HTTP/1.1 200 OK
 *    {
 *      data: {
 *        shortId: "s5y26",
 *        description: "Tu Lan lunch",
 *        tax: 2.46,
 *        tip: 9.50,
 *        items: [
 *          {
 *            id: 45,
 *            description: "#27 Dragon Roll",
 *            price: 10.99,
 *            claimed: true,
 *            debtor: {
 *              emailAddress: "charding@gmail.com",
 *              displayName: "Carl Harding"
 *            }
 *          },
 *          {
 *            id: 89,
 *            description: '#8 Curry Rice',
 *            price: 6.50,
 *            claimed: false
 *          }
 *        ],
 *        payer: {
 *          emailAddress: "sample-payer@gmail.com",
 *          displayName: "Lindsie Tanya"
 *          squareId: "$LindsieT",
 *          paypalId: "LTanya"
 *        }
 *      }
 *    }
 */
router.get('/bill/:shortId' (request, response) => {
  response.send(500, "Not implemented");
});

/**
 * @api {post} /api/bill Create a bill
 * @apiName CreateBill
 * @apiGroup Bill
 *
 * @apiPermission user 
 *
 * @apiParam {string} [description] Description of the bill.
 * @apiParam {number} [tax] Tax in local currency associated with the bill.
 * @apiParam {number} [tip] Tip amount in local currency
 * @apiParam {Object[]} items Individual items on the bill.
 * @apiParam {string} items.description Description of the item.
 * @apiParam {string} items.price Price of the item in local currency.
 * @apiParam {string} payerEmailAddress Email address of the bill payer.
 *
 * @apiSuccess (201) {Object} data Data associated with the new bill.
 * @apiSuccess (201) {string} data.shortId The short id of the bill.
 *
 * @apiError {Object} error Error information associated with the bill.
 * @apiError {string} error.message Human-readable description of the error.
 *
 * @apiSuccessExample Success-Response
 *    HTTP/1.1 201 CREATED
 *    {
 *      data: {
 *        shortId: "s5y26"
 *      }
 *    }
 *
 */
router.post('/bill', handler.saveBill);

module.exports = router;
