//my solution
const allSettled = async (promises) => {
  return new Promise((resolve, reject) => {
    if (!promises.length) resolve([]);

    const results = [];
    let count = 0;

    promises.forEach((promise, idx) => {
      Promise.resolve(promise)
        .then((res) => {
          results[idx] = { status: 'fulfilled', value: res };
        })
        .catch((err) => {
          results[idx] = { status: 'rejected', reason: err };
        })
        .finally(() => {
          count++;
          if (count === promises.length) {
            resolve(results);
          }
        });
    });
  });
};

//solution 2
// const allSettled = async (promises) => {
//   if (!promises.length) return [];

//   const results = [];
//   let count = 0;

//   for (let i = 0; i < promises.length; i++) {
//     try {
//       const res = await promises[i];
//       results[i] = { status: 'fulfilled', value: res };
//     } catch (err) {
//       results[i] = { status: 'rejected', reason: err };
//     } finally {
//       count++;
//       if (count === promises.length) {
//         return results;
//       }
//     }
//   }
// };
