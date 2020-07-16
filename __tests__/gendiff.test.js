/* eslint-disable no-underscore-dangle */
import { test, expect } from '@jest/globals';
import fs from 'fs';
import { fileURLToPath } from 'url';
import path from 'path';
import gendiff from '../src';


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


const getFixturePath = (fileName) => path.join(__dirname, '__fixtures__', fileName);


const firstJson = getFixturePath('first.json');
const secondJson = getFixturePath('second.json');


const firstYaml = getFixturePath('first.yaml');
const secondYaml = getFixturePath('second.yaml');

const firstIni = getFixturePath('first.ini');
const secondIni = getFixturePath('second.ini');


const outDefault = fs.readFileSync(getFixturePath('default.txt'), 'utf-8');
const outPlain = fs.readFileSync(getFixturePath('plain.txt'), 'utf-8');
const outJson = fs.readFileSync(getFixturePath('out.txt'), 'utf-8');

test.each([
  [firstJson, secondJson, outDefault],
  [firstYaml, secondYaml, outDefault],
  [firstIni, secondIni, outDefault],
])('outDefault(%s, %s)', (firstFile, secondFile, expected) => {
  expect(gendiff(firstFile, secondFile, 'default')).toBe(expected);
});


test.each([
  [firstJson, secondJson, outPlain],
  [firstYaml, secondYaml, outPlain],
  [firstIni, secondIni, outPlain],
])('outIni(%s, %s)', (firstFile, secondFile, expected) => {
  expect(gendiff(firstFile, secondFile, 'plain')).toBe(expected);
});

test.each([
  [firstJson, secondJson, outJson],
  [firstYaml, secondYaml, outJson],
  [firstIni, secondIni, outJson],
])('outJson(%s, %s)', (firstFile, secondFile, expected) => {
  expect(gendiff(firstFile, secondFile, 'json')).toBe(expected);
});

// describe.each(formats)('Test %s format', (format) => {
//   it.each(filesByExtension)('should work with %s extension', (_, before, after) => {}}))
