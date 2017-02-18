'use strict'
var randomstring = require('randomstring');

module.exports = function() { 
  return randomstring.generate({
    length: 81,
    charset: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ9'
  });
}

