#!/usr/bin/env  node
import program from 'commander';
import compareFiles from '..';
import { getFixturePath } from '../utils';

console.log(getFixturePath('before.json'));
program
  .version('0.0.1', '-v, --VERSION', 'new version message')
  .description('Compares two configuration files and shows a difference.')
  .arguments('<firstConfig> <secondConfig>')
  .option('-f, --format [type]', 'output format', 'json')
  .action((firstPathToFile, secondPathToFile) => {
    console.log(compareFiles(firstPathToFile, secondPathToFile, program.format));
  });


program.parse(process.argv);

export default compareFiles;
