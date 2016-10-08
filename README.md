# honey-badger-cli

A command-line interface for [HoneyBadger](https://github.com/HoneyBadger-rust),
a WIP ES2015+ to ES5 transpiler + bundler + minifier in Rust.

## Usage

````bash
honey-badger-cli [options]
honey-badger-cli --version

Options:
  -h --help                       Show this screen.
  --version                       Show version.
  -e STRING, --string=STRING      Specifies an input string.
  -f FILE, --file=FILE            Specifies the input file.
  -o FILE, --output=FILE          Specifies the output file.
  --pretty                        Don't minify the output.
  --ast                           Print out the Abstract Syntax Tree of the input.

````

## Installing as cli executable

You can install the executable globally from NPM using
``npm install -g honey-badger-cli`` or by executing ``npm link`` in the project
directory.

## Running the tests

Recompiles HoneyBadger and runs all tests using [Mocha](https://mochajs.org).

The test suite is using [node.green](http://node.green/)'s compat-table which
features ES2015, ES2016 and ES2017 examples.

````bash
$ npm test
````

## Development

Execute ``make`` in the project directory. Please also refer to the scripts
section of ``package.json``.

In case you want to work on a local copy of [HoneyBadger](https://github.com/HoneyBadger-rust),
add the following lines to ``native/Cargo.toml``:

````
[dependencies.badger]
path = "../../HoneyBadger"
````

## Programmatic usage

````js
import Badger from 'honey-badger-cli';
const instance = new Badger();

````
### instance.printVersion()

Returns a string containing the application's version.

### instance.printUsage()

Returns a string containing usage information.

### instance.process(*Object* options)

Transpiles the given input, returns optionally a string.

*options* is an object which can take the following values:

| key    | type    | purpose                     |
|--------|---------|-----------------------------|
| file   | String  | Input path.                 |
| ast    | Boolean | Whether to return the AST.  |
| output | String  | Output path.                |
| string | String  | Input string.               |

### instance.badger

Allows access to the rust module implementing the following methods:

#### instance.badger.transform(*String* string, *Boolean* minify)

Returns a string.

Transforms the given input string into ES5 code.
When *minify* is set to true, the output string will be minified.

#### instance.badger.parse(*String* string)

Returns a *String* with the AST of the given input string.

## Changelog

0.0.2

  - Updating to HoneyBadger 0.2.0
  - Updating documentation
  - Adding -e/--string to provide a string
  - Adding stand-alone executable
  - Adding unit tests
  - Adding tests from [node.green](http://node.green/)'s compat-table
  - improved API

## Licenses

- MIT
- Apache License Version 2.0