#!/usr/bin/env  node
const program = require('commander');
const fs = require('fs');
const path = require('path');

// const dada = path.resolve('src', 'before.json');
// const notes = '/home/ronin/frontend-project-lvl2/gendiff.json';
// // path.dirname(notes);
// console.log(dada);
// console.log('da');
// const b = fs.readFileSync('/frontend-project-lvl2/src/before.js');
// const fd = fs.readFileSync('../before.json');
// console.log(fd.toString());
program
  .version('0.0.1', '-v, --VERSION', 'new version message')
  .description('Compares two configuration files and shows a difference.')
  .arguments('<firstConfig> <secondConfig>')
  .option('-f, --format [type]', 'output format')

  .action((firstConfig, secondConfig) => {
    // const pathFirstFile = path.resolve('src', firstConfig);
    const dir = path.dirname(firstConfig);
    console.log(dir);
    // const b = fs.readFileSync(pathFirstFile);
    // let a = JSON.parse(firstConfig);
    // console.log(b);
  });
program.parse(process.argv);


// fs.read
// filehandle.read
// fs.readFile
fs.readFileSync