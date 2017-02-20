'use strict';
var base64 = require('base-64');
var IotaDashboardApi = require('iota-dashboard-api-client');

var api_key = require('../config/secrets').api_key;
var api_url = require('../config/data').api_url;

var defaultClient = IotaDashboardApi.ApiClient.instance;

// Point client to the right URL
defaultClient.basePath = api_url;

// Configure API key authorization: api_key
var auth = defaultClient.authentications['api_key'];
auth.apiKey = base64.encode(api_key);
auth.apiKeyPrefix = "Token";

var AdminsApi = new IotaDashboardApi.AdminsApi();
var DevelopersApi = new IotaDashboardApi.DevelopersApi();

module.exports =  {
  AdminsApi: AdminsApi,
  DevelopersApi: DevelopersApi,
  Transaction: IotaDashboardApi.Transaction
}
