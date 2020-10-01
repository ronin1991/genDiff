const stringify = (value) => {
  switch (typeof value) {
    case 'object':
      return '[complex value]';
    case 'string':
      return `'${value}'`;
    default:
      return value;
  }
};

const renderPlain = (ast, property = '') => ast
  .map((node) => {
    const newProperty = property === '' ? node.key : `${property}.${node.key}`;
    switch (node.type) {
      case 'added':
        return `Property '${newProperty}' was added with value: ${stringify(node.value)}`;
      case 'deleted':
        return `Property '${newProperty}' was deleted`;
      case 'nested':
        return renderPlain(node.children, newProperty);
      case 'changed':
        return `Property '${newProperty}' was changed from ${stringify(node.value.oldValue)} to ${stringify(node.value.newValue)}`;
      case 'unchanged':
        return null;
      default:
        throw new Error(`Invalid status '${node.status}'. Please check!`);
    }
  })
  .filter((node) => node !== null)
  .join('\n');

export default (ast) => renderPlain(ast);
