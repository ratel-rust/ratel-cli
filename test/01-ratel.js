/* global assert, describe, it, Ratel */

const EXPRESSION = '2**2;\n';
const EXPECTED_OUTPUT = 'Math.pow(2,2);';

// ratel returns LiteralFloat for integers

const EXPECTED_AST = `[
    Expression {
        value: Binary {
            left: Literal(
                LiteralFloat(
                    "2"
                )
            ),
            operator: Exponent,
            right: Literal(
                LiteralFloat(
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
});
