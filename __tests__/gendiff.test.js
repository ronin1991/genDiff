import fs from 'fs';
import path from 'path';
import gendiff from '../src';

let outDefault;
let outPlain;
let outJson;

const getFixturePath = (fileName) => path.join(__dirname, '..', '__fixtures__', fileName);

const firstFilePath = getFixturePath('before.json');
const secondFilePath = getFixturePath('after.json');

beforeAll(() => {
  outDefault = fs.readFileSync(getFixturePath('result.txt'), 'utf-8');
  outPlain = fs.readFileSync(getFixturePath('plain.txt'), 'utf-8');
  outJson = fs.readFileSync(getFixturePath('test-json.txt'), 'utf-8');
});

test('out default', () => {
  expect(gendiff(firstFilePath, secondFilePath, 'default')).toEqual(outDefault);
});

test('out plain', () => {
  expect(gendiff(firstFilePath, secondFilePath, 'plain')).toEqual(outPlain);
});
test('out json', () => {
  expect(gendiff(firstFilePath, secondFilePath, 'json')).toEqual(outJson);
});
