import { useMutation } from "@tanstack/react-query";
import {
  ExecutionResult,
  localRuntime,
} from "../model/localRuntime";
import { ProblemTests } from "@types";

type ExecuteRequestArguments = {
  code: string;
  tests: ProblemTests;
};

const localExecuteAdapter = async ({
  code,
  tests,
}: ExecuteRequestArguments): Promise<ExecutionResult> => {
  const result = await localRuntime.execute(code, tests);
  return result;
};

export const useExecuteCode = (options: {
  onSuccess?: (result: ExecutionResult) => void;
  onError?: (error: Error) => void;
  onSettled?: () => void;
}) => {
  return useMutation({
    mutationFn: ({
      code,
      tests,
    }: ExecuteRequestArguments) =>
      localExecuteAdapter({ code, tests }),
    networkMode: "always",
    onSuccess: (data) => {
      options.onSuccess?.(data);
    },
    onError: (error: Error) => {
      options.onError?.(error);
    },
    onSettled: () => {
      options.onSettled?.();
    },
  });
};
