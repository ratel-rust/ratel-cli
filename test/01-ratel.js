/* global assert, describe, it, Ratel */

const EXPRESSION = '2**2;\n';
const EXPECTED_OUTPUT = 'Math.pow(2,2);';

// ratel returns Number for integers

const EXPECTED_AST = `[
    Expression {
        value: Binary {
            parenthesized: false,
            operator: Exponent,
            left: Literal(
                Number(
                    "2"
                )
            ),
            right: Literal(
                Number(
                    "2"
                )
            )
        }
    }
]`;

describe('Ratel', () => {
  it('is a function', () => {
    assert.equal(typeof Ratel, 'function');
  });

  it('initializes an instance', () => {
    const instance = new Ratel();
    assert.ok(instance);
    assert.equal(typeof instance.ratel, 'object', 'has reference to registered neon modules');
    assert.equal(typeof instance.transform, 'function', 'has transform');
    assert.equal(typeof instance.parse, 'function', 'has parse');
  });

  it('parse', () => {
    const instance = new Ratel();
    const result = instance.parse(EXPRESSION, true);
    assert.equal(typeof result, 'string', 'result is a string');
    assert.equal(result, EXPECTED_AST);
  });

  it('transform', () => {
    const instance = new Ratel();
    const result = instance.transform(EXPRESSION, true);
    assert.equal(typeof result, 'string', 'result is a string');
    assert.equal(result, EXPECTED_OUTPUT);
  });

  describe('process', () => {
    it('transforms a string', () => {
      const instance = new Ratel();
      const options = {
        string: 'const a = (b) => { return 2 };',
        pretty: false
      };
      const result = instance.process(options);
      assert.equal(typeof result, 'string', 'result is a string');
      assert.equal(result, 'var a=function(b){return 2;};');
    });

    it('transforms a string, pretty formaat', () => {
      const instance = new Ratel();
      const options = {
        string: 'const a = (b) => { return 2 };',
        pretty: true
      };
      const result = instance.process(options);
      const expected = `var a = function (b) {\n    return 2;\n};\n`;
      assert.equal(typeof result, 'string', 'result is a string');
      assert.equal(result, expected);
    });
  });
});
