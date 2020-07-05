
const renderYaml = (data) => {
  const result = data.reduce((acc, node) => {
    const { type, name, value } = node;
    switch (type) {
      case 'added':
        return `${acc}\n  + ${name}: ${value}`;
      case 'changed':
        return `${acc}\n  - ${name}: ${value[0]}\n  + ${name}: ${value[0]}`;
      case 'deleted':
        return `${acc}\n  - ${name}: ${value}`;
      case 'notModified':
        return `${acc}\n    ${name}: ${value}`;
      default:
        throw new Error('not type');
    }
  }, '');
  return `{${result}\n}`;
};

export default renderYaml;
