/* global assert, describe, it, Badger */
const EXPRESSION = '2**2;\n';
const EXPECTED_OUTPUT = 'Math.pow(2,2);';
const EXPECTED_AST = `[
    Expression {
        value: Binary {
            left: Literal(
                LiteralInteger(
                    2
                )
            ),
            operator: Exponent,
            right: Literal(
                LiteralInteger(
                    2
                )
            )
        }
    }
]`;

describe('Badger', () => {
  it('is a function', () => {
    assert.equal(typeof Badger, 'function');
  });

  it('initializes an instance', () => {
    const instance = new Badger();
    assert.ok(instance);
    assert.equal(typeof instance.badger, 'object', 'has reference to registered neon modules');
    assert.equal(typeof instance.transform, 'function', 'has transform');
    assert.equal(typeof instance.parse, 'function', 'has parse');
  });

  it('parse', () => {
    const instance = new Badger();
    const result = instance.parse(EXPRESSION, true);
    assert.equal(typeof result, 'string', 'result is a string');
    assert.equal(result, EXPECTED_AST);
  });

  it('transform', () => {
    const instance = new Badger();
    const result = instance.transform(EXPRESSION, true);
    assert.equal(typeof result, 'string', 'result is a string');
    assert.equal(result, EXPECTED_OUTPUT);
  });
});
