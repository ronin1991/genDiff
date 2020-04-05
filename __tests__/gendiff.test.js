import gendiff from '../src';

const fs = require('fs');

const dataTestFile = fs.readFileSync('__fixtures__/result.txt', 'utf-8');


test('ast', () => {
  console.log(__dirname);
  expect(gendiff('__fixtures__/before.json', '__fixtures__/after.json')).toEqual(dataTestFile);
});
