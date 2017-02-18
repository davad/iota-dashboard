'use strict';
var dataProvider = require('../data/transaction.js');
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
     */
    get: function getAllTransaction(req, res, next) {
        /**
         * Get the data for response 200
         * For response `default` status 200 is used.
         */
        var status = 200;
        var provider = dataProvider['get']['200'];
        provider(req, res, function (err, data) {
            if (err) {
                next(err);
                return;
            }
            res.status(status).send(data && data.responses);
        });
    },
    /**
     * summary: add a transaction
     * description: Adds a transaction to the ledger
     * parameters: transaction
     * produces: application/json
     * responses: 201, 400, 409
     */
    post: function addTransaction(req, res, next) {
        /**
         * Get the data for response 201
         * For response `default` status 200 is used.
         */
        var status = 201;
        var provider = dataProvider['post']['201'];
        provider(req, res, function (err, data) {
            if (err) {
                next(err);
                return;
            }
            res.status(status).send(data && data.responses);
        });
    }
};
