const config = require('../config.js');
const Sequelize = require('sequelize');

const sequelize = new Sequelize(config.db.name, config.db.username, config.db.password, {
  host: 'localhost',
  dialect: 'sqlite',
  logging: (process.env.NODE_ENV === 'test') ? false : console.log, // eslint-disable-line
  storage: config.db.path,
});

const Bill = sequelize.define('bill', {
  description: {
    type: Sequelize.STRING,
  },
  tax: {
    type: Sequelize.DECIMAL(10, 2), // eslint-disable-line
  },
  tip: {
    type: Sequelize.DECIMAL(10, 2), // eslint-disable-line
  },
});

const Item = sequelize.define('item', {
  description: {
    type: Sequelize.STRING,
  },
  price: {
    type: Sequelize.DECIMAL(10, 2),  // eslint-disable-line
    allowNull: false,
  },
  paid: {
    type: Sequelize.BOOLEAN,
  },
});

const User = sequelize.define('user', {
  venmoId: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  firstName: {
    type: Sequelize.STRING,
  },
  lastName: {
    type: Sequelize.STRING,
  },
  displayName: {
    type: Sequelize.STRING,
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  profilePictureUrl: {
    type: Sequelize.STRING,
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
