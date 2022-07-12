const autoRetry = async (promise, maxTries) => {
  try {
    return await promise();
  } catch (err) {
    if (maxTries === 0) {
      Promise.reject(err);
    }
    return autoRetry(promise, maxTries - 1);
  }
};
