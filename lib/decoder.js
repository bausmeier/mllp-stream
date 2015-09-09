'use strict';

const Transform = require('stream').Transform;

const end = new Buffer([0x1C, 0x0D]);

class Decoder extends Transform {

  constructor(options) {
    super(options);
    this._buffer = null;
  }

  _transform(chunk, encoding, callback) {

    // Prepend buffered data
    if (this._buffer) {
      chunk = Buffer.concat([this._buffer, chunk]);
      this._buffer = null;
    }

    while (chunk.length > 0) {
   
      // Check that this chunk starts with the start character
      if (chunk[0] !== 0x0B) {
        return callback(new Error('Invalid start character'));
      }
      
      // Check if this chunk contains the end block
      const endIndex = chunk.indexOf(end);
      if (endIndex === -1) {
        this._buffer = chunk;
        return callback();
      }

      // Write the data
      this.push(chunk.slice(1, endIndex));
      chunk = chunk.slice(endIndex + 2);
    }

    callback();
  }
}

module.exports = Decoder;
