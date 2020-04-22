import _ from 'lodash';
import renderDefault from './formater-default';
import renderPlain from './formater-plain';
import renderJson from './formater-json';

const formatList = {
  plain: (ast) => `${renderPlain(ast)}`,
  json: (ast) => `${renderJson(ast)}`,
  default: (ast) => `{${renderDefault(ast)}\n}`,
};

const mapping = (format) => {
  if (!_.has(formatList, format)) {
    console.error('no such format in the formatList');
  }
  return formatList[format];
};

export default mapping;
