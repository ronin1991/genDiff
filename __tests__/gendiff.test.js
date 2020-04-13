import gendiff from '../src';

const fs = require('fs');

const outDefalt = fs.readFileSync('__fixtures__/result.txt', 'utf-8');
const outPlain = fs.readFileSync('__fixtures__/plain.txt', 'utf-8');
const outJson = fs.readFileSync('__fixtures__/test-json.txt', 'utf-8');

test('out defalt', () => {
  expect(gendiff('__fixtures__/before.json', '__fixtures__/after.json')).toEqual(outDefalt);
});

test('out plain', () => {
  expect(gendiff('__fixtures__/before.json', '__fixtures__/after.json', 'plain')).toEqual(outPlain);
});
test('out json', () => {
  expect(gendiff('__fixtures__/before.json', '__fixtures__/after.json', 'json')).toEqual(outJson);
});
// тест json
