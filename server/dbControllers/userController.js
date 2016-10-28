/**
 * @module User
 */
const User = require('../db').models.User;

/**
 * Find a user by email address.
 * @param {String} emailAddress - The email address of the user.
 * @return {Promise} Resolves to the instance of the User from the database.
 */
const findUserByEmailAddress = emailAddress => User.findOne({
  where: { emailAddress },
});

/**
 * Update a user.
 * @param {String} emailAddress - The email address of the user.
 * @param {Object} params - The parameters to update.
 * @param {String} [params.name] - The display name of the user.
 * @param {String} [params.squareId] - The Square Cash 'cash.me' cashtag (must begin with $).
 * @param {String} [params.paypalId] - The Paypal 'paypal.me' ID of the user.
 * @return {Promise} Resolves to the instance of the User from the database.
 */
const updateUser = (emailAddress, params) =>
  findUserByEmailAddress(emailAddress)
    .then(userRecord =>
      userRecord.update(params));

/**
 * Confirm a user's password.
 * @param {String} emailAddress - The user's email address.
 * @param {String} password - The password attempt.
 * @returns {Promise} Resolves true if the attempt is a match and false otherwise.
 */
const verifyUser = (emailAddress, password) =>
  findUserByEmailAddress(emailAddress)
    .then(userInstance =>
      userInstance.comparePassword(password)
    );

/**
 * Create a user.
 * @param {Object} user - The user information.
 * @param {String} user.emailAddress - The email address of the user.
 * @param {String} user.password - The password of the user.
 * @param {String} [user.name] - The display name of the user.
 * @param {String} [user.squareId] - The Square Cash 'cash.me' cashtag (must begin with $).
 * @param {String} [user.paypalId] - The Paypal 'paypal.me' ID of the user.
 * @returns {Promise} Resolves to the instance of the User from the database.
 */
const createUser = user =>
new Promise((resolve, reject) => {
  if (!user.password) {
    return reject(new Error('Password is required.'));
  }
  return resolve(User.create({ emailAddress: user.emailAddress })
    .then((userInstance) => {
      const password = user.password;
      return userInstance.setPassword(password);
    })
    .then((userInstance) => {
      const userParams = Object.assign({}, user);
      delete userParams.password;
      delete userParams.emailAddress;
      return userInstance.update(userParams);
    }));
});

/**
 * Delete a user.
 * @param {string} emailAddress - The email address of the user.
 * @returns {Promise} Resolves to undefined.
 */
const deleteUser = emailAddress =>
  findUserByEmailAddress(emailAddress)
    .then(userInstance => userInstance.destroy());

module.exports = {
  findUserByEmailAddress,
  updateUser,
  verifyUser,
  createUser,
  deleteUser,
};
