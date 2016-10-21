const express = require('express');

const router = express.Router(); // eslint-disable-line

const handler = require('../handlers/apiHandler');

router.get('/bill/:id', /* funct to handle bill*/);
router.post('/bill', handler.saveBill);

module.exports = router;
