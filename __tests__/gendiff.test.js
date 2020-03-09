import gendiff from '../src';

const fs = require('fs');

test('json', () => {
  const dataTestFile = fs.readFileSync('__fixtures__/result.txt', 'utf-8');
  expect(gendiff('src/after.json', 'src/before.json')).toEqual(dataTestFile);
});

test('yaml', () => {
  const dataTestFile = fs.readFileSync('__fixtures__/result.txt', 'utf-8');
  expect(gendiff('__fixtures__/after.yaml', '__fixtures__/before.yaml')).toEqual(dataTestFile);
});

test('ini', () => {
  const dataTestFile = fs.readFileSync('__fixtures__/result.txt', 'utf-8');
  expect(gendiff('__fixtures__/after.ini', '__fixtures__/before.ini')).toEqual(dataTestFile);
});
