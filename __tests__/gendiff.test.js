import gendiff from '../src';
import { getPath } from '../src/utils';
import compareYamlFiles from '../src/bin/da';


const fs = require('fs');

test('gendiff', () => {
  const fileTestPath = getPath('result.txt');
  const dataTestFile = fs.readFileSync(fileTestPath).toString();
  expect(gendiff('src/after.json', 'src/before.json')).toEqual(dataTestFile);
});

test('yaml', () => {
  const fileTestPath = getPath('result.txt');
  const dataTestFile = fs.readFileSync(fileTestPath).toString();
  expect(compareYamlFiles('__fixtures__/after.yaml', '__fixtures__/before.yaml')).toEqual(dataTestFile);
});
