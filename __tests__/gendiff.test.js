/* eslint-disable no-underscore-dangle */
import fs from 'fs';
import { fileURLToPath } from 'url';
import path from 'path';
import gendiff from '../src';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

let outDefault;
let outPlain;
let outJson;
let outYaml;
let outIni;

const getFixturePath = (fileName) => path.join(__dirname, '__fixtures__', fileName);
console.log(__dirname);

const firstJson = getFixturePath('first.json');
const secondJson = getFixturePath('second.json');

const firstYaml = getFixturePath('first.yaml');
const secondYaml = getFixturePath('second.yaml');

const firstIni = getFixturePath('first.ini');
const secondIni = getFixturePath('second.ini');


beforeAll(() => {
  outDefault = fs.readFileSync(getFixturePath('json.txt'), 'utf-8');
  outPlain = fs.readFileSync(getFixturePath('plain.txt'), 'utf-8');
  outJson = fs.readFileSync(getFixturePath('test-json.txt'), 'utf-8');
  outPlain = fs.readFileSync(getFixturePath('plain.txt'), 'utf-8');
  outYaml = fs.readFileSync(getFixturePath('yaml.txt'), 'utf-8');
  outIni = fs.readFileSync(getFixturePath('ini.txt'), 'utf-8');
});

test('out default', () => {
  expect(gendiff(firstJson, secondJson, 'default')).toEqual(outDefault);
});

test('out plain', () => {
  expect(gendiff(firstJson, secondJson, 'plain')).toEqual(outPlain);
});
test('out json', () => {
  expect(gendiff(firstJson, secondJson, 'json')).toEqual(outJson);
});
test('out ini', () => {
  expect(gendiff(firstIni, secondIni, 'ini')).toEqual(outIni);
});

test('out yaml', () => {
  expect(gendiff(firstYaml, secondYaml, 'yaml')).toEqual(outYaml);
});
