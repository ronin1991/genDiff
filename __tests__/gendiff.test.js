/* eslint-disable no-underscore-dangle */
import { test, expect, describe } from '@jest/globals';
import fs from 'fs';
import { fileURLToPath } from 'url';
import path from 'path';
import gendiff from '../src';


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const getFixturePath = (fileName) => path.join(__dirname, '__fixtures__', fileName);

const readFile = (format) => fs.readFileSync(getFixturePath(`${format}.txt`), 'utf-8');

const filesByExtension = (extensions) => extensions
  .map((extension) => [`${getFixturePath(`before${extension}`)}`, `${getFixturePath(`after${extension}`)}`]);

const formats = ['json', 'default', 'plain'];
const extensions = ['.json', '.ini', '.yaml'];


describe.each(formats)('Test %s format', (format) => {
  test.each(filesByExtension(extensions))('should work with %s ', (before, after) => {
    expect(gendiff(before, after, format)).toBe(readFile(format));
  });
});
