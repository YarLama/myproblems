self.onmessage = async function(e) {
  const data = e.data;
  const { code, tests: userTests } = data;
  const { input: userInput, output: userExpectedOutput } =
    userTests;
  const result = [];

  function compareResult(actual, expected) {
    return (
      JSON.stringify(actual) === JSON.stringify(expected)
    );
  }

  try {
    const userFn = new Function('...args', `
      ${code}
      if (typeof solution !== 'function') {
        throw new Error("The 'solution' function is missing. Please make sure the 'solution' function is defined and returns your solution.")
      }
      return solution(...args);
    `);
    for (const [index, args] of userInput.entries()) {
      try {
        const start = performance.now();
        const value = await userFn(...args);
        const end = performance.now();
        const compareStatus = compareResult(
          value,
          userExpectedOutput[index],
        )
          ? "success"
          : "failed";

        result.push({
          status: "success",
          testIndex: index,
          testStatus: compareStatus,
          testExpected: userExpectedOutput[index],
          input: args,
          output: value,
          time: end - start,
        });
      } catch (testErr) {
        result.push({
          status: "error",
          testIndex: index,
          input: args,
          error: testErr.message,
        });
      }
    }

    self.postMessage({
      type: "RESULT",
      stdout: result,
      stderr: "",
    });
  } catch (compileErr) {
    self.postMessage({
      type: "COMPILE_ERROR",
      stdout: [],
      stderr:
        compileErr instanceof Error
          ? compileErr.stack || compileErr.message
          : String(compileErr),
    });
  }
};
