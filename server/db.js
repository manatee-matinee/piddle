const config = require('../config.js');
const Sequelize = require('sequelize');

const sequelize = new Sequelize(config.db.name, config.db.username, config.db.password, {
  host: 'localhost',
  dialect: 'sqlite',
  logging: (process.env.NODE_ENV === 'test') ? false : console.log,
  storage: config.db.path,
});

const Bill = sequelize.define('bill', {
  description: {
    type: Sequelize.TEXT,
  },
  tax: {
    type: Sequelize.REAL,
  },
  tip: {
    type: Sequelize.REAL,
  },
});

const Item = sequelize.define('item', {
  description: {
    type: Sequelize.TEXT,
  },
  price: {
    type: Sequelize.REAL,
    allowNull: false,
  },
});

const User = sequelize.define('user', {
  venmoId: {
    type: Sequelize.TEXT,
    allowNull: false,
  },
  firstName: {
    type: Sequelize.TEXT,
  },
  lastName: {
    type: Sequelize.TEXT,
  },
  displayName: {
    type: Sequelize.TEXT,
  },
  email: {
    type: Sequelize.TEXT,
    allowNull: false,
  },
  profilePictureUrl: {
    type: Sequelize.TEXT,
  },
});

Bill.hasMany(Item);
Bill.hasMany(User, {
  as: 'Debtors',
  foreignKey: 'debtorId',
});
Bill.belongsTo(User, {
  as: 'Payer',
  foreignKey: 'payerId',
});

Item.belongsTo(Bill);
Item.belongsTo(User, {
  as: 'Payer',
  foreignKey: 'payerId',
});

User.hasMany(Bill);

// Create the tables specified above
sequelize.sync();

module.exports = {
  models: {
    Bill,
    Item,
    User,
  },
  sequelize,
};
