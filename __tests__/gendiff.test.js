
import { test, expect, describe } from '@jest/globals';
import fs from 'fs';
import { fileURLToPath } from 'url';
import path from 'path';
import gendiff from '../src';

// eslint-disable-next-line no-underscore-dangle
const __filename = fileURLToPath(import.meta.url);
// eslint-disable-next-line no-underscore-dangle
const __dirname = path.dirname(__filename);

const formats = ['json', 'default', 'plain'];
const extensions = ['.json', '.ini', '.yaml'];

const getFixturePath = (fileName) => path.join(__dirname, '__fixtures__', fileName);

const readFixture = (format) => fs.readFileSync(getFixturePath(`${format}.txt`), 'utf-8');

const filesByExtension = extensions.map((extension) => [extension.slice(1), getFixturePath(`before${extension}`), getFixturePath(`after${extension}`)]);


describe.each(formats)('Test %s format', (format) => {
  test.each(filesByExtension)('should work with %s extensions', (_, before, after) => {
    expect(gendiff(before, after, format)).toBe(readFixture(format));
  });
});
