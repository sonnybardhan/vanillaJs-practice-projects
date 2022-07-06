function describe(testSuiteName, func) {
  console.log(`beginning test suite ${testSuiteName}`);
  try {
    func();
    console.log(`Successfully completed test suite ${testSuiteName}`);
  } catch (errMessage) {
    const { testCaseName, err } = errMessage;
    console.error(
      `failed running test suite ${testSuiteName} on test case ${testCaseName} with error message ${err}`
    );
  }
}

function it(testCaseName, func) {
  console.log(`beginning test case ${testCaseName}`);
  try {
    func();
    console.log(`successfully completed test case ${testCaseName}`);
  } catch (err) {
    throw { testCaseName, err };
  }
}

function expect(actual) {
  return {
    toExist() {
      if (actual == null) {
        throw `expected value to exist but got ${JSON.stringify(actual)}`;
      }
      return true;
    },
    toBe(expected) {
      if (actual !== expected) {
        throw `expected ${JSON.stringify(actual)} to be ${JSON.stringify(
          expected
        )}`;
      }
      return true;
    },
    toBeType(expected) {
      if (typeof actual !== expected) {
        throw `expected ${JSON.stringify(
          actual
        )} to be of type ${expected} but got ${typeof actual}`;
      }
      return true;
    },
  };
}

exports.describe = describe;
exports.it = it;
exports.expect = expect;
