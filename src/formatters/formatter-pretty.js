import _ from 'lodash';

const TAB = '  ';
const getIndent = (number) => TAB.repeat(number);

const stringify = (nodeValue, depth) => {
  if (!_.isObject(nodeValue)) {
    return nodeValue;
  }

  const string = Object.entries(nodeValue)
    .map(([key, value]) => `{\n${getIndent(depth + 3)}${key}: ${stringify(value, depth + 3)}\n${getIndent(depth + 1)}}`);

  return string;
};

const renderDefault = (ast, depth = 1) => ast
  .map((node) => {
    const getValue = (value) => `${node.key}: ${stringify(value, depth)}`;
    const indent = getIndent(depth);

    switch (node.type) {
      case 'added':
        return `${indent}+ ${getValue(node.value)}`;
      case 'deleted':
        return `${indent}- ${getValue(node.value)}`;
      case 'unchanged':
        return `${indent}  ${getValue(node.value)}`;
      case 'changed':
        return `${indent}- ${getValue(node.value.oldValue)}\n${indent}+ ${getValue(node.value.newValue)}`;
      case 'nested':
        return `${indent}  ${node.key}: {\n${renderDefault(node.children, depth + 2)}\n${getIndent(depth + 1)}}`;
      default:
        throw new Error(`no parser for this ${node.type}`);
    }
  }).join('\n');


export default (ast) => `{\n${renderDefault(ast)}\n}`;
