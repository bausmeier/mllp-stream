'use strict';

const Transform = require('stream').Transform;

const start = new Buffer([0x0B]);
const end = new Buffer([0x1C, 0x0D]);

class Encoder extends Transform {
  
  constructor(options) {
    super(options);
  }

  _transform(chunk, encoding, callback) {
    this.push(Buffer.concat([start, chunk, end]));
    callback();
  }
}

module.exports = Encoder;
