'use strict';

const Decoder = require('./decoder');
const Encoder = require('./encoder');

module.exports = exports = (options) => {

  return {
    decoder: new Decoder(options),
    encoder: new Encoder(options)
  };
};

exports.Decoder = Decoder;
exports.Encoder = Encoder;
