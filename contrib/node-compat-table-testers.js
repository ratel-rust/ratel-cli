const testers = require('./node-compat-table-testers.json');
const RGX_SUITE = /\›/g;
let suites = {};

Object.keys(testers).forEach((suiteName) => {
  const tests = testers[suiteName];
  suites[suiteName] = suites[suiteName] || {};
  Object.keys(tests).forEach((description) => {
    let ref = suites[suiteName];
    const path = description.split(RGX_SUITE);
    const source = tests[description];
    let label = null;
    for (var i = 0; i < path.length; i++) {
      label = path[i];
      ref[label] = ref[label] || {};
      if (typeof ref[label] === 'string') {
        const oldTest = ref[label];
        ref[label] = {
          [label]: oldTest
        };
      }
      if (i === path.length - 1) {
        ref[label] = source;
      } else {
        ref = ref[label];
      }
    }
  });
});

module.exports = suites;
