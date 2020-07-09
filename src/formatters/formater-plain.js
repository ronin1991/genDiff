
const types = {
  nested: (e, acc, key, render) => {
    const name = (key) ? `${key}.${e.name}` : e.name;
    return `${acc}${render(e.value, name)}`;
  },
  added: (e, acc, key) => {
    const value = (e.value instanceof Object) ? '[complex value]' : `${e.value}`;
    return (key) ? `${acc}\nProperty '${key}.${e.name}' was added with value: '${value}'`
      : `${acc}\nProperty '${e.name}' was added with value: ${value}`;
  },
  deleted: (e, acc, key) => {
    const result = (key) ? `${acc}Property '${key}.${e.name}' was deleted`
      : `${acc}\nProperty '${e.name}' was deleted`;
    return result;
  },
  changed: (e, acc, key) => {
    const value1 = (e.value[0] instanceof Object) ? '[complex value]' : e.value[0];
    const value2 = (e.value[1] instanceof Object) ? '[complex value]' : e.value[1];
    return (key) ? `${acc}\nProperty '${key}.${e.name}' was changed from '${value1}' to '${value2}'`
      : `${acc}\nProperty '${e.name}' was changed from '${value1}' to '${value2}'`;
  },
  notModified: (e, acc) => `${acc}`,
};

const renderPlain = (ast) => {
  const render = (data, key) => data.reduce((acc, e) => {
    const formater = types[e.type];
    return formater(e, acc, key, render);
  }, '');
  return render(ast).trim();
};


export default renderPlain;
