import _ from 'lodash';
import renderDefault from './formatter-default.js';
import renderPlain from './formatter-plain.js';
import renderJson from './formatter-json.js';

const formatters = {
  plain: renderPlain,
  json: renderJson,
  default: renderDefault,
};

// const getRender = (format) => {
//   if (!_.has(formatters, format)) {
//     throw new Error('no such format in the formatters');
//   }
//   return formatters[format];
// };
const render = (ast, format) => formatters[format](ast);

export default render;
