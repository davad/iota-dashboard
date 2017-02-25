'use strict';

var http = require('http');
const path = require('path');

var express = require('express');
var httpErrors = require('http-errors-express').default;
var bodyparser = require('body-parser');
var mongoose = require('mongoose');
const helmet = require('helmet');
const winston = require('winston');

// Imports for RESTful and GraphQL APIs
var swaggerize = require('swaggerize-express');
var graffiti = require('@risingstack/graffiti');
var getSchema = require('@risingstack/graffiti-mongoose').getSchema;
var models = require('./data/models');


// Begin express application
var app = express();
var server = http.createServer(app);
const PORT = process.env.PORT || 8080;

app.use(helmet());

// Static assets
const assetsPath = path.join(__dirname, './client/dist');
const index = 'index.html';
app.use(express.static(assetsPath));
app.get('/', (req, res) => res.sendFile(path.join(assetsPath, index)));

// Setup mongo connection and event handlers
var db = mongoose.connection;

db.on('error', function() {
  console.log('Database connection error');
});

db.on('connecting', function() {
  console.log('Database connecting');
});

db.on('open', function() {
  console.log('Database connection established');
});

db.on('reconnected', function() {
  console.log('Database reconnected');
});

mongoose.connect('mongodb://127.0.0.1:27017/TestDB');

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({
    extended: true
}));

// Stand up RESTful API
app.use(swaggerize({
    api: require('./config/swagger.json'),
    docspath: '/api-docs',
    handlers: './handlers'
}));

// Stand up GraphQL API (remove mutations to make read only)
var readOnlySchema = getSchema(models.Transaction);
var noop = function(input) { };
readOnlySchema._mutationType._fields.addTransaction.resolve = noop;
readOnlySchema._mutationType._fields.updateTransaction.resolve = noop;
readOnlySchema._mutationType._fields.deleteTransaction.resolve = noop;


app.use(graffiti.express({
  schema: readOnlySchema
}));

// This middleware should be last
app.use(httpErrors());

server.listen(PORT, function(err) {
  if (err) {
    winston.error(err);
    return;
  }

  app.swagger.api.host = this.address().address + ':' + this.address().port;
  /* eslint-disable no-console */
  winston.info('app running on %s:%d', this.address().address, this.address().port);
  /* eslint-disable no-console */
});
