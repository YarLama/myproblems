import { useMutation } from "@tanstack/react-query";
import { fetchAndValidateProblems } from "./github";
import { problemStore } from "@entities";

export const useImportProblems = () => {
  return useMutation({
    mutationFn: fetchAndValidateProblems,
    onSuccess: async (data) => {
      await problemStore.importProblems(data);
    },
  });
};
