'use strict';
var Transaction = require('../schema.js').Transaction;
var DevelopersApi = require('../schema.js').DevelopersApi;
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
          DevelopersApi.getTransaction( req.params.transactionId, function(error, data, response) {
            res.status(response.statusCode); // Pass along status code, so we don't swallow errors
            res.send(response.text);
          });
        },
        400: function (req, res, callback) {
            callback(createError(400, 'Bad request'));
        }
    }
};
