'use strict';

const Decoder = require('../lib').Decoder;
const Tap = require('tap');

const decoder = new Decoder();
const test = Tap.test;

const end = new Buffer([0x1C, 0x0D]);
const start = new Buffer([0x0B]);

test('invalid start character', (t) => {
  t.plan(1);

  decoder.once('error', (err) => t.equals(err.message, 'Invalid start character'));
  
  decoder.write(new Buffer('a'));
});

test('single chunk, single message', (t) => {
  t.plan(1);

  const expected = new Buffer('test');

  decoder.once('data', (data) => t.deepEquals(data, expected));

  decoder.write(Buffer.concat([start, expected, end]));
});

test('multiple chunks, single message', (t) => {
  t.plan(1);

  const first = new Buffer('first');
  const second = new Buffer('second');

  decoder.once('data', (data) => t.deepEquals(data, Buffer.concat([first, second])));

  decoder.write(Buffer.concat([start, first]));
  decoder.write(Buffer.concat([second]));
  decoder.write(Buffer.concat([end]));
});

test('single chunk, multiple messages', (t) => {
  t.plan(2);

  const first = new Buffer('first');
  const second = new Buffer('second');

  decoder.once('data', (firstData) => {
    t.deepEquals(firstData, first);
    decoder.once('data', (secondData) => t.deepEquals(secondData, second));
  });

  decoder.write(Buffer.concat([start, first, end, start, second, end]));
});

test('multiple chunks, multiple messages', (t) => {
  t.plan(2);

  const first = new Buffer('first');
  const second = new Buffer('second');

  decoder.once('data', (firstData) => {
    t.deepEquals(firstData, first);
    decoder.once('data', (secondData) => t.deepEquals(secondData, second));
  });

  decoder.write(Buffer.concat([start, first, end]));
  decoder.write(Buffer.concat([start, second, end]));
});

test('utf8 encoding', (t) => {
  t.plan(1);

  const message = 'test';
  const decoder = new Decoder({encoding: 'utf8'});

  decoder.once('data', (data) => t.equals(data, message));

  decoder.write(Buffer.concat([start, new Buffer(message), end]));
});
