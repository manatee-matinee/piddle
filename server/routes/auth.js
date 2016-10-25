const express = require('express');

const authHandler = require('../handlers/apiHandler');

const router = express.Router(); // eslint-disable-line new-cap

router.post('/login', authHandler.loginHandler);

router.post('/signup', authHandler.signupHandler);

router.get('/logout', authHandler.logoutHandler);

module.exports = router;
