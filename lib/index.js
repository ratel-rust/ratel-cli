const Package = require('../package.json');
const badger = require('../native');
const argv = require('minimist')((process.argv.slice(2)));
const fs = require('fs');

/**
 * @class hbCli
 */

class hbCli {
  /**
   * @constructor
   */
  constructor () {
    const options = {
      help: argv.h || argv.help,
      file: argv.f || argv.file,
      output: argv.o || argv.output,
      version: !!(argv.version || argv.v),
      pretty: !!argv.pretty,
      ast: !!argv.ast
    };

    if (options.help) {
      return this.printUsage();
    }

    if (options.version) {
      return this.printVersion();
    }

    if (options.file) {
      return this.process(options);
    }

    this.printUsage();
  }

  /**
   * @method printVersion
   */
  printVersion () {
    console.log(`${Package.name} ${Package.version}`);
    process.exit(0);
  }

  /**
   * @method printUsage
   */

  printUsage () {
    const USAGE = `Usage:
honey-badger-cli [options]
honey-badger-cli --version

Options:
  -h --help                 Show this screen.
  --version                 Show version.
  -f FILE, --file=FILE      Specifies the input file.
  -o FILE, --output=FILE    Specifies the output file.
  --pretty                  Don't minify the output.
  --ast                     Print out the Abstract Syntax Tree of the input.

`;
    process.stdout.write(USAGE);
    process.exit(0);
  }

  /**
   * @method process
   * @param {object} options
   */

  process (options) {
    if (typeof options.file !== 'string') {
      throw new Error(`Expected a file`);
    }

    const inputString = fs.readFileSync(options.file).toString('utf8');

    if (options.ast) {
      badger.parse(inputString);
      process.exit();
    }

    const out = badger.transform(inputString, options.pretty);

    if (typeof options.output === 'string') {
      fs.writeFileSync(options.output, out);
    } else {
      process.stdout.write(out);
    }
  }
}

new hbCli();
