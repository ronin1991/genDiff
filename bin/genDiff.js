#!/usr/bin/env  node
import program from 'commander';
import gendiff from '../src/index.js';
import pkg from '../package.json';

program
  .version(`${pkg.version}`, '-v, --VERSION', 'new version message')
  .description(`${pkg.description}`)
  .arguments('<firstConfig> <secondConfig>')
  .option('-f, --format [type]', 'output format', 'pretty')
  .action((firstPathToFile, secondPathToFile) => {
    console.log(gendiff(firstPathToFile, secondPathToFile, program.format));
  })
  .parse(process.argv);
