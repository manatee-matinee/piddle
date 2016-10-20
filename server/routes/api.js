const express = require('express');
const router = express.Router();

router.get('/bill/:id', /* funct to handle bill*/);
router.post('/bill', /* funct to create bill */);

module.exports = router;
