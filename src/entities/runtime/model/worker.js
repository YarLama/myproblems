self.onmessage = function(e) {
  const code = e.data;
  const logs = [];

  const logHandler = (...args) => {
    logs.push(
      args
        .map((arg) => {
          return typeof arg === "object"
            ? JSON.stringify(arg, null, 2)
            : String(arg);
        })
        .join(" "),
    );
  };

  Object.defineProperty(console, "log", {
    value: logHandler,
    writable: false,
    configurable: false,
  });

  try {
    const userFn = new Function(code);
    userFn();

    self.postMessage({
      type: "result",
      stdout: logs.join("\n"),
      stderr: "",
    });
  } catch (err) {
    self.postMessage({
      type: "result",
      stdout: logs.join("\n"),
      stderr:
        err instanceof Error
          ? err.stack || err.message
          : String(err),
    });
  }
};
