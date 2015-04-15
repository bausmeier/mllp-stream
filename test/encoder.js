'use strict';

var Encoder = require('../lib').Encoder;
var Tap = require('tap');

var test = Tap.test;

var start = new Buffer([0x0B]);
var end = new Buffer([0x1C, 0x0D]);

test('no encoding', function(t) {
  t.plan(1);

  var message = 'test';

  var encoder = new Encoder();

  encoder.once('data', function(data) {
    var expected = Buffer.concat([start, new Buffer(message), end]);
    t.deepEquals(data, expected);
  });

  encoder.write(message);
});

test('utf8 encoding', function(t) {
  t.plan(1);

  var message = 'test';
  
  var encoder = new Encoder({encoding: 'utf8'});

  encoder.once('data', function(data) {
    var expected = Buffer.concat([start, new Buffer(message), end]).toString();
    t.equals(data, expected);
  });

  encoder.write(message);
});
