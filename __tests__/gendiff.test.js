import gendiff from '../src';
import { getFixturePath } from '../src/utils';

const fs = require('fs');

test('gendiff', () => {
  const fileTestPath = getFixturePath('result.txt');
  console.log(fileTestPath);
  const dataTestFile = fs.readFileSync(fileTestPath).toString();
  console.log(dataTestFile);
  expect(gendiff('src/after.json', 'src/before.json')).toEqual(dataTestFile);
});
