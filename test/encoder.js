'use strict';

const Encoder = require('../lib').Encoder;
const Tap = require('tap');

const test = Tap.test;

const start = new Buffer([0x0B]);
const end = new Buffer([0x1C, 0x0D]);

test('no encoding', (t) => {
  t.plan(1);

  const message = 'test';
  const encoder = new Encoder();

  encoder.once('data', (data) => {
    const expected = Buffer.concat([start, new Buffer(message), end]);
    t.deepEquals(data, expected);
  });

  encoder.write(message);
});

test('utf8 encoding', (t) => {
  t.plan(1);

  const message = 'test';
  const encoder = new Encoder({encoding: 'utf8'});

  encoder.once('data', (data) => {
    const expected = Buffer.concat([start, new Buffer(message), end]).toString('utf8');
    t.equals(data, expected);
  });

  encoder.write(message);
});
