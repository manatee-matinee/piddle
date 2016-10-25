const express = require('express');

const router = express.Router(); // eslint-disable-line

const handler = require('../handlers/apiHandler');

router.get('/bill/:id', (request, response) => {
  response.send(500, 'Not implemented');
});

router.post('/bill', handler.saveBill);

module.exports = router;
