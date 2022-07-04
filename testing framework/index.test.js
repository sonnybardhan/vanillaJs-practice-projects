const { forEach, map } = require('./index.js');
// const assert = require('node:assert/strict');
const assert = require('assert');

const test = (desc, fn) => {
  console.log(`----`, desc);
  try {
    fn();
  } catch (err) {
    console.log('Whoops! ', err.message);
  }
};

test('Tests for forEach', () => {
  let sum = 0;

  forEach([1, 2, 3], (value, i) => {
    sum += value;
  });

  assert.strictEqual(sum, 6, 'Expected sum to equal 6');
});

test('Tests for map', () => {
  let result = map([1, 2, 3], (value) => {
    return value * 2;
  });

  // assert.deepEqual([2, 4, 6], result, 'Expected arrays to be equal');
  // assert.deepStrictEqual([2, 4, 6], result, 'Expected arrays to be equal');
  assert.deepStrictEqual([2, 4, 6], result);
  // if (result[0] !== 2) {
  //   throw new Error(`Expected result[0] to equal 2 but received ${result[0]}`);
  // }

  // if (result[1] !== 4) {
  //   throw new Error('Expected result[1] to equal 4');
  // }

  // if (result[2] !== 6) {
  //   throw new Error('Expected result[2] to equal 6');
  // }
});
