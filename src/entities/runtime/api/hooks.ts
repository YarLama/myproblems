import { useMutation } from "@tanstack/react-query";
import { PistonExecuteResponse } from "./types";
import { localRuntime } from "../model/localRuntime";

const localExecuteAdapter = async (
  code: string,
): Promise<PistonExecuteResponse> => {
  const result = await localRuntime.execute(code);

  return {
    language: "javascript",
    version: "browser",
    run: {
      stdout: result.stdout,
      stderr: result.stderr,
      code: result.stderr ? 1 : 0,
      signal: null,
      output: result.stdout + result.stderr,
    },
  };
};

export const useExecuteCode = (options: {
  onSuccess?: (result: PistonExecuteResponse) => void;
  onError?: (error: Error) => void;
  onSettled?: () => void;
}) => {
  return useMutation({
    mutationFn: (code: string) => localExecuteAdapter(code),
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
