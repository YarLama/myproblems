import { githubRawClient } from "@api";
import { validateProblemList } from "@root/src/shared/verify";
import { ProblemList } from "@types";

export const fetchAndValidateProblems =
  async (): Promise<ProblemList> => {
    const responce = await githubRawClient.get<ProblemList>(
      "/problems/problems.json",
    );
    const data = responce.data;
    const validation = validateProblemList(data);
    if (!validation.isValid)
      throw new Error(validation.error);
    return data;
  };
