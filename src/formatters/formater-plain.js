const types = {
  nested: (e, acc, objName, fn) => {
    const name = (objName) ? `${objName}.${e.name}` : e.name;
    return `${acc}${fn(e.children, name)}`;
  },
  addKey: (e, acc, objName) => {
    const value = (e.value instanceof Object) ? '[complex value]' : `${e.value}`;
    return (objName) ? `${acc}\nProperty '${objName}.${e.name}' was added with value: '${value}'`
      : `${acc}\nProperty '${e.name}' was added with value: ${value}`;
  },
  deletedKey: (e, acc, objName) => {
    const result = (objName) ? `${acc}Property '${objName}.${e.name}' was deleted`
      : `${acc}\nProperty '${e.name}' was deleted`;
    return result;
  },
  changeValue: (e, acc, objName) => {
    const value1 = (e.value[0] instanceof Object) ? '[complex value]' : e.value[0];
    const value2 = (e.value[1] instanceof Object) ? '[complex value]' : e.value[1];
    return (objName) ? `${acc}\nProperty '${objName}.${e.name}' was changed from '${value1}' to '${value2}'`
      : `${acc}\nProperty '${e.name}' was changed from '${value1}' to '${value2}'`;
  },
  notChange: (e, acc) => `${acc}`,
};


const renderPlain = (data, objName) => data.reduce((acc, e) => {
  const process = types[e.type];
  return process(e, acc, objName, renderPlain);
}, '');


export default renderPlain;
