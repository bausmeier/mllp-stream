'use strict';

var MLLPStream = require('../lib');
var Tap = require('tap');

var test = Tap.test;

var stream = MLLPStream({encoding: 'utf8'});

stream.encoder.pipe(stream.decoder);

test('pipe', function(t) {
  t.plan(1);

  var message = 'test';

  stream.decoder.once('data', function(data) {
    t.equals(data, message);
  });

  stream.encoder.write(message);
});
