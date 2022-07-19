var equal = require('buffer-equal');

var HEADER = Buffer.from([66, 77, 70, 3]);
export function isBinaryFormat(buf) {
  if (typeof buf === 'string') return buf.substring(0, 3) === 'BMF';
  return buf.length > 4 && equal(buf.slice(0, 4), HEADER);
}