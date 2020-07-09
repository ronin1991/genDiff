const stringify = (value, lvl, fn) => {
  if (Array.isArray(value)) {
    return `${fn(value, lvl + 4)}`;
  }
  if (value instanceof Object) {
    const keys = Object.keys(value);
    const val = Object.values(value);
    return `{\n${' '.repeat(lvl + 7)}${keys}: ${val}\n${' '.repeat(lvl + 3)}}`;
  }
  return value;
};

const renderDefault = (ast) => {
  const iter = (data, lvl = 1) => {
    const result = data.reduce((acc, e) => {
      const tab = ' '.repeat(lvl + 1);
      const { type, name, value } = e;

      switch (type) {
        case 'added':
          return `${acc}\n${tab}+ ${name}: ${stringify(value, lvl, iter)}`;
        case 'deleted':
          return `${acc}\n${tab}- ${name}: ${stringify(value, lvl, iter)}`;
        case 'notModified':
          return `${acc}\n${tab}  ${name}: ${stringify(value, lvl, iter)}`;
        case 'changed':
          return `${acc}\n${tab}- ${name}: ${stringify(value[0], lvl, iter)}\n${tab}+ ${name}: ${stringify(value[1], lvl, iter)}`;
        case 'nested':
          return `${acc}\n${tab}  ${name}: {${stringify(value, lvl, iter)}\n  ${tab}}`;
        default:
          throw new Error('no parser for this type');
      }
    }, '');
    return result;
  };
  return `{${iter(ast)}\n}`;
};


export default renderDefault;
