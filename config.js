/**
 * @module config
 */

module.exports = {
  db: {
    name: 'database',
    username: 'username',
    password: 'password',
    path: `./db/${process.env.NODE_ENV}-database.sqlite`,
  },
};
