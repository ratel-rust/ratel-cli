/**
 * This is a temporary development utility which runs all
 * node-compat-table-testers tests and writes reports into the "fails" dir.
 */

const path = require('path');
const fs = require('fs');
const assert = require('assert');
const basePath = path.join.bind(path, __dirname);

const requireRelativePath = (...path) => require(basePath(...path));

const Ratel = requireRelativePath('.');

const outputDir = basePath.bind(path, 'fails');
const mkdirp = require('mkdirp');
const rimraf = require('rimraf');

let index = 0;
let succeeded = 0;
let failed = 0;

rimraf.sync(outputDir('*.js'));
mkdirp.sync(outputDir());

const formatError = (description, source, message) => {
  const number = ("00000" + index).slice(-5);
  const filename = outputDir(`error-${number}.js`);

  const buf = `/*
${message}
*/

${source}
`;

  fs.writeFileSync(filename, buf);

  ++index;

};

const testers = requireRelativePath('contrib', 'node-compat-table-testers.json');

Object.keys(testers).forEach((suiteName) => {
  const tests = testers[suiteName];
  Object.keys(tests)
  .map((description) => ({
    description,
    source: tests[description]
  }))
  .forEach((test) => {
    const instance = new Ratel();
    const source = `${test.source}\n`;
    try {
      instance.parse(source);
      ++succeeded;
    } catch (e) {
      formatError(test.description, test.source, e);
      ++failed;
    }
  });
});

console.log(`${succeeded + failed} run, ${succeeded} succeeded, ${failed} failed`);
