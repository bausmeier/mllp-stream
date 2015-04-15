# Minimal Lower Layer Protocol (MLLP) framing streams

Streams for encoding and decoding MLLP messages.

## MLLPStream([options])

Returns an object with `encoder` and `decoder` streams initialised with the provided options.

Example:
```js
var MLLPStream = require('mllp-stream');

var stream = MLLPStream({encoding: 'utf8'});

stream.encoder.pipe(stream.decoder).pipe(process.stdout);

stream.encoder.write('Test');
```

## new MLLPStream.Decoder([options])

Create an MLLP decoder stream passing the options to the underlying transform stream.

## new MLLPStream.Encoder([options])

Create an MLLP encoder stream passing the options to the underlying transform stream.
