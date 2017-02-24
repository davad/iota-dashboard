'use strict';
var createError = require('http-errors');

var Transaction = require('./models.js').Transaction;
var random_tryte = require('../util/random_tryte');

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
          Transaction.find({}, function(err, data) {
            if(err) {}

            if (data) {
              res.json(data);
            }
            else {
              callback(createError(404, 'Transaction not found'));
            }
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
          var transaction = new Transaction( req.body );
          transaction.id = random_tryte();
          transaction.save();
          res.json(transaction);
        },
        400: function (req, res, callback) {
            callback(createError(400, 'Bad request'));
        },
        409: function (req, res, callback) {
            callback(createError(409, 'Conflict'));
        }
    }
};
