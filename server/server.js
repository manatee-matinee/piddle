const express = require('express');
const morgan = require('morgan');
const api = require('./routes/api');

const app = express();

app.use(morgan('dev'));
app.use('body-parser');

app.use('/api', api);

app.use('/', express.static);


