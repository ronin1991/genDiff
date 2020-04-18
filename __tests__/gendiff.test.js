import gendiff from '../src';
import { readFile } from '../src/utils';

let outDefault;
let outPlain;
let outJson;

beforeAll(() => {
  outDefault = readFile('result.txt');
  outPlain = readFile('plain.txt');
  outJson = readFile('test-json.txt');
});

test('out defalt', () => {
  expect(gendiff('__fixtures__/before.json', '__fixtures__/after.json')).toEqual(outDefault);
});

test('out plain', () => {
  expect(gendiff('__fixtures__/before.json', '__fixtures__/after.json', 'plain')).toEqual(outPlain);
});
test('out json', () => {
  expect(gendiff('__fixtures__/before.json', '__fixtures__/after.json', 'json')).toEqual(outJson);
});
