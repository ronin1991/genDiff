import _ from 'lodash';

const TAB = '  ';
const getIndent = (number) => TAB.repeat(number);

const stringify = (_value, depth) => {
  if (!_.isObject(_value)) {
    return _value;
  }

  const string = Object.entries(_value)
    .map(([key, value]) => `{\n${getIndent(depth + 3)}${key}: ${stringify(value, depth + 3)}\n${getIndent(depth + 1)}}`);

  return `${string}`;
};

const renderDefault = (ast, depth = 1) => ast
  .map((node) => {
    const getValue = (value) => `${node.key}: ${stringify(value, depth)}`;

    switch (node.type) {
      case 'added':
        return `${getIndent(depth)}+ ${getValue(node.value)}`;
      case 'deleted':
        return `${getIndent(depth)}- ${getValue(node.value)}`;
      case 'unchanged':
        return `${getIndent(depth)}  ${getValue(node.value)}`;
      case 'changed':
        return `${getIndent(depth)}- ${getValue(node.value.oldValue)}\n${getIndent(depth)}+ ${getValue(node.value.newValue)}`;
      case 'nested':
        return `${getIndent(depth)}  ${node.key}: {\n${renderDefault(node.value, depth + 2)}\n${getIndent(depth + 1)}}`;
      default:
        throw new Error('no parser for this type');
    }
  }).join('\n');


export default (ast) => `{\n${renderDefault(ast)}\n}`;
