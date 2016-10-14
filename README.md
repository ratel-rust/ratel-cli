# ratel

A command-line interface for [ratel-core](https://github.com/ratel-rust/ratel-core), a JavaScript compiler core written in Rust.

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

## Running the tests

Recompiles ratel and runs all tests using [Mocha](https://mochajs.org).

The test suite is using [node.green](http://node.green/)'s compat-table which
features ES2015, ES2016 and ES2017 examples.

````bash
$ npm test
````

## Development

Execute ``make`` in the project directory. Please also refer to the scripts
section of ``package.json``.

In case you want to work on a local copy of [ratel-core](https://github.com/ratel-rust),
add the following lines to ``native/Cargo.toml``:

````
[dependencies.ratel]
path = "../../ratel"
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