#!/usr/bin/env  node
const program = require('commander');

console.log('da');


program
  .version('0.0.1', '-v, --VERSION', 'new version message')
  .parse(process.argv);
