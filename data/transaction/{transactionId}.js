'use strict';
var Mockgen = require('../schema.js');
var Transaction = require('../schema.js').Transaction;
var createError = require('http-errors');

/**
 * Operations on /transaction/{transactionId}
 */
module.exports = {
    /**
     * summary: retrieve a particular transaction
     * description: Look up the details of a particular transaction using it&#39;s id (81 tryte hash)

     * parameters: transactionId
     * produces: application/json
     * responses: 200, 400
     * operationId: getTransaction
     */
    get: {
        200: function (req, res, callback) {
          Transaction.findOne({id: req.params.transactionId}, function(err, data) {
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
    }
};
