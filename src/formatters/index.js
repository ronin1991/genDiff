import renderDefault from './formatter-pretty.js';
import renderPlain from './formatter-plain.js';
import renderJson from './formatter-json.js';

const formatters = {
  plain: renderPlain,
  json: renderJson,
  default: renderDefault,
};

const render = (ast, format) => formatters[format](ast);

export default render;
