'use strict';
var Models = require('./schema.js');
/**
 * Operations on /transaction
 */
module.exports = {
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
            var transaction = new Models.Transaction( req.body );
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
