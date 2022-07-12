//implement your own promise.finally
const myFinally = async (prom, onFinally) => {
  try {
    const res = await prom();
    await onFinally();
    return res;
  } catch (err) {
    await onFinally();
    throw err;
  }
};
