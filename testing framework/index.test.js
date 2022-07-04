const { forEach } = require('./index.js');

let sum = 0;

forEach([1, 2, 3], (value, i) => {
  sum += value;
});

if (sum !== 7) {
  throw new Error('Expected sum to equal 6');
}
