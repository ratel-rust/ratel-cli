/* global RUST_BACKTRACE, describe, it, Ratel, requireRelativePath */

const suites = requireRelativePath('contrib', 'node-compat-table-testers');
const traverse = requireRelativePath('contrib', 'traverse-suite');

describe('can parse node-compat-table-testers', () => {
  traverse(suites, (name, source) => () => {
    const instance = new Ratel();
    if (RUST_BACKTRACE) {
      process.stdout.write(`\n${source}\n`);
    }
    instance.parse(source);
  });
});

// describe('can transform node-compat-table-testers', () => {
//   traverse(suites, (name, source) => () => {
//     const instance = new Ratel();
//     if (RUST_BACKTRACE) {
//       process.stdout.write(`\n${source}\n`);
//     }
//     const output = instance.transform(source, true);
//     assert.equal(typeof output, 'string', 'Output is a string');
//   });
// });
