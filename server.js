'use strict';

var http = require('http');
var express = require('express');
var httpErrors = require('http-errors-express').default;
var bodyparser = require('body-parser');
var swaggerize = require('swaggerize-express');

var app = express();

var server = http.createServer(app);

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

server.listen(3000, function () {
    app.swagger.api.host = this.address().address + ':' + this.address().port;
    /* eslint-disable no-console */
    console.log('app running on %s:%d', this.address().address, this.address().port);
    /* eslint-disable no-console */
});
