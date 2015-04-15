'use strict';

var Decoder = require('../lib').Decoder;
var Tap = require('tap');

var decoder = new Decoder();
var test = Tap.test;

var end = new Buffer([0x1C, 0x0D]);
var start = new Buffer([0x0B]);

test('invalid start character', function(t) {
  t.plan(1);

  decoder.once('error', function(err) {
    t.equals(err.message, 'Invalid start character');
  });
  
  decoder.write(new Buffer('a'));
});

test('single chunk, single message', function(t) {
  t.plan(1);

  var expected = new Buffer('test');

  decoder.once('data', function(data) {
    t.deepEquals(data, expected);
  });

  decoder.write(Buffer.concat([start, expected, end]));
});

test('multiple chunks, single message', function(t) {
  t.plan(1);

  var first = new Buffer('first');
  var second = new Buffer('second');

  decoder.once('data', function(data) {
    t.deepEquals(data, Buffer.concat([first, second]));
  });

  decoder.write(Buffer.concat([start, first]));
  decoder.write(Buffer.concat([second]));
  decoder.write(Buffer.concat([end]));
});

test('single chunk, multiple messages', function(t) {
  t.plan(2);

  var first = new Buffer('first');
  var second = new Buffer('second');

  decoder.once('data', function(data) {
    t.deepEquals(data, first);
    decoder.once('data', function(data) {
      t.deepEquals(data, second);
    });
  });

  decoder.write(Buffer.concat([start, first, end, start, second, end]));
});

test('multiple chunks, multiple messages', function(t) {
  t.plan(2);

  var first = new Buffer('first');
  var second = new Buffer('second');

  decoder.once('data', function(data) {
    t.deepEquals(data, first);
    decoder.once('data', function(data) {
      t.deepEquals(data, second);
    });
  });

  decoder.write(Buffer.concat([start, first, end]));
  decoder.write(Buffer.concat([start, second, end]));
});

test('utf8 encoding', function(t) {
  t.plan(1);

  var message = 'test';

  var decoder = new Decoder({encoding: 'utf8'});

  decoder.once('data', function(data) {
    t.equals(data, message);
  });

  decoder.write(Buffer.concat([start, new Buffer(message), end]));
});
