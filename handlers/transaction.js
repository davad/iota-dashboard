'use strict';
var dataProvider = require('../data/transaction.js');
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
