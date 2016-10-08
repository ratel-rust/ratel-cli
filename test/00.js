const path = require('path');
const assert = require('assert');
const basePath = path.join.bind(path, __dirname, '..');

global.assert = assert;
global.basePath = basePath;
global.path = path;
global.requireRelativePath = (...path) => require(global.basePath(...path));

global.Badger = global.requireRelativePath('.');
global.RUST_BACKTRACE = process.env.RUST_BACKTRACE;
