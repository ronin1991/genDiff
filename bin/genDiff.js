#!/usr/bin/env  node
import program from 'commander';
import gendiff from '../src/index.js';
// import

program
  .version('1.0.0', '-v, --VERSION', 'new version message')
  .description('Compares two configuration files and shows a difference.')
  .arguments('<firstConfig> <secondConfig>')
  .option('-f, --format [type]', 'output format', 'pretty')
  .action((firstPathToFile, secondPathToFile) => {
    console.log(gendiff(firstPathToFile, secondPathToFile, program.format));
  })
  .parse(process.argv);
