'use strict';

var Decoder = require('./decoder');
var Encoder = require('./encoder');

module.exports = exports = function(options) {

  return {
    decoder: new Decoder(options),
    encoder: new Encoder(options)
  };
};

exports.Decoder = Decoder;
exports.Encoder = Encoder;
