import gendiff from '../src';

const fs = require('fs');

const dataTestFile = fs.readFileSync('__fixtures__/result.txt', 'utf-8');
// test('json', () => {
//   expect(gendiff('src/after.json', 'src/before.json')).toEqual(dataTestFile);
// });

// test('yaml', () => {
//   expect(gendiff('__fixtures__/after.yaml', '__fixtures__/before.yaml')).toEqual(dataTestFile);
// });

// test('ini', () => {
//   expect(gendiff('__fixtures__/after.ini', '__fixtures__/before.ini')).toEqual(dataTestFile);
// });

test('ast', () => {
  console.log(__dirname);
  expect(gendiff('__fixtures__/after.json', '__fixtures__/before.json')).toEqual(dataTestFile);
});
