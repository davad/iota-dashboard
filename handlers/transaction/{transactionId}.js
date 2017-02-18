'use strict';
var dataProvider = require('../../data/transaction/{transactionId}.js');
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
     */
    get: function getTransaction(req, res, next) {
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
    }
};
