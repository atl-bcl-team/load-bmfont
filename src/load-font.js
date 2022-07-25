import { parseASCII } from './parse-bmfont-ascii';
import { parseXML } from './parse-bmfont-xml';
import { readBMFontBinary } from './parse-bmfont-binary';
import { isBinaryFormat } from './is-binary';
import { Buffer } from 'buffer/'; // for use with browserify
import mime from 'mime';
var noop = function() {}

function parseFont(file, data, cb) {
  var result, binary
  // console.log(file);
  // console.log(data);

  if (isBinaryFormat(data)) {
    if (typeof data === 'string') data = Buffer.from(data, 'binary')
    binary = true
  } else data = data.toString().trim()

  // console.log(data);

  try {
    if (binary) result = readBMFontBinary(data)
    else if (/json/.test(mime.getType(file)) || data.charAt(0) === '{')
      result = JSON.parse(data)
    else if (/xml/.test(mime.getType(file)) || data.charAt(0) === '<')
      result = parseXML(data)
    else result = parseASCII(data)
  } catch (e) {
    cb(e)
    cb = noop
  }

  cb(null, result)
}

export function loadFont(opt, cb) {
  cb = typeof cb === 'function' ? cb : noop
  if (typeof opt !== 'string') throw new Error('The first parameter must be a string url');

  fetch(opt,{
    headers: {
      'Content-Type': 'text/plain',
    },
  })
    .then(data => data.text())
    .then(data => parseFont(opt,data,cb))
    .catch(err => cb(err));
}