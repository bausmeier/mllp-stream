'use strict';

const MLLPStream = require('../lib');
const Tap = require('tap');

const test = Tap.test;

const stream = MLLPStream({encoding: 'utf8'});

stream.encoder.pipe(stream.decoder);

test('pipe', (t) => {
  t.plan(1);

  const message = 'test';

  stream.decoder.once('data', (data) => t.equals(data, message));

  stream.encoder.write(message);
});
