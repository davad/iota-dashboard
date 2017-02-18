'use strict';

var http = require('http');
var express = require('express');
var httpErrors = require('http-errors-express').default;
var bodyparser = require('body-parser');
var swaggerize = require('swaggerize-express');
var mongoose = require('mongoose');

var app = express();

var server = http.createServer(app);

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

app.use(swaggerize({
    api: require('./config/swagger.json'),
    docspath: '/api-docs',
    handlers: './handlers'
}));

// This middleware should be last
app.use(httpErrors());

server.listen(8000, function () {
    app.swagger.api.host = this.address().address + ':' + this.address().port;
    /* eslint-disable no-console */
    console.log('app running on %s:%d', this.address().address, this.address().port);
    /* eslint-disable no-console */
});
