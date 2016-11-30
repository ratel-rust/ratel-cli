![Ratel](http://maciej.codes/things/ratel-400.png)

# ratel

[![Travis CI](https://travis-ci.org/ratel-rust/ratel-cli.svg)](https://travis-ci.org/ratel-rust/ratel-cli)

A command-line interface for [ratel-core](https://github.com/ratel-rust/ratel-core), a JavaScript to JavaScript compiler written in Rust.

## Usage

````bash
ratel [options]
ratel --version

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
``npm install -g ratel`` or by executing ``npm link`` in the project
directory.

## Development

### Running the tests

Runs all tests using [Mocha](https://mochajs.org).

The test suite is using [node.green](http://node.green/)'s compat-table which
features ES2015, ES2016 and ES2017 examples.

````bash
$ npm test
````

Additionally, you can execute ``make`` in the project directory in order to
validate the source code. Please also refer to the ``scripts`` section of
``package.json`` for further options.

Currently, ratel-core is provided as git submodule for development purposes.

### compat-table tests

Run the following command to execute all bundled tests and write the original
sources, errors and results to the ``results`` directory:

````bash
$ node write_errors.js
````

## API

````js
import Ratel from 'ratel';
const instance = new Ratel();

````
### instance.getVersion()

Returns a string containing the application's version.

### instance.getUsage()

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

### instance.ratel

Reference to the rust module implementing the following methods:

#### instance.transform(*String* string, *Boolean* minify)

Returns a string.

Transforms the given input string into ES5 code.
When *minify* is set to true, the output string will be minified.

#### instance.parse(*String* string)

Returns a *String* with the AST of the given input string.

## Changelog

0.0.6

  - Ensuring trailing newlines

0.0.5

  - Updating tests
  - Removing compat-table transform tests (for now)
  - Adding tests for transform, pretty printing
  - Writing original sources, errors and results in write_errors

0.0.4

  - Renaming to ratel
  - Updating to ratel-core 0.2.3
  - Updating documentation
  - Updating project dependencies

0.0.3

  - Updating to HoneyBadger 0.2.1
  - Updating documentation
  - Ensuring a trailing newline using -e/--string

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
