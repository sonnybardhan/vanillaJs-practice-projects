const throttlePromises = async (promises, max) => {
  const results = [];
  let count = 0;

  try {
    while (count < promises.length) {
      const promiseSubset = promises.slice(count, count + max);
      count += max;
      // const result = await Promise.all(promiseSubset);
      const result = await Promise.all(promiseSubset.map((p) => p()));
      //?? doesn't the previous line do just that?! isn't that what Promise.all does? automatically invokes all promises in the array?
      results.push(...result);
    }
    return results;
  } catch (err) {
    throw err;
  }
};

//invoke functions for the first count to max promises
//after resolution
//push to results
//increase count by max
//return results if end of array
