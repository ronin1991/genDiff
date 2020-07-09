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


const jsonOutDefault = fs.readFileSync(getFixturePath('json-default.txt'), 'utf-8');
const jsonOutPlain = fs.readFileSync(getFixturePath('json-plain.txt'), 'utf-8');
const jsonOut = fs.readFileSync(getFixturePath('out.json'), 'utf-8');

const yamlOutDefault = fs.readFileSync(getFixturePath('yaml-default.txt'), 'utf-8');
const yamlOutPlain = fs.readFileSync(getFixturePath('yaml-plain.txt'), 'utf-8');
const yamlOutJson = fs.readFileSync(getFixturePath('yaml-json.json'), 'utf-8');

const iniOutDefault = fs.readFileSync(getFixturePath('ini-default.txt'), 'utf-8');
const iniOutPlain = fs.readFileSync(getFixturePath('ini-plain.txt'), 'utf-8');
const iniOutJson = fs.readFileSync(getFixturePath('ini-json.json'), 'utf-8');


test.each([
  [firstJson, secondJson, jsonOutDefault],
  [firstYaml, secondYaml, yamlOutDefault],
  [firstIni, secondIni, iniOutDefault],
])('outDefault(%s, %s)', (firstFile, secondFile, expected) => {
  expect(gendiff(firstFile, secondFile, 'default')).toBe(expected);
});

test.each([
  [firstJson, secondJson, jsonOutPlain],
  [firstYaml, secondYaml, yamlOutPlain],
  [firstIni, secondIni, iniOutPlain],
])('outIni(%s, %s)', (firstFile, secondFile, expected) => {
  expect(gendiff(firstFile, secondFile, 'plain')).toBe(expected);
});

test.each([
  [firstJson, secondJson, jsonOut],
  [firstYaml, secondYaml, yamlOutJson],
  [firstIni, secondIni, iniOutJson],
])('outJson(%s, %s)', (firstFile, secondFile, expected) => {
  expect(gendiff(firstFile, secondFile, 'json')).toBe(expected);
});
