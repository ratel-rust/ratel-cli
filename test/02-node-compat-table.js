/* global RUST_BACKTRACE, describe, it, Ratel, requireRelativePath */

describe('can parse node-compat-table-testers', () => {
  const testers = requireRelativePath('contrib', 'node-compat-table-testers.json');
  Object.keys(testers).forEach((suiteName) => {
    const tests = testers[suiteName];
    const suite = () => {
      Object.keys(tests)
      .map((description) => ({
        description,
        source: tests[description]
      }))
      .forEach((test) => {
        it(test.description, () => {
          const instance = new Ratel();
          const source = `${test.source}\n`;
          if (RUST_BACKTRACE) {
            process.stdout.write(`\n${source}\n`);
          }
          instance.parse(source);
        });
      });
    };

    describe(suiteName, suite);
  });
});

// Disabled (for now)

// describe('can transform node-compat-table-testers', () => {
//   const testers = requireRelativePath('contrib', 'node-compat-table-testers.json');
//   Object.keys(testers).forEach((suiteName) => {
//     const tests = testers[suiteName];
//     const suite = () => {
//       Object.keys(tests)
//       .map((description) => ({
//         description,
//         source: tests[description]
//       }))
//       .forEach((test) => {
//         it(test.description, () => {
//           const instance = new Ratel();
//           const source = `${test.source}\n`;
//           if (RUST_BACKTRACE) {
//             process.stdout.write(`\n${source}\n`);
//           }
//           instance.transform(source);
//         });
//       });
//     };

//     describe(suiteName, suite);
//   });
// });
