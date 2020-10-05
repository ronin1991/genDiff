import _ from 'lodash';

const TAB = '    ';
const getIndent = (number) => TAB.repeat(number);

const stringify = (nodeValue, depth) => {
  if (!_.isObject(nodeValue)) {
    return nodeValue;
  }

  const string = Object.entries(nodeValue)
    .map(([key, value]) => `{\n${getIndent(depth + 1)}${key}: ${stringify(value, depth + 1)}\n${getIndent(depth)}}`);

  return string;
};

const renderDefault = (ast, depth = 0) => ast
  .map((node) => {
    const prepareFormattedResult = (key, value) => `${key}: ${stringify(value, depth + 1)}`;
    const indent = getIndent(depth);

    switch (node.type) {
      case 'added':
        return `${indent}  + ${prepareFormattedResult(node.key, node.value)}`;
      case 'deleted':
        return `${indent}  - ${prepareFormattedResult(node.key, node.value)}`;
      case 'unchanged':
        return `${indent}    ${prepareFormattedResult(node.key, node.value)}`;
      case 'changed':
        return `${indent}  - ${prepareFormattedResult(node.key, node.oldValue)}\n${indent}  + ${prepareFormattedResult(node.key, node.newValue)}`;
      case 'nested':
        return `${indent}    ${node.key}: {\n${renderDefault(node.children, depth + 1)}\n${getIndent(depth + 1)}}`;
      default:
        throw new Error(`no parser for this ${node.type}`);
    }
  }).join('\n');


export default (ast) => `{\n${renderDefault(ast)}\n}`;
