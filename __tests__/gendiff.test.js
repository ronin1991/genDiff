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
const jsonOutJson = fs.readFileSync(getFixturePath('out.json'), 'utf-8');

const yamlOutDefault = fs.readFileSync(getFixturePath('yaml-default.txt'), 'utf-8');
const yamlOutPlain = fs.readFileSync(getFixturePath('yaml-plain.txt'), 'utf-8');
const yamlOutJson = fs.readFileSync(getFixturePath('yaml-json.json'), 'utf-8');

const iniOutDefault = fs.readFileSync(getFixturePath('ini-default.txt'), 'utf-8');
const iniOutPlain = fs.readFileSync(getFixturePath('ini-plain.txt'), 'utf-8');
const iniOutJson = fs.readFileSync(getFixturePath('ini-json.json'), 'utf-8');


test('JSON outDefault', () => {
  expect(gendiff(firstJson, secondJson, 'default')).toEqual(jsonOutDefault);
});
test('JSON outPlain', () => {
  expect(gendiff(firstJson, secondJson, 'plain')).toEqual(jsonOutPlain);
});
test('JSON outJson', () => {
  expect(gendiff(firstJson, secondJson, 'json')).toEqual(jsonOutJson);
});

test('yaml outDefault', () => {
  expect(gendiff(firstYaml, secondYaml, 'default')).toEqual(yamlOutDefault);
});
test('yaml outPlain', () => {
  expect(gendiff(firstYaml, secondYaml, 'plain')).toEqual(yamlOutPlain);
});
test('yaml outJson', () => {
  expect(gendiff(firstYaml, secondYaml, 'json')).toEqual(yamlOutJson);
});

test('ini outDefault', () => {
  expect(gendiff(firstIni, secondIni, 'default')).toEqual(iniOutDefault);
});
test('ini outPlain', () => {
  expect(gendiff(firstIni, secondIni, 'plain')).toEqual(iniOutPlain);
});
test('ini outJson', () => {
  expect(gendiff(firstIni, secondIni, 'json')).toEqual(iniOutJson);
});
