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

//? will this work?
Promise.myAll = function (promises) {
  return new Promise((resolve, reject) => {
    if (!promises.length) resolve([]);
    let resolveCount = 0;
    const results = [];

    for(let i = 0; i<promises.length; i++){
      try {
        const result = await Promise.resolve(promise);
        results[i] = await result;
        resolveCount++;
        if(resolveCount === promises.length){
          resolve(results);
        }
      } catch(err){
        reject(err);
      }
    }
  });
};