#!/usr/bin/env  node
import compareFiles from '..';

const program = require('commander');

program
  .version('0.0.1', '-v, --VERSION', 'new version message')
  .description('Compares two configuration files and shows a difference.')
  .arguments('<firstConfig> <secondConfig>')
  .option('-f, --format [type]', 'output format')

  .action((firstPathToFile, secondPathToFile) => {
    const result = compareFiles(firstPathToFile, secondPathToFile);
    console.log(result);
  });
program.parse(process.argv);

export default compareFiles;
