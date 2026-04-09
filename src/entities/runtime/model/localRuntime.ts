import workerCode from "./worker.js?raw";

export interface ExecutionResult {
  stdout: string;
  stderr: string;
  executionTime: number;
}

export const localRuntime = {
  async execute(
    code: string,
    timeoutMs = 5000,
  ): Promise<ExecutionResult> {
    return new Promise((res) => {
      const startTime = performance.now();
      const blob = new Blob([workerCode], {
        type: "application/javascript",
      });
      const workerUrl = URL.createObjectURL(blob);
      const worker = new Worker(workerUrl);
      let timeoutId: number;

      const cleanup = () => {
        clearTimeout(timeoutId);
        worker.terminate();
        URL.revokeObjectURL(workerUrl);
      }

      worker.onmessage = (e) => {
        if (e.data.type === "result") {
          const endTime = performance.now();
          cleanup();
          res({
            stdout: e.data.stdout,
            stderr: e.data.stderr,
            executionTime: Math.round(endTime - startTime),
          });
        }
      };

      worker.onerror = (e) => {
          const endTime = performance.now();
          cleanup();
          res({
            stdout: "",
            stderr: `Worker error: ${e.message}`,
            executionTime: Math.round(endTime - startTime),
          });
      };

      timeoutId = window.setTimeout(() => {
          const endTime = performance.now();
          cleanup();
          res({
            stdout: "",
            stderr: `Error: Execution timeout after ${timeoutMs}ms`,
            executionTime: Math.round(endTime - startTime),
          });
      }, timeoutMs)

      worker.postMessage(code);
    });
  },
};
