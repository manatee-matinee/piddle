const express = require('express');

const morgan = require('morgan');

const api = require('./routes/api');

const auth = require('./routes/auth');

const app = express();

const path = require('path');

app.use(morgan('dev'));
app.use(require('body-parser').json());

app.use('/api', api);
app.use('/auth', auth);

app.use('/', express.static(path.join(__dirname, '/public')));

const port = process.env.PORT || 3000;
app.listen(port);

console.log(`Server listening on port: ${port}`);
module.exports = app;
