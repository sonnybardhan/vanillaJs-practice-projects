const all = async (promises) => {
  return new Promise((resolve, reject) => {
    if (!promises.length) resolve([]);

    const results = [];
    let count = 0;

    promises.forEach((prom, idx) => {
      Promise.resolve(prom)
        .then((res) => {
          results[idx] = res;
          count++;

          if (count === promises.length) {
            resolve(results);
          }
        })
        .catch((err) => {
          reject(err);
        });
    });
  });
};
