/*
7. 
promise #1 that resolves with 'first'
promise #2 resolves promise #1
resolve promise #2 and print output
*/

// const p1 = Promise.resolve('first');
// const p2 = Promise.resolve(p1);

// p2.then((res) => res).then(console.log);

/*
8. rewrite with async/await
*/

// const loadJson = async (url) => {
//   try {
//     const response = await fetch(url);

//     if (response.status === 200) return response.json();

//     throw new Error(response.status);
//   } catch (error) {
//     console.log(error);
//   }
// };

// loadJson('https://someurl.coms');

/*
9. resolve promises recursively
*/

// function promiseRecurse(promises, results = []) {
//   if (!promises.length) return results;

//   return Promise.resolve(promises[0]).then((res) => {
//     results.push(res);
//     console.log(results);
//     return promiseRecurse(promises.slice(1), results);
//   });
// }

// const promiseRecurse = async (promises, results = []) => {
//   if (!promises.length) return results;

//   try {
//     const result = await promises[0]();
//     results.push(result);
//     console.log(results);
//   } catch (error) {
//     console.log(error);
//   }
//   return promiseRecurse(promises.slice(1), results);
// };

// const promiseAll = (promises, results = [], resolvedCount = 0) => {
//   return new Promise((resolve, reject) => {
//     if (!promises.length) return results;

//     promises.forEach((promise, idx) => {
//       promise()
//         .then((result) => {
//           results[idx] = result;
//           resolvedCount++;
//           if (resolvedCount === promises.length) {
//             resolve(results);
//           }
//         })
//         .catch((err) => {
//           console.log(err);
//         });
//     });
//   });
// };

// const promiseAll = (promises) => {
//   if (!promises.length) return results;

//   let results = [];
//   let resolvedCount = 0;

//   return new Promise((resolve, reject) => {
//     promises.forEach((promise, idx) => {
//       Promise.resolve(promise())
//         .then((res) => {
//           // console.log('res: ', res);
//           results[idx] = res;
//           resolvedCount++;
//           if (resolvedCount === promises.length) {
//             // console.log('all done, ', results);
//             resolve(results);
//           }
//         })
//         .catch((err) => {
//           reject(err);
//         });
//     });
//   });
// };

// const promiseRace = (promises) => {
//   if (!promises.length) return;

//   return new Promise((resolve, reject) => {
//     promises.forEach((promise) => {
//       Promise.resolve(promise())
//         .then((res) => {
//           resolve(res);
//         })
//         .catch((err) => {
//           reject(err);
//         });
//     });
//   });
// };

//allSettled

// const allSettled = (promises) => {
//   return new Promise((resolve, reject) => {
//     const results = [];
//     let resolvedCount = 0;

//     if (!promises.length) return results;

//     promises.forEach((promise, idx) => {
//       Promise.resolve(promise())
//         .then((res) => {
//           results[idx] = `succeeded: ${res}`;
//         })
//         .catch((err) => {
//           results[idx] = `failed: ${err}`;
//         })
//         .finally(() => {
//           resolvedCount++;
//           if (resolvedCount === promises.length) {
//             resolve(results);
//           }
//         });
//     });
//   });
// };

//any

const any = (promises) => {
  return new Promise((resolve, reject) => {
    let failedCount = 0;

    promises.forEach((promise) => {
      Promise.resolve(promise())
        .then((res) => {
          // settledCount++;
          resolve(res);
        })
        .catch((err) => {
          failedCount++;
          if (failedCount === promises.length) {
            reject(`All failed, ${err}`);
          }
        });
    });
  });
};

const p1 = () =>
  new Promise((resolve, reject) => {
    setTimeout(() => {
      // resolve(1);
      reject(1);
    }, 900);
  });
const p2 = () =>
  new Promise((resolve, reject) => {
    setTimeout(() => {
      // resolve(2);
      reject(2);
    }, 750);
  });
const p3 = () =>
  new Promise((resolve, reject) => {
    setTimeout(() => {
      // resolve(3);
      reject(3);
    }, 100);
  });

// const p1 = new Promise((resolve) =>
//   setTimeout(() => {
//     resolve('1');
//   }, 1000)
// );
// const p2 = new Promise((resolve) =>
//   setTimeout(() => {
//     resolve('2');
//   }, 1000)
// );
// const p3 = new Promise((resolve) =>
//   setTimeout(() => {
//     resolve('3');
//   }, 1000)
// );

// const p1 = Promise.resolve('1');
// const p2 = Promise.resolve('2');
// const p3 = Promise.resolve('3');

// console.log(promiseRecurse([p1, p2, p3]));
// console.log(all([p1, p2, p3]));

// promiseAll([p1, p2, p3])
//   .then(console.log)
//   .catch((err) => console.log('failed:', err));

// promiseRace([p1, p2, p3])
//   .then(console.log)
//   .catch((err) => console.log('failed:', err));

// allSettled([p1, p2, p3])
//   .then(console.log)
//   .catch((err) => console.log('failed:', err));

any([p1, p2, p3])
  .then(console.log)
  .catch((err) => console.log('failed:', err));

// promiseAll([p1, p2, p3]);
