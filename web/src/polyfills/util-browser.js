import * as nodeUtil from 'util/util.js';
import inherits from 'inherits';

const util = nodeUtil.default || nodeUtil;

if (typeof util.inherits !== 'function') {
  util.inherits = inherits;
}

if (!('default' in nodeUtil)) {
  util.default = util;
}

export default util;
export * from 'util/util.js';
export { inherits };
