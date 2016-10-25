/**
 * @module authHandler
 */

const userController = require('../dbControllers/userController');
const passport = require('../passportConfig');
/**
 * Ensures the user trying to access the endpoint is authenticated.
 * Place as middleware function on routes you wish to protect.
 */
const ensureAuthenticated = (request, response, next) => {
  if (request.isAuthenticated()) {
    return next();
  }
  return response.status(401).json({
    error: {
      message: 'This endpoint requires authentication',
    },
  });
};

const loginHandler = passport.authenticate('local', (request, response) => {
  response.status(201).json({ message: 'User session created.' });
});


const signupHandler = (request, response) => {
  userController.findUserByEmailAddress(request.body.emailAddress)
    .then((userInstance) => {
      if (userInstance) {
        return response.status(400).json({
          error: {
            message: 'User already exists.',
          },
        });
      }
      // user does not exist
      return userController.createUser(request.body)
        .then(user =>
          request.login(user, (error) => {
            if (!error) {
              return response.status(201).json({
                data: {
                  message: 'User successfully created and logged in',
                },
              });
            }
            return response.status(400).json({
              error: {
                message: 'There was a problem logging in the user after creation',
              },
            });
          })
        )
        .catch(() =>
          response.status(400).json({
            error: {
              message: 'There was a problem creating the user',
            },
          })
        );
    });
};

const logoutHandler = (request, response) => {
  request.logout();
  return response.status(200).json({
    data: {
      message: 'User logged out',
    },
  });
};

module.exports = {
  ensureAuthenticated,
  loginHandler,
  signupHandler,
  logoutHandler,
};
