import _ from 'lodash';
import renderDefault from './formater-default';
import renderPlain from './formater-plain';
import renderJson from './formater-json';

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
