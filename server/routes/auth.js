const express = require('express');

const authHandler = require('../handlers/authHandler');

const router = express.Router(); // eslint-disable-line new-cap

/**
 * @api {post} /auth/login Create a user session
 * @apiVersion 0.0.0
 * @apiName Login
 * @apiGroup Authentication
 *
 * @apiParam {string} emailAddress Email address of the user.
 * @apiParam {string} password Password of the user.
 *
 * @apiSuccess (201) {object} data Data associated with the response.
 * @apiSuccess (201) {object} data.token JWT representing the user. This token will need
 * to be stored and sent as the Authorization header on requests requiring authentication.
 *
 * @apiSuccessExample {json} Success-Response
 * HTTP/1.1 201 CREATED
 * {
 *   "data": {
 *     "message": "User session created"
 *   }
 * }
 *
 * Note: A user session will now be created and the session ID stored on the client
 * as a cookie. The server will not issue any redirects.
 *
 * @apiError (401) Unauthorized The <code>emailAddress</code> and <code>password</code> did
 * not match a registered user.
 */
router.post('/login', authHandler.loginHandler);

/**
 * @api {post} /auth/signup Create a new user and log them in
 * @apiVersion 0.0.0
 * @apiName Signup
 * @apiGroup Authentication
 *
 * @apiParam {string} emailAddress Email address of the user.
 * @apiParam {string} password Password of the user.
 * @apiParam {string} [name] Display name of the user.
 * @apiParam {string} [squareId] Square Cash www.cash.me "CashTag" of the user. Must
 * begin with a "$".
 * @apiParam {string} [paypalId] PayPal www.paypal.me ID of the user.
 *
 * @apiSuccess (201) {object} data Data associated with the response.
 * @apiSuccess (201) {object} data.token JWT representing the user. This token will need to be
 * stored and sent as the Authorization header on requests requiring authentication.
 *
 * @apiSuccessExample {json} Success-Response
 * HTTP/1.1 201 CREATED
 * {
 *   "data": {
 *     "token": "User successfully created and logged in"
 *   }
 * }
 *
 *
 * @apiError (400) Bad Request There was a problem creating the user or
 * creating the user session.
 */
router.post('/signup', authHandler.signupHandler);

/**
 * @api {get} /auth/logout Log out a user (destroy session cookie)
 * @apiVersion 0.0.0
 * @apiName Logout
 * @apiGroup Authentication
 *
 * @apiSuccess (200) {object} data Data associated with the response.
 * @apiSuccess (200) {string} data.message A human-readable message saying the user
 * has been logged out.
 *
 * @apiSuccessExample {json} Success-Response
 * HTTP/1.1 200 OK
 * {
 *   "data": {
 *     "message": "User logged out"
 *   }
 * }
 *
 * Note: The user session cookie will be destroyed but the server will
 * not issue any redirects.
 */
router.get('/logout', authHandler.logoutHandler);

module.exports = router;
