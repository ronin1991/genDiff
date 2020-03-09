#!/usr/bin/env  node
import compareFiles from '..';

const fs = require('fs');
const ini = require('ini');
const program = require('commander');

program
  .version('0.0.1', '-v, --VERSION', 'new version message')
  .description('Compares two configuration files and shows a difference.')
  .arguments('<firstConfig> <secondConfig>')
  .option('-f, --format [type]', 'output format')

  .action((firstPathToFile, secondPathToFile) => {
    console.log(compareFiles(firstPathToFile, secondPathToFile));
    console.log(ini.parse(fs.readFileSync('__fixtures__/after.yaml', 'utf-8')));
  });
program.parse(process.argv);

export default compareFiles;
