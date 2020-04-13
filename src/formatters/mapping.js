import renderDefalt from './formater-defalt';
import renderPlain from './formater-plain';
import renderJson from './formater-json';

const mapping = {
  plain: (ast) => `${renderPlain(ast)}`,
  json: (ast) => `${renderJson(ast)}`,
  undefined: (ast) => `{${renderDefalt(ast)}\n}`,
};

export default mapping;
