'use strict';
var createError = require('http-errors');

var Transaction = require('./schema.js').Transaction;
var AdminsApi = require('./schema.js').AdminsApi;
var DevelopersApi = require('./schema.js').DevelopersApi;

/**
 * Operations on /transaction
 */
module.exports = {
    /**
     * summary: retrieve a list of transactions
     * description: List all transactions

     * parameters: 
     * produces: application/json
     * responses: 200, 400
     * operationId: getAllTransaction
     */
    get: {
        200: function (req, res, callback) {
          DevelopersApi.getAllTransaction(function(error, data, response) {
            res.status(response.statusCode); // Pass along status code, so we don't swallow errors
            res.send(response.text);
          });

        },
        400: function (req, res, callback) {
          callback(createError(400, 'Bad request'));
        }
    },
    /**
     * summary: add a transaction
     * description: Adds a transaction to the ledger
     * parameters: transaction
     * produces: application/json
     * responses: 201, 400, 409
     * operationId: addTransaction
     */
    post: {
        201: function (req, res, callback) {
          var transaction = new Transaction( req.body.sender, req.body.recipient, String(req.body.value) );

          AdminsApi.addTransaction( {'transaction': transaction}, function(error, data, response) {
            res.status(response.statusCode); // Pass along status code, so we don't swallow errors
            res.send(response.text);
          });
        },
        400: function (req, res, callback) {
            callback(createError(400, 'Bad request'));
        },
        409: function (req, res, callback) {
            callback(createError(409, 'Conflict'));
        }
    }
};
