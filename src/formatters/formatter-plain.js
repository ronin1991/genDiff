import _ from 'lodash';

const types = {
  nested: (node, acc, objName, render) => {
    const name = (objName) ? `${objName}.${node.name}` : node.name;
    return `${acc}${render(node.value, name)}`;
  },
  added: (node, acc, objName) => {
    const value = (_.isObject(node.value)) ? '[complex value]' : `${node.value}`;
    return (objName) ? `${acc}\nProperty '${objName}.${node.name}' was added with value: '${value}'`
      : `${acc}\nProperty '${node.name}' was added with value: ${value}`;
  },
  deleted: (node, acc, objName) => {
    const result = (objName) ? `${acc}Property '${objName}.${node.name}' was deleted`
      : `${acc}\nProperty '${node.name}' was deleted`;
    return result;
  },
  changed: (node, acc, objName) => {
    const value1 = (_.isObject(node.value.oldValue)) ? '[complex value]' : node.value.oldValue;
    const value2 = (_.isObject(node.value.newValue)) ? '[complex value]' : node.value.newValue;
    return (objName) ? `${acc}\nProperty '${objName}.${node.name}' was changed from '${value1}' to '${value2}'`
      : `${acc}\nProperty '${node.name}' was changed from '${value1}' to '${value2}'`;
  },
  unchanged: (e, acc) => `${acc}`,
};

const renderPlain = (ast) => {
  const render = (data, objName) => data.reduce((acc, node) => {
    const process = types[node.type];
    return process(node, acc, objName, render);
  }, '');
  return render(ast).trim();
};


export default renderPlain;
