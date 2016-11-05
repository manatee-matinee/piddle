const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const api = require('./routes/api');
const auth = require('./routes/auth');
const path = require('path');
const config = require('../config');
const passport = require('./passportConfig');
const bodyParser = require('body-parser');
const gcloud = require('google-cloud');
const multer = require('multer'); 

const app = express();

// Don't enable CORS in production.
if (/^(dev|test)$/.test(process.env.NODE_ENV)) {
  app.use(cors());
}
if (process.env.NODE_ENV !== 'test') {
  // Don't log requests during testing
  app.use(morgan('dev'));
}

//multer routing, uploads files to uploads folder
app.use(multer({dest: './uploads/'}).single('photo'));

//configuring google vision
var vconfig = {
  projectId: 'testapp-148322',
  keyFilename: path.join(__dirname, '/testapp-cd0ba168840f.json')
};
var vision = gcloud.vision(vconfig);

//post route for uploading receipt images
app.post('/upload', function(req, res) {
  //FIXME pathing if needed
  let dir = '/../' + req.file.path;
  let currPath = path.join(__dirname, dir);
  let options = {
    verbose: true
  }
  
  vision
    .detectText(currPath, options)
    .then(function(data) {
      res.send(JSON.stringify(data));
    });
})

app.use(bodyParser.json());
app.use(passport.initialize());

app.use('/', express.static(path.join(__dirname, '../client/build')));

app.use('/api', api);
app.use('/auth', auth);

app.use('*', (request, response) => {
  if (request.xhr || request.headers.accept.indexOf('json') > -1) {
    // request is an API request; respond with 404
    return response.sendStatus(404);
  }
  // request probably came from browser; send back index page and let React client handle
  return response.sendFile(path.join(__dirname, '../client/build/index.html'));
});

const port = process.env.PORT || 3000;
app.listen(port);

console.log(`Server listening on port: ${port}`);
module.exports = app;
