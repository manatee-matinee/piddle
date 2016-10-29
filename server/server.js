const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const api = require('./routes/api');
const auth = require('./routes/auth');
const path = require('path');
const config = require('../config');
const passport = require('./passportConfig');
const bodyParser = require('body-parser');

const app = express();

// Don't enable CORS in production.
if (/^(dev|test)$/.test(process.env.NODE_ENV)) {
  app.use(cors());
}
if (process.env.NODE_ENV !== 'test') {
  // Don't log requests during testing
  app.use(morgan('dev'));
}
app.use(bodyParser.json());
app.use(passport.initialize());

app.use('/api', api);
app.use('/auth', auth);

app.use('/', express.static(path.join(__dirname, '../client/build')));

const port = process.env.PORT || 3000;
app.listen(port);

console.log(`Server listening on port: ${port}`);
module.exports = app;
