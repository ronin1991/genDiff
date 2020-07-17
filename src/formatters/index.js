import _ from 'lodash';
import renderDefault from './formatter-default.js';
import renderPlain from './formatter-plain.js';
import renderJson from './formatter-json.js';

const formatList = {
  plain: renderPlain,
  json: renderJson,
  default: renderDefault,
};

const getRender = (format) => {
  if (!_.has(formatList, format)) {
    throw new Error('no such format in the formatList');
  }
  return formatList[format];
};

export default getRender;
