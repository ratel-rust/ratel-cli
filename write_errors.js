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
const resultsDir = basePath.bind(path, 'results');
const failDir = resultsDir.bind(path, 'fails');
const ouputDir = resultsDir.bind(path, 'output');
const jsSourceDir = resultsDir.bind(path, 'source');
const suites = requireRelativePath('contrib', 'node-compat-table-testers');

const slug = (value) => {
  return value
    .replace(/([a-z](?=[A-Z]))/g, '$1-')
    .replace(/(\s|\.)+/g, '-')
    .toLowerCase()
    .replace(/[^a-z0-9-]/g, '')
    .replace(/\-{2,}/g,'-');
}

let index = 0;
let succeeded = 0;
let failed = 0;

rimraf.sync(resultsDir());

mkdirp.sync(failDir());
mkdirp.sync(ouputDir());
mkdirp.sync(jsSourceDir());

const getWrite = (dirFn, add) => (descriptionPath, source) => {
  const number = ("00000" + index).slice(-5);
  const filename = dirFn(`${number}-${slug(descriptionPath.join('-'))}.js`);
  fs.writeFileSync(filename, source);
};

const pad = (index) => ("00000" + index).slice(-5);

const writeError = (descriptionPath, source, message) => {
  const number = pad(index);
  const filename = failDir(`${number}-${slug(descriptionPath.join('-'))}.js`);
  fs.writeFileSync(filename, `/* ${message}*/\n\n${source}\n`);
};

const writeResult = getWrite(ouputDir);
const writeSource = getWrite(jsSourceDir, false);

let dent = 0;

const instance = new Ratel();
const colors = require('colors/safe');
const printLine = (dent, name, error, color) => {
  const indent = new Array(dent + 1).join('  ');
  const colorFn = color ? (str) => colors[color](str) : str => str;
  let parts = [];
  let errorChar = '';
  if (typeof error !== 'undefined') {
    errorChar = error ? '✗ ' : '✓ ';
    if (error) {
      name = colorFn(name);
    } else {
      name = colors.grey(name);
    }
  }
  const str = `${indent}${colorFn(errorChar)}${name}\n`
  process.stdout.write(str);

};

const traverse = (node, descriptionPath = []) => {
  ++dent;
  Object.keys(node).forEach((name) => {
    const source = node[name];
    if (typeof source === 'object') {
      process.stdout.write(`${new Array(dent + 1).join('  ')}${name}\n`)
      return traverse(source, [...descriptionPath, name]);
    }
    ++index;
    writeSource([...descriptionPath, name], source);
    try {
      const result = instance.transform(source, false);
      writeResult([...descriptionPath, name], result);
      printLine(dent, `${pad(index)}: ${name}`, 0, 'green');
      ++succeeded;
    } catch (e) {
      writeError([...descriptionPath, name], source, e);
      ++failed;
      printLine(dent, `${pad(index)}: ${name}`, 1, 'red');
    }
  });
  --dent;
};

traverse(suites);

console.log(`\n${succeeded + failed} total, ${succeeded} succeeded, ${failed} failed`);
