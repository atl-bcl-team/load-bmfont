import { Buffer } from 'buffer/'; // for use with browserify
var HEADER = Buffer.from([66, 77, 70, 3])

function equal(a, b) {
    if (!Buffer.isBuffer(a)) return undefined;
    if (!Buffer.isBuffer(b)) return undefined;
    if (typeof a.equals === 'function') return a.equals(b);
    if (a.length !== b.length) return false;
    
    for (var i = 0; i < a.length; i++) {
        if (a[i] !== b[i]) return false;
    }
    
    return true;
};

export function isBinaryFormat(buf) {
  if (typeof buf === 'string')
    return buf.substring(0, 3) === 'BMF'
    return buf.length > 4 && equal(buf.slice(0, 4), HEADER)
};