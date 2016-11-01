module.exports = {
  db: {
    name: 'database',
    username: 'username',
    password: 'password',
    path: `./server/db/${process.env.NODE_ENV}-database.sqlite`,
  },
  bcryptHashRounds: 10,
  jwt: {
    secret: process.env.JWT_SECRET || 'manatee_jwt_secret',
  },
};
