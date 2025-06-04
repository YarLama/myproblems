import { useMutation } from "@tanstack/react-query";
import { executeCode } from "./piston";
import { PistonExecuteResponse } from "./types";

export const useExecuteCode = (options: {
  onSuccess?: (result: PistonExecuteResponse) => void;
  onError?: (error: Error) => void;
  onSettled?: () => void;
}) => {
  return useMutation({
    mutationFn: executeCode,
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
