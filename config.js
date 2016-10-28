/**
 * @module config
 */

module.exports = {
  db: {
    name: 'database',
    username: 'username',
    password: 'password',
    path: `./server/db/${process.env.NODE_ENV}-database.sqlite`,
  },
  bcryptHashRounds: 10,
  sessionSecret: 'manatee_session_secret',
  jwt: {
    secret: 'manatee_jwt_secret',
  },
};
