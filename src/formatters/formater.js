import renderDefalt from './formater-defolt';
import renderPlain from './formater-plain';
import renderJson from './formater-json';

const formater = (ast, format) => {
  if (format === undefined) {
    return `{${renderDefalt(ast)}\n}`;
  }
  if (format === 'plain') {
    return `${renderPlain(ast)}`;
  }
  if (format === 'json') {
    return `${renderJson(ast)}`;
  }
};

export default formater;
