'use strict';
/**
 * Authorize function for securityDefinitions:api_key
 * type : apiKey
 * description: 
 */

var createError = require('http-errors');
var base64 = require('base-64');
var api_key = require('../config/secrets.js').api_key;

module.exports = function authorize(req, res, next) {
  var token = base64.decode(req.headers.authorization.split(" ")[1]);
  if( token != api_key ) {
    next(createError(401, "Missing or incorrect api key"));
  }
  else {
    next();
  }
};
