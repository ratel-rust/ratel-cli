const Package = require('../package.json');
const fs = require('fs');

const USAGE = `Usage:
ratel-cli [options]
ratel-cli --version

Options:
  -h --help                       Show this screen.
  --version                       Show version.
  -e STRING, --string=STRING      Specifies an input string.
  -f FILE, --file=FILE            Specifies the input file.
  -o FILE, --output=FILE          Specifies the output file.
  --pretty                        Don't minify the output.
  --ast                           Print out the Abstract Syntax Tree of the input.

`;

/**
 * @class Ratel
 */
class Ratel {
  /**
   * @constructor
   */
  constructor () {
    const ratel = require('../native');
    this.ratel = ratel;
    this.parse = ratel.parse.bind(ratel);
    this.transform = ratel.transform.bind(ratel.parse);
  }

  /**
   * Returns a string containing the application's version.
   * @method getVersion
   * @returns {string}
   */
  getVersion () { return (`${Package.name} ${Package.version}\n`); }

  /**
   * Returns a string containing usage information.
   * @method getUsage
   * @returns {string}
   */
  getUsage () { return USAGE; }

  /**
   * Transpiles the given input, returns optionally a string.
   * @method process
   * @param {object} options
   * @returns {string|undefined}
   */
  process (options) {
    if (typeof options.file !== 'string' && typeof options.string !== 'string') {
      throw new Error('Expected a file or a string.');
    }

    const inputString = typeof options.file === 'string' ? fs.readFileSync(options.file).toString('utf8') : options.string;

    let out = null;

    if (options.ast) {
      out = this.parse(inputString + '\n');
    } else {
      out = this.transform(inputString, options.pretty);
    }

    if (typeof options.output === 'string') {
      fs.writeFileSync(options.output, out);
    } else {
      return out;
    }
  }
}

module.exports = Ratel;

