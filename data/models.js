'use strict';
var swaggerMongoose = require('swagger-mongoose');
var Path = require('path');
var fs = require('fs');
var apiPath = fs.readFileSync( Path.resolve(__dirname, '../config/swagger.json') );

module.exports =  swaggerMongoose.compile(apiPath).models;
