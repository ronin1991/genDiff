import gendiff from '../src';

const fs = require('fs');

const outJson = fs.readFileSync('__fixtures__/result.txt', 'utf-8');
const outPlain = fs.readFileSync('__fixtures__/plain.txt', 'utf-8');

test('out json', () => {
  expect(gendiff('__fixtures__/before.json', '__fixtures__/after.json')).toEqual(outJson);
});

test('out plain', () => {
  expect(gendiff('__fixtures__/before.json', '__fixtures__/after.json', 'plain')).toEqual(outPlain);
});
// тест json
