/* eslint-disable @typescript-eslint/no-explicit-any */
import { ProblemTests } from "@types";
import workerCode from "./worker.js?raw";

type SuccessResult = {
  status: "success";
  testIndex: number;
  testStatus: "success" | "failed";
  testExpected: any;
  input: any[];
  output: any;
  time: number;
};

type ErrorResult = {
  status: "error";
  testIndex: number;
  input: any[];
  error: string;
};

type Result = SuccessResult | ErrorResult;

export type ExecutionResult = {
  stdout: Result[];
  stderr: string;
};

export const localRuntime = {
  async execute(
    code: string,
    tests: ProblemTests,
    timeoutMs = 5000,
  ): Promise<ExecutionResult> {
    return new Promise((res) => {
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
      };

      worker.onmessage = (e) => {
        if (
          e.data.type === "RESULT" ||
          e.data.type === "COMPILE_ERROR"
        ) {
          cleanup();
          res({
            stdout: e.data.stdout,
            stderr: e.data.stderr,
          });
        }
      };

      timeoutId = window.setTimeout(() => {
        cleanup();
        res({
          stdout: [],
          stderr: `Error: Execution timeout after ${timeoutMs}ms`,
        });
      }, timeoutMs);

      worker.postMessage({ code: code, tests: tests });
    });
  },
};
