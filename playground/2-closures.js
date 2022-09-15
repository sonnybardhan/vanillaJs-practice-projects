// function createBase(base) {
//   return function (num) {
//     return base + num;
//   };
// }

// var addSix = createBase(6);
// console.log(addSix(10)); //16
// console.log(addSix(21)); //27

// function optimize() {
//   const temp = [];

//   for (let i = 0; i < 1000000; i++) {
//     temp[i] = i * i;
//   }

//   return function (idx) {
//     temp[idx];
//   };
// }

// const closure = optimize();
// console.time('a');
// console.log(closure(6));
// console.timeEnd('a');

// console.time('b');
// console.log(closure(99));
// console.timeEnd('b');

// function test() {
//   for (var index = 0; index < 3; index++) {
//     function inner(i) {
//       setTimeout(function () {
//         console.log(i);
//       }, 1000);
//     }
//     inner(index);
//   }
// }

// test();

// function privateCounter() {
//   let _count = 0;
//   return {
//     inc() {
//       _count += 1;
//       console.log(_count);
//     },
//     dec() {
//       _count -= 1;
//       console.log(_count);
//     },
//   };
// }

// const { inc, dec } = privateCounter();

// let view;
// function doSomethingOnce() {
//   view = 'some text here';
//   let printed = false;
//   return () => {
//     if (printed) return;
//     console.log('print ... ', view);
//     printed = true;
//   };
// }

// const printOnce = doSomethingOnce();
// printOnce();
// printOnce();
// printOnce();
// printOnce();

const clumsyProduct = () => {
  const cache = {};

  for (let index = 0; index < 10000000; index++) {}

  return function (n1, n2) {
    const n1String = String(n1);
    const n2String = String(n2);
    const key = n1String + n2String;
    if (cache[key] != null) {
      console.log('Found in Cache');
      console.log(cache);
      return cache[key];
    }
    console.log('NOT in Cache');
    console.log(cache);
    const result = n1 * n2;
    cache[key] = result;
    return cache[key];
  };
};

const fastSquare = clumsyProduct();
console.time('a');
console.log(fastSquare(100, 100));
console.timeEnd('a');
console.time('a');
console.log(fastSquare(100, 100));
console.timeEnd('a');
console.time('a');
console.log(fastSquare(1000, 1000));
console.timeEnd('a');
console.time('a');
console.log(fastSquare(1000, 1000));
console.timeEnd('a');
