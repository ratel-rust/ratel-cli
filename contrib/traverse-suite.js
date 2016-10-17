/* global describe, it */

const traverse = (node, getTest, path = []) => {
  Object.keys(node).forEach((key) => {
    const ref = node[key];
    if (typeof ref === 'object') {
      return describe(key, () => traverse(ref, getTest, [...path, key]));
    }
    it(key, getTest(key, ref));
  });
};

module.exports = traverse;
