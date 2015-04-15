'use strict';

var Util = require('util');
var Transform = require('stream').Transform;

var start = new Buffer([0x0B]);
var end = new Buffer([0x1C, 0x0D]);

function Encoder(options) {
  Transform.call(this, options);
}

Util.inherits(Encoder, Transform);

Encoder.prototype._transform = function(chunk, encoding, callback) {
  this.push(Buffer.concat([start, chunk, end]));
  callback();
};

module.exports = Encoder;
