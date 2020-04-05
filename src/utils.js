const path = require('path');
const _ = require('lodash');

const getFormatFile = (file) => path.extname(file);

const getUniqKeys = (...rest) => _.uniq(rest.reduce((acc, e) => [...acc, ...Object.keys(e)], []));


const stringify = (value, lvl) => {
  if (value instanceof Object) {
    const space = lvl + 6;
    const key = Object.keys(value);
    const objValue = Object.values(value);
    return `{ \n${' '.repeat(space)}${key[0]}: ${stringify(objValue[0], space)}\n${' '.repeat(space - 4)}}`;
  }
  return value;
};

export {
  getUniqKeys, stringify,
  getFormatFile,
};
