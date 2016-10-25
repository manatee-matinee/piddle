const config = require('../config.js');
const Sequelize = require('sequelize');
const Hashids = require('hashids');

const hashIds = new Hashids('manatee salt', 5);

console.log('db path:', config.db.path);

const sequelize = new Sequelize(config.db.name, config.db.username, config.db.password, {
  host: 'localhost',
  dialect: 'sqlite',
  logging: (process.env.NODE_ENV === 'test') ? false : console.log, // eslint-disable-line
  storage: config.db.path,
});

const Bill = sequelize.define('bill', {
  shortId: {
    type: Sequelize.STRING,
  },
  description: {
    type: Sequelize.STRING,
  },
  tax: {
    type: Sequelize.DECIMAL(10, 2), // eslint-disable-line
  },
  tip: {
    type: Sequelize.DECIMAL(10, 2), // eslint-disable-line
  },
},
  {
    hooks: {
      afterCreate: bill => bill.update({ shortId: hashIds.encode(bill.dataValues.id) }),
    },
  }
);

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

const BillDebtors = sequelize.define('bill_debtors', {
});

User.belongsToMany(Bill, {
  through: BillDebtors,
  as: 'Debtors',
  foreignKey: 'debtorId',
});

Bill.belongsToMany(User, { through: BillDebtors });

Bill.belongsTo(User, {
  as: 'Payer',
  foreignKey: 'payerId',
});

// Items
Bill.hasMany(Item);

Item.belongsTo(Bill);

Item.belongsTo(User, {
  as: 'Payer',
  foreignKey: 'payerId',
});


// Create the tables specified above
User.sync();
Bill.sync();
Item.sync();
BillDebtors.sync();

module.exports = {
  models: {
    Bill,
    Item,
    User,
  },
  sequelize,
};
