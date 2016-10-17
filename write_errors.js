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
const mkdirp = require('mkdirp');
const rimraf = require('rimraf');

const outputDir = basePath.bind(path, 'fails');
const suites = requireRelativePath('contrib', 'node-compat-table-testers');
const slugMe = (value) => value
                          .toLowerCase()
                          .replace(/\s+/g, '-')
                          .replace(/[^a-z0-9-]/g, '')
                          .replace(/\-{2,}/g,'-');

let index = 0;
let succeeded = 0;
let failed = 0;

rimraf.sync(outputDir('*.js'));
mkdirp.sync(outputDir());

const formatError = (path, source, message) => {
  const number = ("00000" + index).slice(-5);
  const filename = outputDir(`${number}-${slugMe(path.join('-'))}.js`);
  fs.writeFileSync(filename, `/* ${message}*/\n\n${source}\n`);
  ++index;
};

let dent = 0;

const traverse = (node, path = []) => {
  ++dent;
  Object.keys(node).forEach((name) => {
    const source = node[name];
    const indent = new Array(dent + 1).join('  ');
    if (typeof source === 'object') {
      process.stdout.write(`${indent} ${name}\n`);
      return traverse(source, [...path, name]);
    }
    const intendedName = path[path.length - 1];
    const instance = new Ratel();
    try {
      instance.parse(source);
      ++succeeded;
    } catch (e) {
      formatError(path, source, e);
      ++failed;
      process.stdout.write(indent);
      process.stdout.write(`✗ ${name}\n`);
    }
  });
  --dent;
};

traverse(suites);

console.log(`\n${succeeded + failed} total, ${succeeded} succeeded, ${failed} failed`);
